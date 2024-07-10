const axios = require('axios');

exports.getBreeds = async (req, res) => {
    try {
        const response = await axios.get('https://api.livestockinformation.org.uk/breeds', {
            headers: { 'Ocp-Apim-Subscription-Key': process.env.LIVESTOCK_API_KEY }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching breed information', error });
    }
};
