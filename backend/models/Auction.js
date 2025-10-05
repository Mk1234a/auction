const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  status: { type: String, enum: ['scheduled', 'ongoing', 'completed'], default: 'scheduled' },
  currentPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', default: null },
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;