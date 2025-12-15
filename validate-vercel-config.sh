#!/bin/bash

# Vercel Deployment Configuration Validator
# Run this script to verify your setup before deploying to Vercel

echo "================================"
echo "Vercel Deployment Configuration Validator"
echo "================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0
warnings=0

# Check 1: Node.js version
echo "Checking Node.js version..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found"
    ((errors++))
fi

# Check 2: Verify server directory exists
echo ""
echo "Checking directory structure..."
if [ -d "server" ]; then
    echo -e "${GREEN}✓${NC} server/ directory found"
else
    echo -e "${RED}✗${NC} server/ directory not found"
    ((errors++))
fi

# Check 3: Verify package.json
echo ""
echo "Checking package.json..."
if [ -f "server/package.json" ]; then
    echo -e "${GREEN}✓${NC} server/package.json found"
    
    # Check for build script
    if grep -q '"build"' server/package.json; then
        echo -e "${GREEN}✓${NC} build script configured"
    else
        echo -e "${RED}✗${NC} build script missing in package.json"
        ((errors++))
    fi
else
    echo -e "${RED}✗${NC} server/package.json not found"
    ((errors++))
fi

# Check 4: Verify vercel.json
echo ""
echo "Checking vercel.json..."
if [ -f "server/vercel.json" ]; then
    echo -e "${GREEN}✓${NC} server/vercel.json found"
    
    if grep -q '"src": "src/server.ts"' server/vercel.json; then
        echo -e "${GREEN}✓${NC} vercel.json correctly points to src/server.ts"
    else
        echo -e "${YELLOW}⚠${NC} vercel.json may need updating"
        ((warnings++))
    fi
else
    echo -e "${RED}✗${NC} server/vercel.json not found"
    ((errors++))
fi

# Check 5: Verify TypeScript configuration
echo ""
echo "Checking TypeScript setup..."
if [ -f "server/tsconfig.json" ]; then
    echo -e "${GREEN}✓${NC} server/tsconfig.json found"
else
    echo -e "${RED}✗${NC} server/tsconfig.json not found"
    ((errors++))
fi

# Check 6: Verify Prisma setup
echo ""
echo "Checking Prisma configuration..."
if [ -f "server/prisma/schema.prisma" ]; then
    echo -e "${GREEN}✓${NC} server/prisma/schema.prisma found"
    
    if grep -q 'provider = "postgresql"' server/prisma/schema.prisma; then
        echo -e "${GREEN}✓${NC} PostgreSQL provider configured"
    else
        echo -e "${YELLOW}⚠${NC} Verify Prisma datasource configuration"
        ((warnings++))
    fi
else
    echo -e "${RED}✗${NC} server/prisma/schema.prisma not found"
    ((errors++))
fi

# Check 7: Verify .env.example exists
echo ""
echo "Checking environment setup..."
if [ -f "server/.env.example" ]; then
    echo -e "${GREEN}✓${NC} server/.env.example found"
else
    echo -e "${YELLOW}⚠${NC} server/.env.example not found (create from template)"
    ((warnings++))
fi

# Check 8: Try to run build locally
echo ""
echo "Attempting local build..."
cd server 2>/dev/null
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Local build successful"
    
    # Check if dist folder was created
    if [ -d "dist" ]; then
        echo -e "${GREEN}✓${NC} dist/ folder generated"
    else
        echo -e "${RED}✗${NC} dist/ folder not generated"
        ((errors++))
    fi
else
    echo -e "${RED}✗${NC} Local build failed"
    echo "  Run: cd server && npm run build"
    ((errors++))
fi
cd - > /dev/null 2>&1

# Check 9: Verify server.ts exists
echo ""
echo "Checking server entry point..."
if [ -f "server/src/server.ts" ]; then
    echo -e "${GREEN}✓${NC} server/src/server.ts found"
else
    echo -e "${RED}✗${NC} server/src/server.ts not found"
    ((errors++))
fi

# Summary
echo ""
echo "================================"
echo "Summary"
echo "================================"
if [ $errors -eq 0 ] && [ $warnings -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo "You're ready to deploy to Vercel."
elif [ $errors -eq 0 ]; then
    echo -e "${YELLOW}⚠ $warnings warning(s) found${NC}"
    echo "Review warnings above before deploying."
else
    echo -e "${RED}✗ $errors error(s) found${NC}"
    echo "Fix errors above before deploying."
fi

echo ""
echo "Next steps:"
echo "1. Add environment variables to Vercel Dashboard"
echo "2. Deploy: vercel --prod"
echo "3. Test health endpoint: curl https://your-app.vercel.app/api/health"
echo "4. Monitor logs: vercel logs"
