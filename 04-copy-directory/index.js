const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'copy-files');

function copyFiles() {
  fs.mkdir(copyPath, { recursive: true }, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }

    fs.readdir(dirPath, { withFileTypes: true }, (err, items) => {
      if (err) {
        console.error(err.message);
        return;
      }

      items.forEach((item) => {
        const dirPathFile = path.join(dirPath, item.name);
        const copyPathFile = path.join(copyPath, item.name);

        fs.copyFile(dirPathFile, copyPathFile, (err) => {
          if (err) {
            console.error(`Error copying ${item.name}:`);
          }
        });
      });
    });
  });
}

copyFiles();
