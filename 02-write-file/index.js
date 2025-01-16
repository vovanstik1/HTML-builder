const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Enter some text. Type "exit" or press Ctrl+C to quit.');

function stop() {
  console.log('end process');
  writeStream.end();
  interface.close();
  process.exit();
}

interface.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    stop();
  } else {
    writeStream.write(input + '\n');
  }
});

interface.on('SIGINT', () => {
  stop();
});
