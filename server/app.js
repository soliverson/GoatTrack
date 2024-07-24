const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/apiRoutes');

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/api', apiRoutes);

app.get('/goat-data', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public', 'goat-data.html'));
});

app.get('/goat-profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public', 'goat-profile.html'));
});

app.get('/community-forum', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public', 'community-forum.html'));
});

app.get('/goat-breeds', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public', 'goat-breeds.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });
