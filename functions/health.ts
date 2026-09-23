// Cloudflare Pages Function: GET /health
export async function onRequestGet(): Promise<Response> {
  return new Response(
    JSON.stringify({
      status: "ok",
      service: "CosmiChameleon API",
      timestamp: new Date().toISOString()
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
}
