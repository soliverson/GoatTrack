const mongoose = require('mongoose');

const GoatSchema = new mongoose.Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    birthDate: { type: Date, required: true },
    healthRecords: [{ type: String }],
    breedingHistory: [{ type: String }],
});

GoatSchema.index({ name: 1 }); 

module.exports = mongoose.model('Goat', GoatSchema);
