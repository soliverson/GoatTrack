import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GoatBreedsPage from './pages/GoatBreedsPage';
// Import other pages as necessary

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/breeds">Goat Breeds</Link></li>
              <li><Link to="/management">Goat Management</Link></li>
              <li><Link to="/forum">Forum</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/breeds" component={GoatBreedsPage} />
            {/* Add other routes as necessary */}
          </Switch>
        </main>
        <footer>
          <p>&copy; 2024 GoatTrack. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
