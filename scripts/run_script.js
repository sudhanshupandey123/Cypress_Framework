const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read tags from cypress.env.json
const envJsonPath = path.resolve(__dirname, '../cypress.env.json');
const envJsonContent = fs.readFileSync(envJsonPath, 'utf8');
const envVars = JSON.parse(envJsonContent);
let tags = envVars.TAGS ? envVars.TAGS.trim() : '';

if (!tags) {
  console.error('No TAGS found in cypress.env.json.');
  process.exit(1);
}

// Convert comma-separated tags to cucumber expression with 'or'
const tagExpression = tags
  .split(',')
  .map(tag => tag.trim())
  .filter(Boolean)
  .join(' or ');

console.log(`Running Cypress Cucumber tests with tag expression: ${tagExpression}`);

// const command = `npx cypress run --headed --browser chrome --env cucumberTags="${tagExpression}"`;
const command = `npx cypress run --headed --browser chrome --env TAGS="${tagExpression}"`;

try {
  execSync(command, { stdio: 'inherit', shell: 'powershell.exe' });
  // After Cypress run, organize videos by tag
  execSync('node scripts/organize_videos_by_tags.js', { stdio: 'inherit', shell: 'powershell.exe' });
} catch (err) {
  process.exit(err.status || 1);
}


