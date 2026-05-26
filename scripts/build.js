const { execSync } = require("child_process");

function runCommand(cmd) {
  try {
    console.log(`Running: ${cmd}`);
    execSync(cmd, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error executing: ${cmd}`);
    process.exit(1);
  }
}

const isNetlify = process.env.NETLIFY === "true" || process.env.CI === "true";

if (isNetlify) {
  console.log("🌐 Netlify environment detected. Running database push...");
  // 1. Sync database schema on cloud build (bypassing local ISP port blocks)
  runCommand("npx prisma db push --accept-data-loss");
} else {
  console.log("💻 Local environment detected. Skipping database push to prevent connection timeout.");
}

// 2. Generate Prisma Client local typings
runCommand("npx prisma generate");

// 3. Build Next.js application
runCommand("npx next build");
