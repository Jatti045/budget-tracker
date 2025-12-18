import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🗑️  Starting to delete all transactions...");

    // Count transactions before deletion
    const countBefore = await prisma.transaction.count();
    console.log(`📊 Found ${countBefore} transactions in the database`);

    if (countBefore === 0) {
      console.log("ℹ️  No transactions to delete.");
      return;
    }

    // Ask for confirmation
    console.log(
      "⚠️  WARNING: This will delete ALL transactions from the database!"
    );
    console.log("⚠️  This action cannot be undone!");

    // Delete all transactions
    const result = await prisma.transaction.deleteMany({});

    console.log(`✅ Successfully deleted ${result.count} transactions!`);

    // Reset budget spent amounts to 0
    console.log("🔄 Resetting budget spent amounts to 0...");

    const budgets = await prisma.budget.findMany();

    for (const budget of budgets) {
      await prisma.budget.update({
        where: { id: budget.id },
        data: { spent: 0 },
      });
    }

    console.log(`✅ Reset ${budgets.length} budgets!`);
    console.log("🎉 All transactions deleted and budgets reset successfully!");
  } catch (error) {
    console.error("❌ Error deleting transactions:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
