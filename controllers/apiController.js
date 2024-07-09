const { fetchBreedInformation } = require('../api');

exports.getBreedInformation = async (req, res) => {
    try {
        const data = await fetchBreedInformation();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching breed information' });
    }
};
