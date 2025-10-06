import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { getTournamentById, setCurrentPlayer } from '../slices/tournamentSlice';
import AddPlayerForm from '../components/AddPlayerForm';
import AddTeamToTournamentForm from '../components/AddTeamToTournamentForm';
import LiveAuction from '../components/LiveAuction';

const TournamentScreen = () => {
  const { id: tournamentId } = useParams();
  const dispatch = useDispatch();

  const { currentTournament, loading, error } = useSelector(
    (state) => state.tournaments
  );

  useEffect(() => {
    dispatch(getTournamentById(tournamentId));
  }, [dispatch, tournamentId]);

  const startBiddingHandler = (playerId) => {
    dispatch(setCurrentPlayer({ tournamentId, playerId }));
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'sold':
        return 'success';
      case 'unsold':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <Container>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error.message}</Alert>
      ) : (
        currentTournament && (
          <div>
            <h1 className="my-4 text-center">{currentTournament.name}</h1>
            {currentTournament.currentPlayer ? (
              <LiveAuction
                tournamentId={tournamentId}
                player={currentTournament.currentPlayer}
                teams={currentTournament.teams}
              />
            ) : (
              <Row>
                <Col md={6}>
                  <h2>Players</h2>
                  <ListGroup className="mb-4">
                    {currentTournament.players.map((player) => (
                      <ListGroup.Item key={player._id} as="div" className="d-flex justify-content-between align-items-center">
                        <div>
                          {player.name} ({player.category}) - ${player.basePrice}
                        </div>
                        <div>
                          <Badge bg={getStatusVariant(player.status)} className="me-2">
                            {player.status}
                          </Badge>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => startBiddingHandler(player._id)}
                            disabled={player.status !== 'pending'}
                          >
                            Start Bidding
                          </Button>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <AddPlayerForm tournamentId={tournamentId} />
                </Col>
                <Col md={6}>
                  <h2>Teams</h2>
                  <ListGroup className="mb-4">
                    {currentTournament.teams.map((team) => (
                      <ListGroup.Item key={team._id}>
                        {team.name} - Budget: ${team.budget}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <AddTeamToTournamentForm
                    tournamentId={tournamentId}
                    participatingTeams={currentTournament.teams}
                  />
                </Col>
              </Row>
            )}
          </div>
        )
      )}
    </Container>
  );
};

export default TournamentScreen;