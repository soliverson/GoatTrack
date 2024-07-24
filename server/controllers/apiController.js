const axios = require('axios');

exports.getGoatBreeds = async (req, res) => {
    try {
        const response = await axios.get(process.env.API_NINJAS_URL, {
            headers: { 'X-Api-Key': process.env.API_NINJAS_KEY }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching goat breeds:', error.message);
        res.status(500).json({ message: 'Error fetching goat breeds', error });
    }
};
