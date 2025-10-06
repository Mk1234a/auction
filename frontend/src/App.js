import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import TournamentScreen from './screens/TournamentScreen';
import TournamentListScreen from './screens/TournamentListScreen';
import CreateTournamentScreen from './screens/CreateTournamentScreen';
import TeamListScreen from './screens/TeamListScreen';
import CreateTeamScreen from './screens/CreateTeamScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<TournamentListScreen />} />
          <Route path="/tournaments/create" element={<CreateTournamentScreen />} />
          <Route path="/teams" element={<TeamListScreen />} />
          <Route path="/teams/create" element={<CreateTeamScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/tournament/:id" element={<TournamentScreen />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;