const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/goat-breeds', async (req, res) => {
  try {
    const response = await axios.get(process.env.API_NINJAS_URL, {
      headers: {
        'X-Api-Key': process.env.API_NINJAS_KEY
      }
    });

    if (response.status !== 200) {
      return res.status(response.status).send(`API Error: ${response.status} ${response.statusText}`);
    }

    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
