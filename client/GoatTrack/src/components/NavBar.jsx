import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/goat-breeds">Goat Breeds</Link></li>
                {/* Add other links as necessary */}
            </ul>
        </nav>
    );
};

export default NavBar;
