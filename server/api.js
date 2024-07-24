const axios = require('axios');
require('dotenv').config();

const fetchGoatData = async () => {
    try {
        const response = await axios.get(process.env.USDA_API_URL);
        console.log('Fetched goat data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching goat data:', error);
        throw error;
    }
};

module.exports = fetchGoatData;
