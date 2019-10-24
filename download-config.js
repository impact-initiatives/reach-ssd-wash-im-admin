require('dotenv').config();
const https = require('https');
const fs = require('fs');

const repo = process.env.REPO_FOLDER;

const srcPath = `https://raw.githubusercontent.com/impact-initiatives/impact-api/master/src/${repo}/config/`;
const destPath = 'src/config/';

const downloadFile = name => {
  const file = fs.createWriteStream(destPath + name);
  https.get(srcPath + name, response => response.pipe(file));
};

if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);
downloadFile('exports.ts');
downloadFile('graphql.ts');
downloadFile('icon.svg');
downloadFile('schema.ts');
downloadFile('site.js');
downloadFile('table-public.tsx');
downloadFile('table-admin.tsx');
downloadFile('theme.sass');
