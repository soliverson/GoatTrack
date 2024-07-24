const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/goat-breeds', async (req, res) => {
  try {
    console.log('Fetching goat breeds from API...');
    const response = await axios.get('https://api.api-ninjas.com/v1/animals?name=goat', {
      headers: {
        'X-Api-Key': 'kEAujUwXO4z9bTAP5vekcnpU2HcUJ3u9JrubI17x'
      }
    });

    console.log('Response received from API:', response.status, response.data);

    if (response.status !== 200) {
      console.log('Non-200 response:', response.status, response.statusText);
      return res.status(response.status).send(`API Error: ${response.status} ${response.statusText}`);
    }

    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
