const Player = require('../models/Player');

const getPlayers = async (req, res) => {
  try {
    const players = await Player.find({});
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (player) {
      res.json(player);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPlayer = async (req, res) => {
  const { name, category, basePrice } = req.body;
  const player = new Player({
    name,
    category,
    basePrice,
  });

  try {
    const createdPlayer = await player.save();
    res.status(201).json(createdPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePlayer = async (req, res) => {
  const { name, category, basePrice, status, team, sellingPrice } = req.body;

  try {
    const player = await Player.findById(req.params.id);

    if (player) {
      player.name = name || player.name;
      player.category = category || player.category;
      player.basePrice = basePrice || player.basePrice;
      player.status = status || player.status;
      player.team = team || player.team;
      player.sellingPrice = sellingPrice || player.sellingPrice;

      const updatedPlayer = await player.save();
      res.json(updatedPlayer);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);

    if (player) {
      await player.deleteOne();
      res.json({ message: 'Player removed' });
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};