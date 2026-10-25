// Vercel entry point: serves the exported Expo app and its API routes (src/app/api) from dist/server.
// See https://docs.expo.dev/router/web/api-routes/ (Vercel section).
import type { IncomingMessage, ServerResponse } from 'http';

const { createRequestHandler } = require('expo-server/adapter/vercel');
const { timingSafeEqual } = require('crypto');

const handler = createRequestHandler({
  build: require('path').join(__dirname, '../dist/server'),
});

// Optional demo password. When DEMO_PASSWORD is set in Vercel's environment variables, every page and
// API request requires it (the browser shows its built-in sign-in box; any username is accepted).
// When it is not set, the site stays open.
function hasValidPassword(authorization: string | undefined, password: string): boolean {
  if (!authorization?.startsWith('Basic ')) return false;
  const decoded = Buffer.from(authorization.slice(6), 'base64').toString('utf8');
  const supplied = Buffer.from(decoded.slice(decoded.indexOf(':') + 1));
  const expected = Buffer.from(password);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

module.exports = (req: IncomingMessage, res: ServerResponse) => {
  const password = process.env.DEMO_PASSWORD;
  if (password && !hasValidPassword(req.headers.authorization, password)) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Math Helper demo", charset="UTF-8"');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('This demo is password protected.');
    return;
  }
  return handler(req, res);
};
