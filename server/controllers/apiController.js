const axios = require('axios');

exports.getGoatData = async (req, res) => {
    try {
        const response = await axios.get(process.env.REACT_APP_USDA_API_URL);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching goat data:', error);
        res.status(500).json({ message: 'Error fetching goat data', error });
    }
};
