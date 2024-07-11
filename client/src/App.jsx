import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import GoatProfile from './components/GoatProfile';
import CommunityForum from './components/CommunityForum';
import GoatBreeds from './components/GoatBreeds'; // Import the new component

function App() {
  return (
    <Router>
      <header>
        <h1>GoatTrack</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/goat-profile">Goat Profile</Link></li>
            <li><Link to="/community-forum">Community Forum</Link></li>
            <li><Link to="/goat-breeds">Goat Breeds</Link></li> {/* Add new link */}
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/goat-profile" element={<GoatProfile />} />
          <Route path="/community-forum" element={<CommunityForum />} />
          <Route path="/goat-breeds" element={<GoatBreeds />} /> {/* Add new route */}
        </Routes>
      </main>
      <footer>
        <p>&copy; 2024 GoatTrack</p>
      </footer>
    </Router>
  );
}

export default App;
