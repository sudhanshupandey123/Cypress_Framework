// Description: This script reads the TAGS variable from cypress.env.json and runs Cypress tests with the specified tags.


const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read tags from cypress.env.json
const envJsonPath = path.resolve(__dirname, '../cypress.env.json');
const envJsonContent = fs.readFileSync(envJsonPath, 'utf8');
const envVars = JSON.parse(envJsonContent);
const tags = envVars.TAGS ? envVars.TAGS.trim() : '';

if (!tags) {
  console.error('No TAGS found in cypress.env.json.');
  process.exit(1);
}

console.log(`Running Cypress Cucumber tests with tag expression: ${tags}`);

const command = `npx cypress run --headed --browser chrome --env cucumberTags='${tags}'`;

try {
  execSync(command, { stdio: 'inherit', shell: 'powershell.exe' });
  // After Cypress run, organize videos by tag
  execSync('node scripts/organize_videos_by_tags.js', { stdio: 'inherit', shell: 'powershell.exe' });
} catch (err) {
  process.exit(err.status || 1);
}
