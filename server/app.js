const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const goatRoutes = require('./routes/goatRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Load environment variables
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes); // Include the apiRoutes
app.use('/goats', goatRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
    });
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.error('Mongoose connection error:', err));
