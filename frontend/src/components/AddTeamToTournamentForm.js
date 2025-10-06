import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { getTeams } from '../slices/teamSlice';
import { addTeamToTournament } from '../slices/tournamentSlice';

const AddTeamToTournamentForm = ({ tournamentId, participatingTeams }) => {
  const [team, setTeam] = useState('');
  const dispatch = useDispatch();

  const { teams } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!team) return;
    dispatch(addTeamToTournament({ tournamentId, teamId: team }));
    setTeam('');
  };

  const participatingTeamIds = participatingTeams.map((t) => t._id);

  return (
    <>
      <h2 className="mt-4">Add Team to Tournament</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="team">
          <Form.Label>Select Team</Form.Label>
          <Form.Control
            as="select"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          >
            <option value="">-- Select a Team --</option>
            {teams
              .filter((t) => !participatingTeamIds.includes(t._id))
              .map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Add Team
        </Button>
      </Form>
    </>
  );
};

export default AddTeamToTournamentForm;