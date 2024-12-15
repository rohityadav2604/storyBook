import app from '../src/server.js';

export default async function handler(req, res) {
  await app.ready();
  app(req, res);
}

