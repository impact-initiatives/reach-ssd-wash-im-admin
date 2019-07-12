require('dotenv').config();

const https = require('https');
const fs = require('fs');

const bucket = process.env.AWS_BUCKET;
const region = 'eu-west-1';

const srcPath = `https://s3-${region}.amazonaws.com/${bucket}/config/`;
const destPath = 'src/config/';

const downloadFile = name => {
  const file = fs.createWriteStream(destPath + name);
  https.get(srcPath + name, response => response.pipe(file));
};

if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);
downloadFile('data.d.ts');
downloadFile('exports.ts');
downloadFile('graphql-mutations.ts');
downloadFile('graphql-queries.ts');
downloadFile('graphql-schema.ts');
downloadFile('icon.svg');
downloadFile('site.js');
downloadFile('table-admin.tsx');
downloadFile('theme.sass');
