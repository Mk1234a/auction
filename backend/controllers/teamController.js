const Team = require('../models/Team');

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find({}).populate('owner', 'username email');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('owner', 'username email')
      .populate('players');
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTeam = async (req, res) => {
  const { name, owner, budget } = req.body;
  const team = new Team({
    name,
    owner,
    budget,
  });

  try {
    const createdTeam = await team.save();
    res.status(201).json(createdTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTeam = async (req, res) => {
  const { name, owner, budget, players } = req.body;

  try {
    const team = await Team.findById(req.params.id);

    if (team) {
      team.name = name || team.name;
      team.owner = owner || team.owner;
      team.budget = budget || team.budget;
      team.players = players || team.players;

      const updatedTeam = await team.save();
      res.json(updatedTeam);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (team) {
      await team.deleteOne();
      res.json({ message: 'Team removed' });
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};