# Database Scripts

This folder contains utility scripts for managing database data.

## Available Scripts

### 1. Seed Transactions (`seed-transactions.ts`)

Populates the database with 100 random transactions for testing purposes.

**Features:**

- Creates 100 transactions spread across the last 90 days
- Randomly assigns transactions to existing budgets
- Uses realistic categories (Food, Transport, Entertainment, etc.)
- Random amounts between $5 and $200
- Automatically updates budget spent amounts

**Requirements:**

- At least one user must exist in the database
- At least one budget must exist for that user

**Usage:**

```bash
cd server
npm run seed:transactions
```

**What it does:**

1. Finds the first user in the database
2. Gets all budgets for that user
3. Creates 100 random transactions with:
   - Random dates within the last 90 days
   - Random categories and names
   - Random amounts ($5 - $200)
   - Links to random budgets
4. Updates all budget spent amounts

---

### 2. Delete All Transactions (`delete-all-transactions.ts`)

Completely removes all transactions from the database.

**Features:**

- Deletes all transactions from the database
- Resets all budget spent amounts to $0
- Shows count before deletion
- Provides clear feedback

**⚠️ WARNING:** This action is irreversible!

**Usage:**

```bash
cd server
npm run delete:transactions
```

**What it does:**

1. Counts existing transactions
2. Deletes all transactions
3. Resets all budget spent amounts to 0
4. Confirms completion

---

## Development Tips

### Before Running Scripts

Make sure your database is properly set up:

```bash
npm run prisma:migrate
```

### Testing the Flow

1. Create a user and some budgets first
2. Run seed script: `npm run seed:transactions`
3. Check transactions in Prisma Studio: `npm run prisma:studio`
4. When done testing, clean up: `npm run delete:transactions`

### Customizing the Seed Script

You can modify `seed-transactions.ts` to:

- Change the number of transactions (currently 100)
- Adjust the date range (currently 90 days)
- Modify amount ranges (currently $5-$200)
- Add more categories
- Add more transaction names

---

## Troubleshooting

**Error: "No user found in database"**

- Create a user account first through the app or Prisma Studio

**Error: "No budgets found for this user"**

- Create at least one budget for the user first

**Error: "Cannot connect to database"**

- Check your `.env` file has correct DATABASE_URL
- Ensure your database is running
- Run `npm run prisma:generate` if needed
