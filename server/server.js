const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Your API route to fetch goat data
app.get('/api/goat-data', async (req, res) => {
    try {
        const response = await fetch(process.env.REACT_APP_USDA_API_URL);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching goat data:', error);
        res.status(500).json({ message: 'Error fetching goat data' });
    }
});

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
