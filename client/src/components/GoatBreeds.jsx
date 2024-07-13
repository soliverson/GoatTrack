import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../styles.css"; // Remove this line

const GoatBreeds = () => {
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const response = await axios.get('/api/breeds');
                setBreeds(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Error fetching breed information');
                setLoading(false);
            }
        };

        fetchBreeds();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <select className="large-select">
            <option value="">Select a breed</option>
            {breeds.map(breed => (
                <option key={breed.id} value={breed.name}>{breed.name}</option>
            ))}
        </select>
    );
};

export default GoatBreeds;
