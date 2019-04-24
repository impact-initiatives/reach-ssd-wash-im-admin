const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { Bucket, region } = require('./src/config/aws/aws-exports-node');

const s3 = new AWS.S3({ params: { Bucket }, region });

const makeParent = filePath => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) return true;
  makeParent(dirname);
  fs.mkdirSync(dirname);
};

const download = Key => {
  if (Key.endsWith('/')) return;
  const dest = path.resolve(__dirname, 'static', 'media', Key);
  makeParent(dest);
  const file = fs.createWriteStream(dest);
  s3.getObject({ Bucket, Key })
    .createReadStream()
    .pipe(file);
};

s3.listObjectsV2({ Bucket }).eachPage((err, data) => {
  if (err) return;
  if (data) data.Contents.forEach(({ Key }) => download(Key));
});
