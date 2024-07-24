const fetchGoatBreeds = require('../api');

exports.getGoatBreeds = async (req, res) => {
    try {
        const data = await fetchGoatBreeds();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching goat breeds:', error.message);
        res.status(500).json({ message: 'Error fetching goat breeds', error });
    }
};
