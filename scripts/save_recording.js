// // scripts/organize_videos_by_tag.js
// // Moves all .mp4 videos from the videos/ folder into a subfolder named after the TAGS value in cypress.env.json
// const fs = require('fs');
// const path = require('path');
// const env = require('../cypress.env.json');

// const tag = env.TAGS ? env.TAGS.replace(/[@~]/g, '') : 'untagged';
// const videosDir = path.join(__dirname, '../videos');
// const destDir = path.join(videosDir, tag);

// if (!fs.existsSync(destDir)) {
//   fs.mkdirSync(destDir, { recursive: true });
// }

// fs.readdirSync(videosDir).forEach(file => {
//   if (file.endsWith('.mp4')) {
//     const src = path.join(videosDir, file);
//     const dest = path.join(destDir, file);
//     if (src !== dest) {
//       fs.renameSync(src, dest);
//     }
//   }
// });
// console.log(`Videos moved to ${destDir}`);



const fs = require('fs');
const path = require('path');
const env = require('../cypress.env.json');

const tag = env.TAGS ? env.TAGS.replace(/[@~]/g, '') : 'untagged';
const videosDir = path.join(__dirname, '../videos');
const destDir = path.join(videosDir, tag);

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.readdirSync(videosDir).forEach(file => {
  if (file.endsWith('.mp4')) {
    const src = path.join(videosDir, file);
    // Rename file to include tag and date
    const dateStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const dest = path.join(destDir, `${tag}-${dateStr}-${file}`);
    fs.renameSync(src, dest);
  }
});
console.log(`Videos moved to ${destDir} and renamed with tag and date.`);