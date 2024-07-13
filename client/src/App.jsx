import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import GoatProfile from './components/GoatProfile';
import CommunityForum from './components/CommunityForum';
import GoatBreeds from './components/GoatBreeds';
import Header from './components/Header';
import './App.css'; // Ensure you have a CSS file for the app styles

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/goat-profile" element={<GoatProfile />} />
          <Route path="/community-forum" element={<CommunityForum />} />
          <Route path="/goat-breeds" element={<GoatBreeds />} />
        </Routes>
      </main>
      <footer>
        <p>&copy; 2024 GoatTrack</p>
      </footer>
    </Router>
  );
}

export default App;
