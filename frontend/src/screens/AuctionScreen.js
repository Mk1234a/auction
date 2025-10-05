import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './AuctionRoom.css';

const AuctionScreen = () => {
  const { id: auctionId } = useParams();
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [currentBid, setCurrentBid] = useState(0);
  const socket = io('http://localhost:5000');

  useEffect(() => {
    socket.emit('joinAuction', auctionId);

    socket.on('newBid', (bid) => {
      setBids((prevBids) => [...prevBids, bid]);
      setCurrentBid(bid.amount);
    });

    socket.on('playerSold', ({ player, team }) => {
      // Handle player sold logic
    });

    return () => {
      socket.emit('leaveAuction', auctionId);
      socket.disconnect();
    };
  }, [auctionId, socket]);

  const placeBid = () => {
    if (auction && auction.currentPlayer) {
      const playerId = auction.currentPlayer._id;
      // TODO: Replace with the actual teamId from the logged-in user's state
      const teamId = 'some-team-id';
      const amount = currentBid + 100; // Example bid increment
      socket.emit('bid', { auctionId, playerId, teamId, amount });
    }
  };

  return (
    <div>
      {auction && (
        <div>
          <h1>{auction.name}</h1>
          <h2>Current Player: {auction.currentPlayer.name}</h2>
          <h3>Base Price: {auction.currentPlayer.basePrice}</h3>
          <h3>Current Bid: {currentBid}</h3>
          <button onClick={placeBid}>Place Bid</button>
        </div>
      )}
      <div>
        <h3>Bids</h3>
        <ul>
          {bids.map((bid, index) => (
            <li key={index}>
              {bid.teamName}: {bid.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuctionScreen;