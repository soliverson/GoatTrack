require('dotenv').config();
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

// Debugging environment variables
console.log('Loaded Environment Variables:');
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('SESSION_SECRET:', process.env.SESSION_SECRET);
console.log('LIVESTOCK_API_URL:', process.env.LIVESTOCK_API_URL);
console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('AUTH_URL:', process.env.AUTH_URL);
console.log('CLIENT_PRIMARY_SECRET:', process.env.CLIENT_PRIMARY_SECRET);
console.log('CLIENT_SECONDARY_SECRET:', process.env.CLIENT_SECONDARY_SECRET);

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
app.use('/api', apiRoutes);
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
