const Goat = require('../models/Goat');

exports.createGoat = async (req, res) => {
    const { name, breed, birthDate, healthRecords, breedingHistory } = req.body;
    try {
        const newGoat = new Goat({ name, breed, birthDate, healthRecords, breedingHistory });
        await newGoat.save();
        res.status(201).json({ message: 'Goat profile created successfully', goat: newGoat });
    } catch (error) {
        res.status(400).json({ message: 'Error creating goat profile', error });
    }
};

exports.getGoats = async (req, res) => {
    try {
        const goats = await Goat.find();
        res.status(200).json(goats);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching goat profiles', error });
    }
};
