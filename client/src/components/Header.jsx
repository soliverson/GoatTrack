import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <header>
            <img src="/images/goatlogo.webp" alt="GoatTrack Logo" className="logo" />
            <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">☰</button>
            <nav className={`menu ${menuActive ? 'active' : ''}`}>
                <ul>
                    <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                    <li><Link to="/goat-profile" onClick={toggleMenu}>Goat Profile</Link></li>
                    <li><Link to="/community-forum" onClick={toggleMenu}>Community Forum</Link></li>
                    <li><Link to="/goat-data" onClick={toggleMenu}>Goat Data</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
