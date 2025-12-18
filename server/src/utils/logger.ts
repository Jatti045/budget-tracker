import { createLogger } from "winston";
import winston from "winston";
import { ENV } from "../config/env";

// Determine transports based on environment
// Vercel (serverless) doesn't allow file writes, only console
const transports: winston.transport[] = [new winston.transports.Console()];

// Only add file logging on local/non-serverless environments
if (!ENV.VERCEL) {
  transports.push(
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" })
  );
}

const logger = createLogger({
  level: ENV.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize()
  ),
  transports,
});

export default logger;
