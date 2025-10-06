import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Confetti from 'react-confetti';
import { useDispatch } from 'react-redux';
import { Card, Button, ListGroup, Row, Col, Alert } from 'react-bootstrap';
import { getTournamentById } from '../slices/tournamentSlice';

const LiveAuction = ({ tournamentId, player, teams }) => {
  const [currentBid, setCurrentBid] = useState(player.basePrice);
  const [lastBidder, setLastBidder] = useState(null);
  const [lastBidderName, setLastBidderName] = useState('None');
  const [bidHistory, setBidHistory] = useState([]);
  const [isSold, setIsSold] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const socket = io('http://localhost:5000');
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit('joinTournament', tournamentId);

    socket.on('newBid', (bid) => {
      if (bid.playerId === player._id) {
        setCurrentBid(bid.amount);
        setLastBidder(bid.teamId);
        setLastBidderName(bid.teamName);
        setBidHistory((prevHistory) => [...prevHistory, bid]);
      }
    });

    socket.on('timerUpdate', (data) => {
      setCountdown(data.countdown);
    });

    socket.on('playerSold', (data) => {
      if (data.player._id === player._id) {
        setIsSold(true);
        setTimeout(() => {
          dispatch(getTournamentById(tournamentId));
        }, 5000); // Show confetti for 5 seconds
      }
    });

    socket.on('playerUnsold', (data) => {
      if (data.player._id === player._id) {
        dispatch(getTournamentById(tournamentId));
      }
    });

    return () => {
      socket.emit('leaveTournament', tournamentId);
      socket.disconnect();
    };
  }, [tournamentId, player._id, socket, dispatch]);

  const handleBid = () => {
    // In a real app, you'd get the teamId from the logged-in user
    // For now, let's just use the first team in the tournament
    if (teams && teams.length > 0) {
      const teamId = teams[0]._id;
      socket.emit('bid', {
        tournamentId,
        playerId: player._id,
        teamId,
        amount: currentBid + 1000,
      });
    } else {
      alert('No teams in the tournament to place a bid!');
    }
  };

  const handleSell = () => {
    socket.emit('sellPlayer', {
      tournamentId,
      playerId: player._id,
      teamId: lastBidder,
      amount: currentBid,
    });
  };

  const handleUnsold = () => {
    socket.emit('unsoldPlayer', {
      tournamentId,
      playerId: player._id,
    });
  };

  return (
    <Card>
      {isSold && <Confetti />}
      <Card.Header as="h2" className="text-center">Live Auction</Card.Header>
      <Card.Body>
        <Row className="text-center">
          <Col>
            <Card.Title as="h1" className="mb-3">{player.name}</Card.Title>
            <Card.Text>
              <strong>Category:</strong> {player.category}
            </Card.Text>
            <Card.Text>
              <strong>Base Price:</strong> ${player.basePrice}
            </Card.Text>
          </Col>
        </Row>

        <Alert variant="primary" className="text-center my-4">
          <div className="fs-1">${currentBid}</div>
          <div className="fs-5">
            <small>Last Bid By: {lastBidderName}</small>
          </div>
        </Alert>

        {countdown !== null && (
          <div className="text-center my-3 fs-2 text-danger">
            {countdown}
          </div>
        )}

        <Row className="my-3">
          <Col>
            <Button variant="success" onClick={handleBid} className="w-100 py-3 fs-4">
              Bid
            </Button>
          </Col>
          <Col>
            <Button
              variant="primary"
              onClick={handleSell}
              disabled={!lastBidder}
              className="w-100 py-3 fs-4"
            >
              Sell
            </Button>
          </Col>
          <Col>
            <Button variant="danger" onClick={handleUnsold} className="w-100 py-3 fs-4">
              Unsold
            </Button>
          </Col>
        </Row>

        <h4 className="mt-4">Bid History</h4>
        <ListGroup>
          {bidHistory.map((bid, index) => (
            <ListGroup.Item key={index}>
              {bid.teamName}: ${bid.amount}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default LiveAuction;