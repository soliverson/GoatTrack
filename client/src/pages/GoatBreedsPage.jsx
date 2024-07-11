import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoatBreedsPage = () => {
    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const response = await axios.get('/api/goatBreeds'); // Adjust URL as necessary
                setBreeds(response.data);
            } catch (error) {
                console.error('Error fetching goat breeds:', error);
            }
        };

        fetchBreeds();
    }, []);

    return (
        <div>
            <h1>Goat Breeds</h1>
            <ul>
                {breeds.map(breed => (
                    <li key={breed.id}>{breed.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default GoatBreedsPage;
