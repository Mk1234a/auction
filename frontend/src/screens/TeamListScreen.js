import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Row, Col, Button, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { getTeams } from '../slices/teamSlice';

const TeamListScreen = () => {
  const dispatch = useDispatch();
  const { teams, loading, error } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <Container>
      <Row className="align-items-center my-4">
        <Col>
          <h1>Teams</h1>
        </Col>
        <Col className="text-end">
          <LinkContainer to="/teams/create">
            <Button variant="primary">
              <i className="fas fa-plus"></i> Create Team
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
          {teams.map((team) => (
            <ListGroup.Item key={team._id}>
              {team.name} - Budget: ${team.budget}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default TeamListScreen;