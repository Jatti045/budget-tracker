import express, { NextFunction, Request, Response } from "express";
import logger from "./utils/logger";
import transactionRouter from "./routes/transactionRoutes";
import userRouter from "./routes/userRoutes";
import budgetRouter from "./routes/budgetRoutes";
import { PrismaClient } from "@prisma/client";
import { ENV } from "./config/env";
import helmet from "helmet";
import cors from "cors";
import arcjetMiddleware from "./middleware/arcjetMiddleware";
import { startCleanupJob, stopCleanupJob } from "./utils/CleanupManager";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = (ENV.PORT || 3000) as number;
const HOST = ENV.HOST || "0.0.0.0";

export const prisma = new PrismaClient();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

// Routes
// Arcjet middleware currently disabled (fix is needed)
app.use("/api", arcjetMiddleware);
app.use("/api/transaction", transactionRouter);
app.use("/api/user", userRouter);
app.use("/api/budget", budgetRouter);

// API health endpoint
app.get("/api/health", async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`; // simple query to check DB connection
    res.status(200).json({
      status: "ok",
      database: "connected",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error("API health check failed:", error);
    res.status(503).json({
      status: "error",
      database: "disconnected",
      timestamp: new Date().toISOString(),
    });
  }
});

// Error handling middleware
app.use(errorHandler);

// Only start listening if NOT running on Vercel (for local development)
let server: any = null;
if (!ENV.VERCEL) {
  server = app.listen(PORT, HOST, () => {
    logger.info(`Server is running on http://${HOST}:${PORT}`);
    // start background cleanup when the server is ready
    startCleanupJob().catch((e) => logger.warn("startCleanupJob error:", e));
  });
}

function shutdown(signal: string) {
  return async () => {
    logger.info(`Received ${signal}. Shutting down...`);

    // Stop cleanup interval
    try {
      stopCleanupJob();
    } catch (e) {
      logger.warn("Error clearing cleanup interval:", e);
    }

    try {
      await prisma.$disconnect();
    } catch (e) {
      logger.warn("Error disconnecting prisma:", e);
    }

    process.exit(0);
  };
}

process.on("SIGINT", shutdown("SIGINT"));
process.on("SIGTERM", shutdown("SIGTERM"));
process.on("unhandledRejection", (reason) => {
  logger.warn("Unhandled Rejection:", reason);
  // attempt a graceful shutdown
  shutdown("unhandledRejection")();
});

module.exports = app;
