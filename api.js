const axios = require('axios');

const LIVESTOCK_API_URL = process.env.LIVESTOCK_API_URL;
const LIVESTOCK_API_KEY = process.env.LIVESTOCK_API_KEY;

const fetchBreedInformation = async () => {
    try {
        const response = await axios.get(`${LIVESTOCK_API_URL}/breeds`, {
            headers: { 'Authorization': `Bearer ${LIVESTOCK_API_KEY}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching breed information:', error);
        throw error;
    }
};

module.exports = {
    fetchBreedInformation
};
