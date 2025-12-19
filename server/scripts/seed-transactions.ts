import { PrismaClient, TransactionType } from "@prisma/client";
import { Console, log } from "console";

const prisma = new PrismaClient();

const categories = [
  { name: "Food", icon: "coffee" },
  { name: "Transport", icon: "car" },
  { name: "Entertainment", icon: "film" },
  { name: "Shopping", icon: "shopping-bag" },
  { name: "Bills", icon: "file-text" },
  { name: "Healthcare", icon: "heart" },
  { name: "Education", icon: "book" },
  { name: "Groceries", icon: "shopping-cart" },
];

const transactionNames = [
  "Coffee",
  "Lunch",
  "Dinner",
  "Uber ride",
  "Gas",
  "Movie tickets",
  "Netflix subscription",
  "Grocery shopping",
  "Online shopping",
  "Electric bill",
  "Water bill",
  "Internet bill",
  "Doctor visit",
  "Pharmacy",
  "Books",
  "Course subscription",
  "Restaurant",
  "Fast food",
  "Taxi",
  "Bus ticket",
  "Train ticket",
  "Concert tickets",
  "Gaming",
  "Clothes",
  "Shoes",
  "Rent",
  "Insurance",
  "Gym membership",
  "Phone bill",
  "Parking",
];

const main = async () => {
  try {
    console.log("Seeding transactions...");

    // Get the first user in the database
    const user = await prisma.user.findFirst();

    if (!user) {
      console.error(
        "No user found in the database. Please create a user first."
      );
      return;
    }

    console.log("Found user:", user.email);

    // Get all budgets for this user
    const budgets = await prisma.budget.findMany({
      where: { userId: user.id },
    });

    if (budgets.length === 0) {
      console.error(
        "No budgets found for the user. Please create budgets first."
      );
      return;
    }

    console.log(`Found ${budgets.length} budgets for user.`);

    // Generate 100 transactions
    const transactions = [];
    const now = new Date();

    for (let i = 0; i < 100; i++) {
      // Random date within the last 6 months
      const daysAgo = Math.floor(Math.random() * 180);
      const transactionDate = new Date(now);
      transactionDate.setDate(transactionDate.getDate() - daysAgo);

      // Random category and budget
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const randomBudget = budgets[Math.floor(Math.random() * budgets.length)];
      const randomName =
        transactionNames[Math.floor(Math.random() * transactionNames.length)];

      // Random amount between $5 and $20
      const amount = parseFloat((Math.random() * 15 + 5).toFixed(2));

      transactions.push({
        name: randomName,
        amount,
        date: transactionDate,
        type: TransactionType.EXPENSE,
        category: randomCategory.name,
        budgetId: randomBudget.id,
        userId: user.id,
        icon: randomCategory.icon,
        description: `Transaction #${i + 1}`,
      });
    }

    const createdTransactions = await prisma.transaction.createMany({
      data: transactions,
    });

    console.log("Successfully seeded transactions:", createdTransactions.count);
    // Update budget spent amounts
    console.log("Updating budget spent amounts...");
    for (const budget of budgets) {
      const totalSpent = await prisma.transaction.aggregate({
        where: {
          budgetId: budget.id,
        },
        _sum: {
          amount: true,
        },
      });

      await prisma.budget.update({
        where: { id: budget.id },
        data: {
          spent: totalSpent._sum.amount || 0,
        },
      });
    }

    console.log("Budget spent amounts updated.");
    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding transactions:", error);
  } finally {
    await prisma.$disconnect();
  }
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
