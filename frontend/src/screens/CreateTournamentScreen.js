import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { createTournament } from '../slices/tournamentSlice';

const CreateTournamentScreen = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.tournaments);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTournament({ name }));
    navigate('/');
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <h1>Create Tournament</h1>
          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error.message}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tournament name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Create
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTournamentScreen;