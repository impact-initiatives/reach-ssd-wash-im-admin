require('dotenv').config();
const https = require('https');
const fs = require('fs');

const site = require('./src/config/site.js');

const repo = process.env.REPO_FOLDER;

const srcPath = `https://raw.githubusercontent.com/impact-initiatives/impact-api/master/src/${repo}/config/`;
const destPath = 'src/config/';

const downloadFile = name => {
  const file = fs.createWriteStream(destPath + name);
  https.get(srcPath + name, response => response.pipe(file));
};

if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);
site.maps.forEach(map => downloadFile(map));
