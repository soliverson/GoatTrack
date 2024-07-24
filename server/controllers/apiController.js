const axios = require('axios');

exports.getGoatBreeds = async (req, res) => {
    try {
        const response = await axios.get('https://api.api-ninjas.com/v1/animals?name=goat', {
            headers: { 'X-Api-Key': process.env.API_NINJAS_KEY }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching breed data:', error);
        res.status(500).json({ error: 'Failed to fetch breed data' });
    }
};
