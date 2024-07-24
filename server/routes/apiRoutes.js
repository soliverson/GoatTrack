const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/goat-breeds', async (req, res) => {
  try {
    const response = await axios.get(process.env.API_NINJAS_URL, {
      headers: { 'X-Api-Key': process.env.API_NINJAS_KEY }
    });
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to fetch goat breeds' });
  }
});

module.exports = router;
