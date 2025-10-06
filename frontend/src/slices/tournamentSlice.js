import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTournaments = createAsyncThunk(
  'tournaments/getTournaments',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/tournaments');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTournament = createAsyncThunk(
  'tournaments/createTournament',
  async (tournamentData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/tournaments', tournamentData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTournamentById = createAsyncThunk(
  'tournaments/getTournamentById',
  async (tournamentId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/tournaments/${tournamentId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addPlayerToTournament = createAsyncThunk(
  'tournaments/addPlayerToTournament',
  async ({ tournamentId, playerData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/tournaments/${tournamentId}/players`,
        playerData
      );
      return { tournamentId, player: data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const setCurrentPlayer = createAsyncThunk(
  'tournaments/setCurrentPlayer',
  async ({ tournamentId, playerId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/tournaments/${tournamentId}/current-player`,
        { playerId }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTeamToTournament = createAsyncThunk(
  'tournaments/addTeamToTournament',
  async ({ tournamentId, teamId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/tournaments/${tournamentId}/teams`,
        { teamId }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tournamentSlice = createSlice({
  name: 'tournaments',
  initialState: {
    tournaments: [],
    currentTournament: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTournaments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTournaments.fulfilled, (state, action) => {
        state.loading = false;
        state.tournaments = action.payload;
      })
      .addCase(getTournaments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTournament.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTournament.fulfilled, (state, action) => {
        state.loading = false;
        state.tournaments.push(action.payload);
      })
      .addCase(createTournament.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTournamentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTournamentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTournament = action.payload;
      })
      .addCase(getTournamentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addPlayerToTournament.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPlayerToTournament.fulfilled, (state, action) => {
        state.loading = false;
        if (
          state.currentTournament &&
          state.currentTournament._id === action.payload.tournamentId
        ) {
          state.currentTournament.players.push(action.payload.player);
        }
      })
      .addCase(addPlayerToTournament.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(setCurrentPlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(setCurrentPlayer.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTournament = action.payload;
      })
      .addCase(setCurrentPlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTeamToTournament.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTeamToTournament.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTournament = action.payload;
      })
      .addCase(addTeamToTournament.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tournamentSlice.reducer;