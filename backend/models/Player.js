const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  basePrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'sold', 'unsold'],
    default: 'pending',
  },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
  sellingPrice: { type: Number, default: 0 },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;