const Tournament = require('../models/Tournament');
const Player = require('../models/Player');
const Team = require('../models/Team');

const auctionTimers = {};

module.exports = (io, socket) => {
  socket.on('joinTournament', (tournamentId) => {
    socket.join(tournamentId);
    console.log(`User joined tournament: ${tournamentId}`);
  });

  socket.on('leaveTournament', (tournamentId) => {
    socket.leave(tournamentId);
    console.log(`User left tournament: ${tournamentId}`);
  });

  socket.on('bid', async ({ tournamentId, playerId, teamId, amount }) => {
    try {
      const tournament = await Tournament.findById(tournamentId);
      if (!tournament || tournament.status !== 'ongoing') {
        return;
      }

      const player = await Player.findById(playerId);
      const team = await Team.findById(teamId);

      if (!player || !team || team.budget < amount) {
        return;
      }

      if (auctionTimers[tournamentId]) {
        clearInterval(auctionTimers[tournamentId]);
      }

      let countdown = 10;
      auctionTimers[tournamentId] = setInterval(() => {
        io.to(tournamentId).emit('timerUpdate', { countdown });
        countdown--;
        if (countdown < 0) {
          clearInterval(auctionTimers[tournamentId]);
          delete auctionTimers[tournamentId];
        }
      }, 1000);

      io.to(tournamentId).emit('newBid', {
        playerId,
        teamId,
        amount,
        teamName: team.name,
      });
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('sellPlayer', async ({ tournamentId, playerId, teamId, amount }) => {
    try {
      if (auctionTimers[tournamentId]) {
        clearInterval(auctionTimers[tournamentId]);
        delete auctionTimers[tournamentId];
      }

      const tournament = await Tournament.findById(tournamentId);
      if (!tournament || tournament.status !== 'ongoing') {
        return;
      }

      const player = await Player.findById(playerId);
      const team = await Team.findById(teamId);

      if (!player || !team || team.budget < amount) {
        return;
      }

      player.status = 'sold';
      player.team = teamId;
      player.sellingPrice = amount;
      await player.save();

      team.budget -= amount;
      team.players.push(playerId);
      await team.save();

      tournament.currentPlayer = null;
      await tournament.save();

      io.to(tournamentId).emit('playerSold', {
        player,
        team,
      });
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('unsoldPlayer', async ({ tournamentId, playerId }) => {
    try {
      if (auctionTimers[tournamentId]) {
        clearInterval(auctionTimers[tournamentId]);
        delete auctionTimers[tournamentId];
      }

      const tournament = await Tournament.findById(tournamentId);
      if (!tournament || tournament.status !== 'ongoing') {
        return;
      }

      const player = await Player.findById(playerId);
      if (!player) {
        return;
      }

      player.status = 'unsold';
      await player.save();

      tournament.currentPlayer = null;
      await tournament.save();

      io.to(tournamentId).emit('playerUnsold', { player });
    } catch (error) {
      console.error(error);
    }
  });
};