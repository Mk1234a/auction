const express = require('express');
const {
  getTournaments,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament,
  createPlayerForTournament,
  setCurrentPlayer,
  addTeamToTournament,
} = require('../controllers/tournamentController');
const router = express.Router();

router.route('/').get(getTournaments).post(createTournament);
router
  .route('/:id')
  .get(getTournamentById)
  .put(updateTournament)
  .delete(deleteTournament);
router.route('/:id/players').post(createPlayerForTournament);
router.route('/:id/current-player').put(setCurrentPlayer);
router.route('/:id/teams').post(addTeamToTournament);

module.exports = router;