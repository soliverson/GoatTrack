const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_NINJAS_KEY = process.env.API_NINJAS_KEY;

router.get('/goat-breeds', async (req, res) => {
    try {
        const response = await axios.get('https://api.api-ninjas.com/v1/animals?name=goat', {
            headers: { 'X-Api-Key': API_NINJAS_KEY }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching breed information', error });
    }
});

router.get('/goat-breeds/:name', async (req, res) => {
    const breedName = req.params.name;
    try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/animals?name=${breedName}`, {
            headers: { 'X-Api-Key': API_NINJAS_KEY }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: `Error fetching data for breed: ${breedName}`, error });
    }
});

module.exports = router;
