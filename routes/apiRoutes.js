const express = require('express');
const router = express.Router();
const { fetchBreedInformation } = require('../api');

router.get('/breeds', async (req, res) => {
    try {
        const breeds = await fetchBreedInformation();
        res.json(breeds);
    } catch (error) {
        console.error('Error in /breeds route:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error fetching breed information', error: error.response ? error.response.data : error.message });
    }
});

module.exports = router;
