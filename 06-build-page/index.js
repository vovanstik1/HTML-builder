const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'assets');
const projectDist = path.join(__dirname, 'project-dist');
const copyPath = path.join(projectDist, 'assets');
const stylePath = path.join(__dirname, 'styles');
const outputStylePath = path.join(projectDist, 'style.css');

fs.mkdir(projectDist, { recursive: true }, (err) => {
  if (err) {
    console.error(`Error to create folder project-dist ${err.message}`);
    return;
  }
});

copyFiles(dirPath, copyPath);
mergeStyles();

function mergeStyles() {
  const write = fs.createWriteStream(outputStylePath);

  fs.readdir(stylePath, { withFileTypes: true }, (err, items) => {
    if (err) {
      console.error('Error reading styles directory:', err.message);
      return;
    }

    items.forEach((item) => {
      const itemPath = path.join(stylePath, item.name);
      if (path.extname(item.name) === '.css') {
        const read = fs.createReadStream(itemPath, 'utf8');

        read.on('data', (styles) => {
          write.write(styles + '\n');
        });
      }
    });
  });
}

function copyFiles(src, dest) {
  fs.mkdir(dest, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error to create folder ${dest}: ${err.message}`);
      return;
    }

    fs.readdir(src, { withFileTypes: true }, (err, items) => {
      if (err) {
        console.error(`Error to read folder ${src}: ${err.message}`);
        return;
      }

      items.forEach((item) => {
        const srcPath = path.join(src, item.name);
        const destPath = path.join(dest, item.name);

        if (item.isDirectory()) {
          copyFiles(srcPath, destPath);
        } else if (item.isFile()) {
          fs.copyFile(srcPath, destPath, (err) => {
            if (err) {
              console.error(
                `Error to copy file ${srcPath} in ${destPath}: ${err.message}`,
              );
            }
          });
        }
      });
    });
  });
}
