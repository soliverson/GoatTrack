const axios = require('axios');
const { getAuthToken } = require('./auth');
require('dotenv').config();

const getBreedData = async () => {
    const token = await getAuthToken();

    try {
        const response = await axios.get(process.env.LIVESTOCK_API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Ocp-Apim-Subscription-Key': process.env.CLIENT_PRIMARY_SECRET,  // Using CLIENT_PRIMARY_SECRET
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching breed data:', error);
        throw error;
    }
};

module.exports = {
    getBreedData,
};
