const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { getBreedData } = require('./api');
const { getAuthToken } = require('./auth');
const routes = require('./routes'); // Assuming you have a routes file

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Use your routes
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
