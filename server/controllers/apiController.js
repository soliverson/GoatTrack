const axios = require('axios');
require('dotenv').config();

exports.getGoatData = async (req, res) => {
    try {
        console.log('Fetching goat data...');
        const response = await axios.get(`${process.env.USDA_API_URL}/query`, {
            params: {
                f: 'json',
                where: '1=1',
                outFields: 'STATE_NAME,Name,y17_M119_valueText,y17_M119_classRange,y17_M120_valueText,y17_M120_classRange,y17_M121_valueText,y17_M121_classRange',
                returnGeometry: false
            }
        });
        console.log('Response data:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching goat data:', error.message);
        res.status(500).json({ message: 'Error fetching goat data', error });
    }
};
