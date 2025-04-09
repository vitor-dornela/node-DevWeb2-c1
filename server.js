const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the src directory
app.use(express.static(path.join(__dirname, 'src')));

// Route for the main dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/pages/index.html'));
});

// Route for login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/pages/login.html'));
});

// Route for register page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/pages/register.html'));
});

// Route for forgot password page
app.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/pages/forgot-password.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 