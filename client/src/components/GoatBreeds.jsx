import React, { useEffect, useState } from 'react';
import { fetchGoatBreeds } from '../api';

function GoatBreeds() {
    const [goatBreeds, setGoatBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getGoatBreeds = async () => {
            try {
                const data = await fetchGoatBreeds();
                setGoatBreeds(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getGoatBreeds();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching goat breeds: {error}</p>;
    }

    return (
        <div className="content">
            <h1>Goat Breeds</h1>
            <ul>
                {goatBreeds.map((breed, index) => (
                    <li key={index}>{breed.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default GoatBreeds;
