const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "out");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const content = `User-agent: *
Disallow: /`;

const outputPath = path.join(outputDir, "robots.txt");
fs.writeFileSync(outputPath, content);

console.log("robots.txt has been created.");
