/**
 * CosmiChameleon Local Development & Offline Testing Server
 * 
 * NOTE: For production deployment on Cloudflare Pages, the production API is
 * handled natively by Cloudflare Pages Functions located in:
 *   - functions/api/contact.ts
 *   - functions/health.ts
 * 
 * This server.js script is retained strictly for local development and offline mock testing.
 * 
 * Endpoints:
 *   GET  /health
 *   POST /api/contact
 * 
 * Responsibilities:
 *   - Server-side validation & input sanitization
 *   - In-memory rate limiting & duplicate submission prevention
 *   - Anti-spam honeypot mechanism
 *   - Server-side persistent storage (zero leads lost)
 *   - Google Sheets integration (Webhook / Service Account)
 *   - Gmail notification dispatch
 *   - Secure CORS restrictions
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const tls = require('tls');

const PORT = process.env.PORT || 3001;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://cosmichameleon.com';

// Persistent storage location (gitignored)
const DATA_DIR = path.join(__dirname, 'data');
const STORAGE_FILE = path.join(DATA_DIR, 'inquiries.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(STORAGE_FILE)) {
  fs.writeFileSync(STORAGE_FILE, JSON.stringify([], null, 2), 'utf8');
}

// In-memory rate limiting: IP -> { count, resetTime }
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// In-memory duplicate cache: hash -> timestamp
const duplicateCache = new Map();
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip) {
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

function checkDuplicate(hash) {
  const now = Date.now();
  const prevTime = duplicateCache.get(hash);
  if (prevTime && (now - prevTime) < DUPLICATE_WINDOW_MS) {
    return true;
  }
  duplicateCache.set(hash, now);
  // Periodic cleanup
  if (duplicateCache.size > 1000) {
    for (const [k, v] of duplicateCache.entries()) {
      if (now - v > DUPLICATE_WINDOW_MS) duplicateCache.delete(k);
    }
  }
  return false;
}

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim();
}

function setCorsHeaders(res, reqOrigin) {
  const isAllowed = !reqOrigin || 
    reqOrigin === ALLOWED_ORIGIN || 
    reqOrigin.includes('localhost') || 
    reqOrigin.endsWith('.pages.dev');

  const originToSet = isAllowed ? (reqOrigin || ALLOWED_ORIGIN) : ALLOWED_ORIGIN;

  res.setHeader('Access-Control-Allow-Origin', originToSet);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
}

/**
 * Persist lead to local JSON storage
 */
function persistLocally(lead) {
  try {
    const raw = fs.readFileSync(STORAGE_FILE, 'utf8');
    const list = JSON.parse(raw || '[]');
    list.push(lead);
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to persistent storage:', err);
  }
}

/**
 * Forward lead to Google Sheets via Webhook
 */
function sendToGoogleSheets(lead) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) return Promise.resolve(false);

  return new Promise((resolve) => {
    try {
      const url = new URL(webhookUrl);
      const postData = JSON.stringify(lead);
      const req = https.request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        },
        timeout: 8000
      }, (res) => {
        resolve(res.statusCode >= 200 && res.statusCode < 300);
      });

      req.on('error', (e) => {
        console.error('Google Sheets dispatch error:', e.message);
        resolve(false);
      });
      req.on('timeout', () => {
        req.destroy();
        resolve(false);
      });

      req.write(postData);
      req.end();
    } catch (e) {
      console.error('Malformed Google Sheets webhook URL:', e.message);
      resolve(false);
    }
  });
}

/**
 * Send Gmail notification via secure SMTPS
 */
function sendGmailNotification(lead) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const recipient = process.env.NOTIFICATION_RECIPIENT || 'hello@cosmichameleon.com';

  if (!user || !pass) {
    console.info('Gmail credentials not configured in environment. Notification skipped.');
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    try {
      const socket = tls.connect({ host: 'smtp.gmail.com', port: 465 }, () => {
        let step = 0;
        const send = (cmd) => socket.write(cmd + '\r\n');

        socket.setEncoding('utf8');
        socket.on('data', (data) => {
          if (step === 0 && data.startsWith('220')) {
            step++;
            send('EHLO cosmichameleon.com');
          } else if (step === 1 && data.startsWith('250')) {
            step++;
            send('AUTH LOGIN');
          } else if (step === 2 && data.startsWith('334')) {
            step++;
            send(Buffer.from(user).toString('base64'));
          } else if (step === 3 && data.startsWith('334')) {
            step++;
            send(Buffer.from(pass).toString('base64'));
          } else if (step === 4 && data.startsWith('235')) {
            step++;
            send(`MAIL FROM:<${user}>`);
          } else if (step === 5 && data.startsWith('250')) {
            step++;
            send(`RCPT TO:<${recipient}>`);
          } else if (step === 6 && data.startsWith('250')) {
            step++;
            send('DATA');
          } else if (step === 7 && data.startsWith('354')) {
            step++;
            const emailBody = [
              `From: "CosmiChameleon System" <${user}>`,
              `To: <${recipient}>`,
              `Subject: New Website Inquiry — CosmiChameleon`,
              `Content-Type: text/plain; charset=utf-8`,
              ``,
              `A new technical project inquiry has been received via the CosmiChameleon website:`,
              ``,
              `Name:       ${lead.Name}`,
              `Company:    ${lead.Company}`,
              `Email:      ${lead.Email}`,
              `Phone:      ${lead.Phone}`,
              `Interest:   ${lead.Interest}`,
              `Timestamp:  ${lead.Timestamp}`,
              `Source:     ${lead.Source}`,
              ``,
              `Message:`,
              `${lead.Message}`,
              ``,
              `Status:     ${lead.Status}`,
              `.`
            ].join('\r\n');
            send(emailBody);
          } else if (step === 8 && data.startsWith('250')) {
            send('QUIT');
            socket.end();
            resolve(true);
          } else if (data.startsWith('5') || data.startsWith('4')) {
            console.error('SMTP Error:', data.trim());
            socket.destroy();
            resolve(false);
          }
        });

        socket.on('error', (err) => {
          console.error('Gmail SMTP connection failure:', err.message);
          resolve(false);
        });
      });
    } catch (e) {
      console.error('Gmail dispatch exception:', e.message);
      resolve(false);
    }
  });
}

const server = http.createServer(async (req, res) => {
  const reqOrigin = req.headers.origin;
  setCorsHeaders(res, reqOrigin);

  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  // GET /health
  if (req.method === 'GET' && (req.url === '/health' || req.url === '/api/health')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      service: 'CosmiChameleon API',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // POST /api/contact
  if (req.method === 'POST' && (req.url === '/api/contact' || req.url === '/api/contact/')) {
    // 1. Rate Limiting Check
    if (!checkRateLimit(clientIp)) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: 'Too many submissions from this connection. Please try again in 15 minutes.'
      }));
      return;
    }

    // 2. Read Request Body
    let bodyText = '';
    req.on('data', chunk => {
      bodyText += chunk;
      if (bodyText.length > 50000) { // Max 50KB limit to prevent DoS
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Payload too large.' }));
        req.destroy();
      }
    });

    req.on('end', async () => {
      let body;
      try {
        body = JSON.parse(bodyText);
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Malformed JSON payload.' }));
        return;
      }

      // 3. Honeypot Check: website_hp must remain empty
      if (body.website_hp && body.website_hp.trim() !== '') {
        // Silently discard bot submission
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Inquiry received. We’ll be in touch.' }));
        return;
      }

      // 4. Server-Side Validation & Sanitization
      const name = sanitize(body.name);
      const company = sanitize(body.company);
      const email = sanitize(body.email);
      const phone = sanitize(body.phone);
      const interest = sanitize(body.interest) || 'General Inquiry';
      const message = sanitize(body.message);

      if (!name || name.length > 80) {
        res.writeHead(422, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Name is required and must be under 80 characters.' }));
        return;
      }

      if (!company || company.length > 100) {
        res.writeHead(422, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Company name is required and must be under 100 characters.' }));
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email) || email.length > 100) {
        res.writeHead(422, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'A valid work email is required.' }));
        return;
      }

      if (!message || message.length < 15 || message.length > 2500) {
        res.writeHead(422, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Message must be between 15 and 2,500 characters.' }));
        return;
      }

      // 5. Prevent Duplicate Submissions
      const payloadHash = crypto.createHash('sha256').update(`${email}:${message}`).digest('hex');
      if (checkDuplicate(payloadHash)) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Inquiry received. We’ll be in touch.'
        }));
        return;
      }

      // 6. Construct Production Lead Record
      const lead = {
        Timestamp: new Date().toISOString(),
        Name: name,
        Company: company,
        Email: email,
        Phone: phone || 'Not Provided',
        Interest: interest,
        Message: message,
        Status: 'New',
        Source: 'CosmiChameleon Website'
      };

      // 7. Store Persistently
      persistLocally(lead);

      // 8. Sync to Google Sheets
      const sheetSuccess = await sendToGoogleSheets(lead);

      // 9. Send Gmail Notification
      // Requirement: If Google Sheets succeeds but Gmail fails: do NOT lose lead, return success
      sendGmailNotification(lead).catch(err => {
        console.error('Gmail notification background failure:', err);
      });

      // 10. Return Clean Success Response
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Inquiry received. We’ll be in touch.',
        sheetSynchronized: sheetSuccess
      }));
    });
    return;
  }

  // Not Found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found.' }));
});

server.listen(PORT, () => {
  console.log(`CosmiChameleon production API running on port ${PORT}`);
});
