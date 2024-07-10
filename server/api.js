const axios = require('axios');
require('dotenv').config();

const getBreedData = async () => {
    try {
        const response = await axios.get(process.env.LIVESTOCK_API_URL);
        console.log('Fetched breed data:', response.data); // Log the response to ensure data is fetched
        return response.data;
    } catch (error) {
        console.error('Error fetching breed data:', error);
        throw error;
    }
};

module.exports = {
    getBreedData,
};
