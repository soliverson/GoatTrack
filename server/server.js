const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const apiRoutes = require('./routes/apiRoutes'); // Adjust the path if needed

app.use(express.static(path.join(__dirname, 'client', 'public')));
app.use('/api', apiRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
