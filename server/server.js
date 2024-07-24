// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const session = require('express-session');
const routes = require('./routes');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
