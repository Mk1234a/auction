const Auction = require('../models/Auction');

const getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({})
      .populate('teams')
      .populate('players')
      .populate('currentPlayer');
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuctionById = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate('teams')
      .populate('players')
      .populate('currentPlayer');
    if (auction) {
      res.json(auction);
    } else {
      res.status(404).json({ message: 'Auction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAuction = async (req, res) => {
  const { name, teams, players } = req.body;
  const auction = new Auction({
    name,
    teams,
    players,
  });

  try {
    const createdAuction = await auction.save();
    res.status(201).json(createdAuction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAuction = async (req, res) => {
  const { name, teams, players, status, currentPlayer } = req.body;

  try {
    const auction = await Auction.findById(req.params.id);

    if (auction) {
      auction.name = name || auction.name;
      auction.teams = teams || auction.teams;
      auction.players = players || auction.players;
      auction.status = status || auction.status;
      auction.currentPlayer = currentPlayer || auction.currentPlayer;

      const updatedAuction = await auction.save();
      res.json(updatedAuction);
    } else {
      res.status(404).json({ message: 'Auction not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (auction) {
      await auction.deleteOne();
      res.json({ message: 'Auction removed' });
    } else {
      res.status(404).json({ message: 'Auction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAuctions,
  getAuctionById,
  createAuction,
  updateAuction,
  deleteAuction,
};