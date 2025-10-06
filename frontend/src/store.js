import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import tournamentReducer from './slices/tournamentSlice';
import teamReducer from './slices/teamSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    tournaments: tournamentReducer,
    teams: teamReducer,
  },
});

export default store;