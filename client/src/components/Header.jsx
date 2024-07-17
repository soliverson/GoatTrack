import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header>
            <img src="/images/goatlogo.webp" alt="GoatTrack Logo" className="logo" />
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/goat-profile">Goat Profile</Link></li>
                    <li><Link to="/community-forum">Community Forum</Link></li>
                    <li><Link to="/goat-data">Goat Data</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
