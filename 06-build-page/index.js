const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'assets');
const projectDist = path.join(__dirname, 'project-dist');

fs.mkdir(projectDist, { recursive: true }, (err) => {
  if (err) {
    console.error(`Error to create folder project-dist ${err.message}`);
  }
});

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
