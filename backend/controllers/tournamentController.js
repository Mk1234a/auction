const Tournament = require('../models/Tournament');

const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find({})
      .populate('teams')
      .populate('players')
      .populate('currentPlayer');
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate('teams')
      .populate('players')
      .populate('currentPlayer');
    if (tournament) {
      res.json(tournament);
    } else {
      res.status(404).json({ message: 'Tournament not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTournament = async (req, res) => {
  const { name, teams, players } = req.body;
  const tournament = new Tournament({
    name,
    teams,
    players,
  });

  try {
    const createdTournament = await tournament.save();
    res.status(201).json(createdTournament);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTournament = async (req, res) => {
  const { name, teams, players, status, currentPlayer } = req.body;

  try {
    const tournament = await Tournament.findById(req.params.id);

    if (tournament) {
      tournament.name = name || tournament.name;
      tournament.teams = teams || tournament.teams;
      tournament.players = players || tournament.players;
      tournament.status = status || tournament.status;
      tournament.currentPlayer = currentPlayer || tournament.currentPlayer;

      const updatedTournament = await tournament.save();
      res.json(updatedTournament);
    } else {
      res.status(404).json({ message: 'Tournament not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (tournament) {
      await tournament.deleteOne();
      res.json({ message: 'Tournament removed' });
    } else {
      res.status(404).json({ message: 'Tournament not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Player = require('../models/Player');

const createPlayerForTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (tournament) {
      const { name, category, basePrice } = req.body;
      const player = new Player({
        name,
        category,
        basePrice,
      });

      const createdPlayer = await player.save();

      tournament.players.push(createdPlayer);
      await tournament.save();

      res.status(201).json(createdPlayer);
    } else {
      res.status(404).json({ message: 'Tournament not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const setCurrentPlayer = async (req, res) => {
  try {
    let tournament = await Tournament.findById(req.params.id);

    if (tournament) {
      const { playerId } = req.body;
      tournament.currentPlayer = playerId;
      await tournament.save();

      // Re-fetch and populate to ensure the client gets the full, updated object
      tournament = await Tournament.findById(req.params.id)
        .populate('teams')
        .populate('players')
        .populate('currentPlayer');

      res.json(tournament);
    } else {
      res.status(404).json({ message: 'Tournament not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addTeamToTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    const { teamId } = req.body;

    if (tournament) {
      if (tournament.teams.includes(teamId)) {
        return res.status(400).json({ message: 'Team already in tournament' });
      }
      tournament.teams.push(teamId);
      await tournament.save();
      res.json(tournament);
    } else {
      res.status(404).json({ message: 'Tournament not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTournaments,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament,
  createPlayerForTournament,
  setCurrentPlayer,
  addTeamToTournament,
};