const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

// Read all HTML files in the pages directory
fs.readdir(pagesDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    if (path.extname(file) === '.html') {
      const filePath = path.join(pagesDir, file);
      
      // Read file content
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          console.error(`Error reading file ${file}:`, err);
          return;
        }

        // Update paths
        let updatedContent = content
          .replace(/href="css\//g, 'href="../assets/css/')
          .replace(/href="vendor\//g, 'href="../assets/vendor/')
          .replace(/src="js\//g, 'src="../assets/js/')
          .replace(/src="vendor\//g, 'src="../assets/vendor/')
          .replace(/src="img\//g, 'src="../assets/img/');

        // Write updated content back to file
        fs.writeFile(filePath, updatedContent, 'utf8', err => {
          if (err) {
            console.error(`Error writing file ${file}:`, err);
            return;
          }
          console.log(`Updated paths in ${file}`);
        });
      });
    }
  });
}); 