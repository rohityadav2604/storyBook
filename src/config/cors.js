import cors from 'cors';

const corsOptions = {
  origin: '*', // Allow only this origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//   exposedHeaders: ['Content-Range', 'X-Content-Range'], // Expose these headers
//   credentials: true, // Allow credentials (cookies, authorization headers, etc)
//   maxAge: 86400, // Cache preflight requests for 24 hours
};

// Export the CORS middleware with options
export default cors(corsOptions);
