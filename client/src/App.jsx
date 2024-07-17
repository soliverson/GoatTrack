import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import GoatProfile from './components/GoatProfile';
import CommunityForum from './components/CommunityForum';
import GoatData from './components/GoatData';
import Header from './components/Header';
import '/dist/styles.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goat-profile" element={<GoatProfile />} />
        <Route path="/community-forum" element={<CommunityForum />} />
        <Route path="/goat-data" element={<GoatData />} />
      </Routes>
    </Router>
  );
};

export default App;
