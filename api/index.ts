// Vercel entry point: serves the exported Expo app and its API routes (src/app/api) from dist/server.
// See https://docs.expo.dev/router/web/api-routes/ (Vercel section).
const { createRequestHandler } = require('expo-server/adapter/vercel');

module.exports = createRequestHandler({
  build: require('path').join(__dirname, '../dist/server'),
});
