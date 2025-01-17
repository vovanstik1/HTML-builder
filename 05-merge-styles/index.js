const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, 'styles');
const projectPath = path.join(__dirname, 'project-dist');
const bundle = path.join(projectPath, 'bundle.css');

function mergeStyles() {
  const write = fs.createWriteStream(bundle);

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
mergeStyles();
