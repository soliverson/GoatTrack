const axios = require('axios');
const { getAuthToken } = require('./auth');

const LIVESTOCK_API_URL = process.env.LIVESTOCK_API_URL;
const LIVESTOCK_API_KEY = process.env.LIVESTOCK_API_KEY;

const fetchBreedInformation = async () => {
    try {
        const token = await getAuthToken();
        const response = await axios.get(`${LIVESTOCK_API_URL}/breeds`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Ocp-Apim-Subscription-Key': LIVESTOCK_API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching breed information:', error.response ? error.response.data : error.message);
        throw error;
    }
};

module.exports = {
    fetchBreedInformation,
};
