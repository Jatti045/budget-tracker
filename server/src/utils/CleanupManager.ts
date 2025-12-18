import logger from "../utils/logger";
import { prisma } from "../server";

// Background cleanup: delete expired password reset tokens
let cleanupInterval: NodeJS.Timeout | null = null;

// Delete expired password reset tokens
export async function deleteExpiredResetTokens() {
  try {
    const now = new Date();
    const result = await prisma.passwordResetToken.deleteMany({
      where: {
        expiresAt: {
          lt: now,
        },
      },
    });
    if (result && typeof result.count === "number") {
      logger.info(`Deleted ${result.count} expired password reset tokens.`);
    }
  } catch (err) {
    logger.warn("Failed to delete expired password reset tokens:", err);
  }
}

// Run cleanup immediately and then every minute
export async function startCleanupJob() {
  try {
    await deleteExpiredResetTokens();
    cleanupInterval = setInterval(() => {
      deleteExpiredResetTokens().catch((e) =>
        logger.warn("Error in scheduled deleteExpiredResetTokens:", e)
      );
    }, 60 * 1000); // every 60 seconds
    logger.info("Started expired password reset token cleanup job.");
  } catch (e) {
    logger.warn("Failed to start cleanup job:", e);
  }
}

// Stop the cleanup job
export function stopCleanupJob() {
  if (cleanupInterval) {
    clearInterval(cleanupInterval as unknown as number);
    cleanupInterval = null;
  }
}
