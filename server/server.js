const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const apiRoutes = require('./routes/apiRoutes');

app.use(express.static(path.join(__dirname, 'client', 'public')));
app.use('/api', apiRoutes);

app.get('/goat-data', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'goat-data.html'));
});

app.get('/goat-profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'goat-profile.html'));
});

app.get('/community-forum', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'community-forum.html'));
});

app.get('/goat-breeds', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'goat-breeds.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
