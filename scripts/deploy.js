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
    // Check if git is initialized
    if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
      console.log('Initializing git repository...');
      await executeCommand('git init');
    }

    // Configure git globally
    console.log('Configuring git...');
    await executeCommand('git config --global user.name "vitor-dornela"');
    await executeCommand('git config --global user.email "vitor.dornela.m@gmail.com"');

    // Add all files
    console.log('Adding files to git...');
    await executeCommand('git add dist');

    // Commit changes
    console.log('Committing changes...');
    await executeCommand('git commit -m "Deploy to GitHub Pages"');

    // Check if remote exists
    try {
      await executeCommand('git remote -v');
    } catch {
      console.log('Please add your GitHub repository URL:');
      console.log('git remote add origin https://github.com/vitor-dornela/node-DevWeb2-c1.git');
      process.exit(1);
    }

    // Push to gh-pages branch
    console.log('Pushing to gh-pages branch...');
    await executeCommand('git push -f origin HEAD:gh-pages');

    console.log('Deployment successful!');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deploy(); 