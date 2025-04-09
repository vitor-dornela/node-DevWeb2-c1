const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Function to execute shell commands
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        reject(error);
        return;
      }
      console.log(stdout);
      resolve();
    });
  });
}

async function deploy() {
  try {
    // Initialize git if not already initialized
    if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
      await executeCommand('git init');
    }

    // Add all files
    await executeCommand('git add .');

    // Commit changes
    await executeCommand('git commit -m "Deploy to GitHub Pages"');

    // Add remote if not exists
    try {
      await executeCommand('git remote -v');
    } catch {
      await executeCommand('git remote add origin https://github.com/vitor-dornela/node-DevWeb2-c1.git');
    }

    // Push to gh-pages branch
    await executeCommand('git push -f origin HEAD:gh-pages');

    console.log('Deployment successful!');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deploy(); 