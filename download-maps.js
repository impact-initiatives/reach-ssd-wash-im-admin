require('dotenv').config();
const https = require('https');
const fs = require('fs');

const site = require('./src/config/site.js');

const bucket = process.env.AWS_BUCKET;
const region = 'eu-west-1';

const srcPath = `https://s3-${region}.amazonaws.com/${bucket}/config/`;
const destPath = 'src/config/';

const downloadFile = name => {
  const file = fs.createWriteStream(destPath + name);
  https.get(srcPath + name, response => response.pipe(file));
};

if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);
site.maps.forEach(map => downloadFile(map));
