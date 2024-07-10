const msal = require('@azure/msal-node');

const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET,
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
