// Generate secure keys for production deployment
// Run with: node generate-keys.js

const crypto = require("crypto");

console.log("\n🔐 Production Security Keys Generator\n");
console.log("Copy these into your Render environment variables:\n");
console.log("=".repeat(60));

// Generate JWT Secret (64 characters)
const jwtSecret = crypto.randomBytes(32).toString("hex");
console.log("\n1. JWT_SECRET_KEY (for authentication):");
console.log(jwtSecret);

// Generate another backup key
const jwtSecret2 = crypto.randomBytes(32).toString("hex");
console.log("\n2. Backup JWT_SECRET_KEY (save for rotation):");
console.log(jwtSecret2);

// Generate session secret (if needed)
const sessionSecret = crypto.randomBytes(32).toString("hex");
console.log("\n3. SESSION_SECRET (if needed for sessions):");
console.log(sessionSecret);

console.log("\n" + "=".repeat(60));
console.log("\n✅ Keys generated successfully!");
console.log("\n📋 Next Steps:");
console.log("   1. Copy JWT_SECRET_KEY to Render environment variables");
console.log("   2. Save backup key in a secure password manager");
console.log("   3. Never commit these keys to version control");
console.log("   4. Rotate keys every 90 days for security\n");

// Show example .env format
console.log("\n📝 Example .env format:");
console.log("=".repeat(60));
console.log(`DATABASE_URL=postgresql://user:pass@host:5432/db
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
JWT_SECRET_KEY=${jwtSecret}
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ALLOWED_ORIGINS=*`);
console.log("=".repeat(60) + "\n");
