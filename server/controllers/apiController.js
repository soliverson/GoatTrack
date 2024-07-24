const axios = require('axios');

exports.getGoatBreeds = async (req, res) => {
    try {
        const response = await axios.get('https://api.api-ninjas.com/v1/animals?name=goat', {
            headers: { 'X-Api-Key': process.env.API_NINJAS_KEY }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching goat breeds:', error.message);
        res.status(500).json({ message: 'Error fetching goat breeds', error: error.message });
    }
};

exports.getGoatBreed = async (req, res) => {
    const breedName = req.params.breedName;
    try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/animals?name=${breedName}`, {
            headers: { 'X-Api-Key': process.env.API_NINJAS_KEY }
        });
        res.status(200).json(response.data[0]);
    } catch (error) {
        console.error('Error fetching goat breed:', error.message);
        res.status(500).json({ message: 'Error fetching goat breed', error: error.message });
    }
};
