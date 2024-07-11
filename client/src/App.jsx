import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import GoatProfile from './components/GoatProfile';
import CommunityForum from './components/CommunityForum';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/goat-profile">Goat Profile</Link></li>
          <li><Link to="/community-forum">Community Forum</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goat-profile" element={<GoatProfile />} />
        <Route path="/community-forum" element={<CommunityForum />} />
      </Routes>
    </Router>
  );
}

export default App;
