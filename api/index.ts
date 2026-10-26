// Vercel entry point: serves the exported Expo app and its API routes (src/app/api) from dist/server.
// See https://docs.expo.dev/router/web/api-routes/ (Vercel section).
import type { IncomingMessage, ServerResponse } from 'http';

const { createRequestHandler } = require('expo-server/adapter/vercel');
const { createHmac, timingSafeEqual } = require('crypto');

const handler = createRequestHandler({
  build: require('path').join(__dirname, '../dist/server'),
});

// ---------------------------------------------------------------------------------------------
// Optional demo password. When DEMO_PASSWORD is set in Vercel's environment variables, visitors
// see a login page and must enter it once; a cookie then keeps them signed in for 30 days.
// Changing the password signs everyone out. When DEMO_PASSWORD is not set, the site stays open.
// ---------------------------------------------------------------------------------------------

const COOKIE = 'mh_demo';
const LOGIN_PATH = '/__demo-login';
const MAX_AGE = 60 * 60 * 24 * 30;

const tokenFor = (password: string): string => createHmac('sha256', password).update('math-helper-demo').digest('hex');

function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

function readCookie(req: IncomingMessage, name: string): string | undefined {
  for (const part of (req.headers.cookie ?? '').split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return undefined;
}

function isSignedIn(req: IncomingMessage, password: string): boolean {
  const cookie = readCookie(req, COOKIE);
  return !!cookie && safeEqual(cookie, tokenFor(password));
}

/** Only allow same-site relative redirects. */
const safeNext = (next: unknown) => (typeof next === 'string' && next.startsWith('/') && !next.startsWith('//') ? next : '/');

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

async function readForm(req: IncomingMessage): Promise<URLSearchParams> {
  // Vercel's Node helpers may have already parsed the body.
  const pre = (req as IncomingMessage & { body?: unknown }).body;
  if (pre && typeof pre === 'object') return new URLSearchParams(pre as Record<string, string>);
  if (typeof pre === 'string') return new URLSearchParams(pre);
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 10_000) break;
    chunks.push(Buffer.from(chunk));
  }
  return new URLSearchParams(Buffer.concat(chunks).toString('utf8'));
}

function loginPage(next: string, error?: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Math Helper · Sign in</title>
<style>
  :root { --bg:#F5F6FB; --card:#FFFFFF; --text:#161A33; --muted:#636985; --border:#E1E4F0; --primary:#4F46E5; --on:#FFFFFF; --danger:#DC2626; --dangerSoft:#FEE2E2; }
  @media (prefers-color-scheme: dark) { :root { --bg:#0E1020; --card:#181B30; --text:#F1F2FA; --muted:#9EA3C0; --border:#2C3050; --primary:#8B85FF; --on:#0E1020; --danger:#F87171; --dangerSoft:#3B1A1F; } }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center; padding:16px;
         background:var(--bg); color:var(--text); font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif; }
  .card { width:100%; max-width:380px; background:var(--card); border:1px solid var(--border); border-radius:18px; padding:28px 24px; }
  .logo { width:56px; height:56px; border-radius:16px; background:var(--primary); color:var(--on); display:flex; align-items:center;
          justify-content:center; font-size:28px; font-weight:800; margin-bottom:16px; }
  h1 { margin:0 0 6px; font-size:22px; }
  p { margin:0 0 20px; color:var(--muted); line-height:1.5; font-size:15px; }
  label { display:block; font-size:13px; font-weight:700; margin-bottom:6px; }
  input { width:100%; font-size:17px; padding:12px 14px; border-radius:12px; border:1px solid var(--border); background:var(--bg); color:var(--text); }
  input:focus { outline:2px solid var(--primary); outline-offset:1px; }
  button { width:100%; margin-top:14px; padding:13px; border:0; border-radius:12px; background:var(--primary); color:var(--on);
           font-size:16px; font-weight:700; cursor:pointer; }
  .error { background:var(--dangerSoft); color:var(--danger); border-radius:10px; padding:10px 12px; font-size:14px; margin-bottom:14px; }
</style>
</head>
<body>
  <form class="card" method="post" action="${LOGIN_PATH}">
    <div class="logo">∑</div>
    <h1>Math Helper</h1>
    <p>This demo is password protected. Enter the password you were given to continue.</p>
    ${error ? `<div class="error" role="alert">${escapeHtml(error)}</div>` : ''}
    <input type="hidden" name="next" value="${escapeHtml(next)}" />
    <label for="password">Password</label>
    <input id="password" name="password" type="password" autocomplete="current-password" required autofocus />
    <button type="submit">Enter</button>
  </form>
</body>
</html>`;
}

function send(res: ServerResponse, status: number, type: string, body: string) {
  res.statusCode = status;
  res.setHeader('Content-Type', type);
  res.setHeader('Cache-Control', 'no-store');
  res.end(body);
}

module.exports = async (req: IncomingMessage, res: ServerResponse) => {
  const password = process.env.DEMO_PASSWORD;
  if (!password) return handler(req, res);

  const url = new URL(req.url ?? '/', 'http://localhost');

  if (url.pathname === LOGIN_PATH) {
    if (req.method !== 'POST') return send(res, 200, 'text/html; charset=utf-8', loginPage(safeNext(url.searchParams.get('next'))));
    const form = await readForm(req);
    const next = safeNext(form.get('next'));
    if (!safeEqual(form.get('password') ?? '', password)) {
      return send(res, 401, 'text/html; charset=utf-8', loginPage(next, 'Incorrect password. Please try again.'));
    }
    const secure = req.headers['x-forwarded-proto'] === 'https' ? '; Secure' : '';
    res.setHeader('Set-Cookie', `${COOKIE}=${tokenFor(password)}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; SameSite=Lax${secure}`);
    res.statusCode = 303;
    res.setHeader('Location', next);
    return res.end();
  }

  if (isSignedIn(req, password)) return handler(req, res);

  if (url.pathname.startsWith('/api/')) {
    return send(res, 401, 'application/json', JSON.stringify({ error: 'This demo is password protected. Reload the page and sign in.' }));
  }
  return send(res, 401, 'text/html; charset=utf-8', loginPage(url.pathname + url.search));
};
