const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'secret-folder');

function displayFileInfo() {
  fs.readdir(dirPath, { withFileTypes: true }, (err, items) => {
    if (err) {
      console.error('Error:', err.message);
      return;
    }

    items.forEach((item) => {
      if (item.isFile()) {
        const filePath = path.join(dirPath, item.name);

        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error('Error:', err.message);
            return;
          }

          const ext = path.extname(item.name).slice(1);
          const baseName = path.basename(item.name, `.${ext}`);
          const sizeKB = stats.size / 1024;

          console.log(`${baseName} - ${ext} - ${sizeKB.toFixed(3)}kb`);
        });
      }
    });
  });
}

displayFileInfo();
