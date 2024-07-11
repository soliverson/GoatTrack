import React, { useState, useEffect } from 'react';
import { getBreedData } from '../api'; // Adjust the path as necessary

const GoatBreedsList = () => {
    const [breeds, setBreeds] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const data = await getBreedData();
                setBreeds(data);
            } catch (error) {
                setError('Failed to fetch goat breeds');
                console.error('Error fetching goat breeds:', error);
            }
        };

        fetchBreeds();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Goat Breeds</h2>
            <ul>
                {breeds.map((breed) => (
                    <li key={breed.id}>
                        <h3>{breed.name}</h3>
                        <p>{breed.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GoatBreedsList;
