import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Row, Col, Button, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { getTournaments } from '../slices/tournamentSlice';

const TournamentListScreen = () => {
  const dispatch = useDispatch();
  const { tournaments, loading, error } = useSelector(
    (state) => state.tournaments
  );

  useEffect(() => {
    dispatch(getTournaments());
  }, [dispatch]);

  return (
    <Container>
      <Row className="align-items-center my-4">
        <Col>
          <h1>Tournaments</h1>
        </Col>
        <Col className="text-end">
          <LinkContainer to="/tournaments/create">
            <Button variant="primary">
              <i className="fas fa-plus"></i> Create Tournament
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger">{error.message}</Alert>
      ) : (
        <ListGroup>
          {tournaments.map((tournament) => (
            <LinkContainer key={tournament._id} to={`/tournament/${tournament._id}`}>
              <ListGroup.Item action>{tournament.name}</ListGroup.Item>
            </LinkContainer>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default TournamentListScreen;