const mongoose = require('mongoose');

const goatSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  healthRecords: [{
    date: Date,
    description: String
  }],
  breedingHistory: [{
    date: Date,
    mate: String,
    offspring: [String]
  }]
});

const Goat = mongoose.model('Goat', goatSchema);

app.get('/api/goats', async (req, res) => {
  const goats = await Goat.find();
  res.json(goats);
});

app.post('/api/goats', async (req, res) => {
  const newGoat = new Goat(req.body);
  await newGoat.save();
  res.status(201).json(newGoat);
});
