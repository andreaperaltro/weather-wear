import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple request logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Vercel-specific handling for serverless environment
const isVercel = process.env.VERCEL === '1';

(async () => {
  const server = await registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });

  // Set up static file serving for production or development
  if (process.env.NODE_ENV !== "development") {
    // In production, serve static files from the dist/public directory
    const staticPath = path.resolve(process.cwd(), "dist/public");
    app.use(express.static(staticPath));
    
    // Serve index.html for all non-API routes (SPA fallback)
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) {
        return next();
      }
      res.sendFile(path.join(staticPath, "index.html"));
    });
  } else {
    // In development, use Vite's dev server
    await setupVite(app, server);
  }

  // Don't start server in Vercel serverless environment
  if (!isVercel) {
    const port = parseInt(process.env.PORT || '5173', 10);
    server.listen(port, () => {
      log(`serving on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  }
  
  // Export the Express app for serverless functions
  module.exports = app;
})();
