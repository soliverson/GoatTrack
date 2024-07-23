const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();
const routes = require('./routes');

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Use your routes
app.use('/api', routes);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
