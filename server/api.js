const axios = require('axios');
require('dotenv').config();

const fetchGoatData = async () => {
    try {
        const response = await axios.get('https://api.thegoatapi.com/v1/breeds');
        console.log('Fetched goat data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching goat data:', error);
        throw error;
    }
};

module.exports = fetchGoatData;
