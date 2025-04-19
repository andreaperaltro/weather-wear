// Special handler for Vercel serverless functions
// This file just re-exports the Express app from server/index.ts
import '../dist/index.js';

// The export is handled in server/index.ts via module.exports 