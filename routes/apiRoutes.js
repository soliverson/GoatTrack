const express = require('express');
const router = express.Router();
const { fetchBreedInformation } = require('../api');

router.get('/breeds', async (req, res) => {
    try {
        const breeds = await fetchBreedInformation();
        res.json(breeds);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching breed information' });
    }
});

module.exports = router;
