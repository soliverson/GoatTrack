const axios = require('axios');
require('dotenv').config();

const fetchGoatBreeds = async () => {
    try {
        const response = await axios.get(process.env.API_NINJAS_URL, {
            headers: { 'X-Api-Key': process.env.API_NINJAS_KEY }
        });
        console.log('Fetched goat data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching goat data:', error);
        throw error;
    }
};

module.exports = fetchGoatBreeds;
