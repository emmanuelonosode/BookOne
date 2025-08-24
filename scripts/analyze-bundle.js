#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🔍 Analyzing bundle size and performance...\n");

// Build the application
console.log("📦 Building application...");
try {
  execSync("npm run build", { stdio: "inherit" });
  console.log("✅ Build completed successfully\n");
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}

// Analyze bundle size
console.log("📊 Analyzing bundle size...");
try {
  execSync("npx @next/bundle-analyzer .next/static/chunks", {
    stdio: "inherit",
  });
} catch (error) {
  console.log(
    "⚠️  Bundle analyzer not available. Install with: npm install --save-dev @next/bundle-analyzer"
  );
}

// Check for large dependencies
console.log("\n📋 Checking for large dependencies...");
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const dependencies = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
};

console.log("📦 Dependencies to monitor for size:");
Object.entries(dependencies).forEach(([name, version]) => {
  if (
    ["framer-motion", "chart.js", "@sanity/client", "react-icons"].includes(
      name
    )
  ) {
    console.log(`  - ${name}@${version} (large library)`);
  }
});

console.log("\n🚀 Performance optimization tips:");
console.log("  1. Use dynamic imports for heavy components");
console.log("  2. Implement proper caching strategies");
console.log("  3. Optimize images with next/image");
console.log("  4. Use React.memo for expensive components");
console.log("  5. Implement code splitting for routes");
console.log("  6. Monitor Core Web Vitals");
console.log("  7. Use Lighthouse for performance audits");

console.log("\n✅ Bundle analysis completed!");
