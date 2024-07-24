const fetchGoatData = require('../api');

exports.getGoatData = async (req, res) => {
    try {
        console.log('Fetching goat data...');
        const data = await fetchGoatData();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching goat data:', error.message);
        res.status(500).json({ message: 'Error fetching goat data', error });
    }
};
