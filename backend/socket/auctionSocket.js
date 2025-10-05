const Auction = require('../models/Auction');
const Player = require('../models/Player');
const Team = require('../models/Team');

module.exports = (io, socket) => {
  socket.on('joinAuction', (auctionId) => {
    socket.join(auctionId);
    console.log(`User joined auction: ${auctionId}`);
  });

  socket.on('leaveAuction', (auctionId) => {
    socket.leave(auctionId);
    console.log(`User left auction: ${auctionId}`);
  });

  socket.on('bid', async ({ auctionId, playerId, teamId, amount }) => {
    try {
      const auction = await Auction.findById(auctionId);
      if (!auction || auction.status !== 'ongoing') {
        return;
      }

      const player = await Player.findById(playerId);
      const team = await Team.findById(teamId);

      if (!player || !team || team.budget < amount) {
        return;
      }

      io.to(auctionId).emit('newBid', {
        playerId,
        teamId,
        amount,
        teamName: team.name,
      });
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('sellPlayer', async ({ auctionId, playerId, teamId, amount }) => {
    try {
      const auction = await Auction.findById(auctionId);
      if (!auction || auction.status !== 'ongoing') {
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

      io.to(auctionId).emit('playerSold', {
        player,
        team,
      });
    } catch (error) {
      console.error(error);
    }
  });
};