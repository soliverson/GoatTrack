import React from 'react';

const App = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#breeds">Goat Breeds</a></li>
            <li><a href="#management">Goat Management</a></li>
            <li><a href="#forum">Forum</a></li>
            <li><a href="#profile">Profile</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="home">
          <h1>Welcome to GoatTrack</h1>
          <p>Your one-stop resource for all things goat-related.</p>
        </section>
        <section id="breeds">
          <h2>Goat Breeds</h2>
          <div id="breed-list">
            {/* Dynamic content will be loaded here */}
          </div>
        </section>
        <section id="management">
          <h2>Goat Management</h2>
          <div id="goat-management">
            {/* Dynamic content will be loaded here */}
          </div>
        </section>
        <section id="forum">
          <h2>Community Forum</h2>
          <div id="forum-content">
            {/* Dynamic content will be loaded here */}
          </div>
        </section>
        <section id="profile">
          <h2>User Profile</h2>
          <div id="user-profile">
            {/* Dynamic content will be loaded here */}
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 GoatTrack. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
