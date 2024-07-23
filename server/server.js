const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const session = require('express-session');

// Middleware to handle session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Route to handle API requests
app.use('/api', require('./api'));

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
