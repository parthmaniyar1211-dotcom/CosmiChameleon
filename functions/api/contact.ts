// Cloudflare Pages Function: POST /api/contact
// Production Architecture: Cloudflare Pages Functions -> Google Apps Script Webhook -> Google Sheet

interface Env {
  ALLOWED_ORIGIN?: string;
  GOOGLE_SHEET_WEBHOOK_URL?: string;
  GMAIL_NOTIFICATION_WEBHOOK?: string;
}

interface ContactPayload {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  website_hp?: string;
  source?: string;
  timestamp?: string;
}

// In-Memory Rate Limiting (per-isolate worker state)
// Note: In Cloudflare Pages Functions, in-memory state is maintained per worker isolate.
// For globally distributed rate limiting across all edge PoPs, Cloudflare Rate Limiting Rules or KV can be bound.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  record.count += 1;
  return true;
}

function sanitizeText(str: string): string {
  return str
    .replace(/[<>]/g, "")
    .trim();
}

function getCorsHeaders(origin: string | null, allowedOrigin?: string): Record<string, string> {
  const allowed = allowedOrigin || "https://cosmichameleon.pages.dev";
  const matched = origin && (origin === allowed || origin.includes("localhost") || origin.endsWith(".pages.dev"))
    ? origin
    : allowed;

  return {
    "Access-Control-Allow-Origin": matched,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Access-Control-Max-Age": "86400",
  };
}

export async function onRequestOptions(context: { request: Request; env: Env }): Promise<Response> {
  const origin = context.request.headers.get("Origin");
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin, context.env.ALLOWED_ORIGIN)
  });
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;
  const origin = request.headers.get("Origin");
  const corsHeaders = getCorsHeaders(origin, env.ALLOWED_ORIGIN);
  const clientIp = request.headers.get("CF-Connecting-IP") || request.headers.get("x-forwarded-for") || "unknown";

  // 1. Rate Limiting Check (per-isolate Cloudflare Worker)
  if (!checkRateLimit(clientIp)) {
    return new Response(
      JSON.stringify({ success: false, error: "Too many submissions from this connection. Please try again in 15 minutes." }),
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // 2. Parse JSON
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid JSON payload." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // 3. Anti-spam Honeypot Check: website_hp must remain empty
  if (body.website_hp && body.website_hp.trim() !== "") {
    // Silently accept bot submissions without executing integrations
    return new Response(
      JSON.stringify({ success: true, message: "Inquiry received. We’ll be in touch." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // 4. Server-Side Validation
  const name = sanitizeText(body.name || "");
  const company = sanitizeText(body.company || "");
  const email = sanitizeText(body.email || "");
  const phone = sanitizeText(body.phone || "");
  const interest = sanitizeText(body.interest || "AI Solutions & Agents");
  const message = sanitizeText(body.message || "");
  const source = "CosmiChameleon Website";
  const timestamp = new Date().toISOString();

  if (!name || name.length > 80) {
    return new Response(
      JSON.stringify({ success: false, error: "Name is required and must be under 80 characters." }),
      { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  if (!company || company.length > 100) {
    return new Response(
      JSON.stringify({ success: false, error: "Company is required and must be under 100 characters." }),
      { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email) || email.length > 100) {
    return new Response(
      JSON.stringify({ success: false, error: "Valid work email is required." }),
      { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  if (!message || message.length < 15 || message.length > 2500) {
    return new Response(
      JSON.stringify({ success: false, error: "Message must be between 15 and 2,500 characters." }),
      { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const record = {
    Timestamp: timestamp,
    Name: name,
    Company: company,
    Email: email,
    Phone: phone || "Not Provided",
    Interest: interest,
    Message: message,
    Status: "New",
    Source: source
  };

  // 5. Google Sheets Integration via Google Apps Script Webhook
  // Single production mechanism: Cloudflare Function -> Google Apps Script Webhook -> Google Sheet
  if (!env.GOOGLE_SHEET_WEBHOOK_URL) {
    console.error("GOOGLE_SHEET_WEBHOOK_URL environment variable is not configured.");
    return new Response(
      JSON.stringify({
        success: false,
        error: "Inquiry storage service is currently unconfigured. Please contact hello@cosmichameleon.com directly."
      }),
      { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  let sheetsRecorded = false;
  try {
    const sheetRes = await fetch(env.GOOGLE_SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record)
    });

    if (sheetRes.ok) {
      sheetsRecorded = true;
    } else {
      console.error("Google Sheets webhook error:", sheetRes.status, await sheetRes.text());
    }
  } catch (err) {
    console.error("Google Sheets dispatch failure:", err);
  }

  // If Google Sheets failed: do NOT silently report success since lead was not stored durably
  if (!sheetsRecorded) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Unable to record inquiry due to upstream network issue. Please email hello@cosmichameleon.com directly."
      }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // 6. Gmail Notification Integration
  // If Google Sheets succeeds but Gmail fails: preserve the lead, log failure, and return success
  if (env.GMAIL_NOTIFICATION_WEBHOOK) {
    try {
      const emailRes = await fetch(env.GMAIL_NOTIFICATION_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "New Website Inquiry — CosmiChameleon",
          to: "hello@cosmichameleon.com",
          data: record
        })
      });
      if (!emailRes.ok) {
        console.error("Gmail notification webhook returned non-200:", emailRes.status);
      }
    } catch (emailErr) {
      console.error("Gmail notification failed, lead preserved in Google Sheets:", emailErr);
    }
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: "Inquiry received. We’ll be in touch."
    }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}
