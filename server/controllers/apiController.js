const axios = require('axios');

exports.getGoatData = async (req, res) => {
    try {
        console.log('Fetching goat data...');
        const response = await axios.get(process.env.USDA_API_URL);
        console.log('Response data:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching goat data:', error.message);
        res.status(500).json({ message: 'Error fetching goat data', error });
    }
};

exports.getGoatBreeds = async (req, res) => {
    try {
        console.log('Fetching goat breeds...');
        const response = await axios.get('https://api.api-ninjas.com/v1/animals?name=goat', {
            headers: { 'X-Api-Key': process.env.API_NINJAS_KEY }
        });
        console.log('Response data:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching goat breeds:', error.message);
        res.status(500).json({ message: 'Error fetching goat breeds', error });
    }
};
