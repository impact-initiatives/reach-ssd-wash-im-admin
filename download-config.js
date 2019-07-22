require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const Bucket = process.env.AWS_BUCKET;
const region = 'eu-west-1';
const Prefix = 'config/';
const Delimiter = '/';

const s3 = new AWS.S3({ params: { Bucket }, region });

const makeParent = filePath => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) return true;
  makeParent(dirname);
  fs.mkdirSync(dirname);
};

const download = Key => {
  if (Key.endsWith('/')) return;
  const dest = path.resolve(__dirname, 'src', 'config', Key);
  makeParent(dest);
  const file = fs.createWriteStream(dest);
  s3.getObject({ Bucket, Key })
    .createReadStream()
    .pipe(file);
};

s3.listObjectsV2({ Bucket, Delimiter, Prefix }).eachPage((err, data) => {
  if (err) console.error(err);
  if (data) data.Contents.forEach(({ Key }) => download(Key));
});
