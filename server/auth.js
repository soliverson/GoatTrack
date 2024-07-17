const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

console.log('Loaded Environment Variables in auth.js:');
console.log('CLIENT_ID:', process.env.LIVESTOCK_API_CLIENT_ID);
console.log('AUTH_URL:', process.env.LIVESTOCK_API_AUTH_URL);
console.log('CLIENT_PRIMARY_SECRET:', process.env.LIVESTOCK_API_CLIENT_PRIMARY_SECRET);
console.log('CLIENT_SECONDARY_SECRET:', process.env.LIVESTOCK_API_CLIENT_SECONDARY_SECRET);

const getAuthToken = async () => {
    try {
        const response = await axios.post(process.env.LIVESTOCK_API_AUTH_URL, {
            client_id: process.env.LIVESTOCK_API_CLIENT_ID,
            client_secret: process.env.LIVESTOCK_API_CLIENT_PRIMARY_SECRET,
            grant_type: 'client_credentials',
            scope: 'YOUR_API_SCOPE' // Replace with the actual scope if needed
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Correlation-ID': uuidv4()
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error acquiring token:', error);
        throw error;
    }
};

module.exports = {
    getAuthToken,
};
