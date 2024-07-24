const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Use your routes
app.use('/', routes);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
