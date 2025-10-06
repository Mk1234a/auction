import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { createTeam } from '../slices/teamSlice';

const CreateTeamScreen = () => {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState(100000); // Default budget
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.teams);
  const { userInfo } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTeam({ name, budget, owner: userInfo._id }));
    navigate('/teams');
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Link to="/teams" className="btn btn-light my-3">
            Go Back
          </Link>
          <h1>Create Team</h1>
          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error.message}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter team name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="budget" className="my-3">
              <Form.Label>Budget</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter team budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Create Team
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTeamScreen;