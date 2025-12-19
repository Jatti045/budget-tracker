import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  try {
    console.log("Deleting all transactions...");

    // Count transactions before deletion
    const countBefore = await prisma.transaction.count();
    console.log(`Transactions before deletion: ${countBefore}`);

    if (countBefore === 0) {
      console.log("No transactions to delete.");
      return;
    }

    // Delete all transactions
    const deletedResult = await prisma.transaction.deleteMany({});
    console.log(`Deleted ${deletedResult.count} transactions.`);

    // Reset budget spent amount to zero
    const budgets = await prisma.budget.findMany();
    for (const budget of budgets) {
      await prisma.budget.update({
        where: { id: budget.id },
        data: { spent: 0 },
      });
    }

    console.log("Reset spent amounts for all budgets to zero.");
    console.log("All transactions deleted successfully.");
  } catch (error) {
    console.error("Error deleting transactions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
