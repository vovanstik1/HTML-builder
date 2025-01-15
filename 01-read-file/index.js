const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const ReadStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

ReadStream.pipe(process.stdout);
