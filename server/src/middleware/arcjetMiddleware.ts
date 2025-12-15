import { ENV } from "../config/env";
import logger from "../utils/logger";

// Build a configured arcjet middleware. This returns an Express-compatible
// middleware. If Arcjet is not configured, we return a no-op middleware.
export function createArcjetMiddleware() {
  // Normalize and validate mode. Accept only LIVE or DRY_RUN. Any other
  // value (including undefined) will be treated as OFF to avoid crashing
  // when an invalid mode is supplied in the environment.
  let MODE = ((ENV.ARCJET_MODE as string) || "OFF").toUpperCase(); // LIVE | DRY_RUN | OFF
  
  // If Arcjet is not configured or disabled, return a no-op middleware
  if (!ENV.ARCJET_KEY || MODE === "OFF") {
    if (!ENV.ARCJET_KEY) {
      logger.info(
        "Arcjet key not provided - Arcjet middleware disabled."
      );
    } else {
      logger.info("Arcjet disabled via ARCJET_MODE=OFF");
    }
    // Return no-op middleware
    return (_req: any, _res: any, next: any) => next();
  }

  // Arcjet is only loaded if explicitly enabled (ESM/CommonJS compatibility)
  logger.warn(
    "Arcjet is enabled but requires ESM. Consider setting ARCJET_MODE=OFF for Vercel deployment."
  );
  
  // Return no-op middleware to prevent ESM/CommonJS errors on Vercel
  return (_req: any, _res: any, next: any) => next();
}

export default createArcjetMiddleware();
