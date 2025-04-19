// Special handler for Vercel serverless functions
import express from 'express';
import { registerRoutes } from '../server/routes';

// Set up Vercel serverless environment variables
process.env.VERCEL = '1';

// Create Express app instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up routes
registerRoutes(app);

// Export handler for Vercel
export default app; 