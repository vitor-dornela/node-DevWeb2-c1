const fs = require('fs');
const path = require('path');

// Function to update paths in HTML files
function updatePaths(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update asset paths to be relative to the root
    content = content.replace(/\.\.\/assets\//g, 'assets/');
    
    // Update page links to be relative to the root
    content = content.replace(/href="\.\.\/pages\/([^"]+)"/g, 'href="$1"');
    
    fs.writeFileSync(filePath, content);
}

// Process all HTML files in the dist directory
const distDir = path.join(__dirname, '../dist');
const pagesDir = path.join(distDir, 'pages');

// Update paths in all HTML files
fs.readdirSync(pagesDir).forEach(file => {
    if (file.endsWith('.html')) {
        updatePaths(path.join(pagesDir, file));
    }
});

// Create a redirect index.html in the root
const redirectContent = `<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=pages/index.html">
    <title>Redirecting...</title>
</head>
<body>
    <p>Redirecting to dashboard...</p>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), redirectContent);

console.log('Static site preparation complete!'); 