import app from '../src/server.js';

// Export the Express API as Vercel serverless function
export default function handler(req, res) {
  app(req, res);
}

