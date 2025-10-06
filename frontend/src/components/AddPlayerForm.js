import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { addPlayerToTournament } from '../slices/tournamentSlice';

const AddPlayerForm = ({ tournamentId }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !category || !basePrice) {
      return;
    }
    dispatch(
      addPlayerToTournament({
        tournamentId,
        playerData: { name, category, basePrice },
      })
    );
    setName('');
    setCategory('');
    setBasePrice('');
  };

  return (
    <>
      <h2>Add Player</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter player name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="category" className="my-2">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter player category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="basePrice" className="my-2">
          <Form.Label>Base Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter base price"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Add Player
        </Button>
      </Form>
    </>
  );
};

export default AddPlayerForm;