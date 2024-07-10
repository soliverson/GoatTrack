const msal = require('@azure/msal-node');
require('dotenv').config();

console.log('Loaded Environment Variables in auth.js:');
console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('AUTH_URL:', process.env.AUTH_URL);
console.log('CLIENT_PRIMARY_SECRET:', process.env.CLIENT_PRIMARY_SECRET);
console.log('CLIENT_SECONDARY_SECRET:', process.env.CLIENT_SECONDARY_SECRET);

const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: process.env.AUTH_URL,
        clientSecret: process.env.CLIENT_PRIMARY_SECRET, // Use the primary secret
    },
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

const getAuthToken = async () => {
    try {
        const authResult = await cca.acquireTokenByClientCredential({
            scopes: ['https://graph.microsoft.com/.default'],
        });
        return authResult.accessToken;
    } catch (error) {
        console.error('Error acquiring token:', error);
        throw error;
    }
};

module.exports = {
    getAuthToken,
};
