import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

const GoatData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [states, setStates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://gisportal.ers.usda.gov/server/rest/services/Census_of_Agriculture_Data/Livestock_and_Animals_2017/MapServer/9/query`, {
                    params: {
                        f: 'json',
                        where: '1=1',
                        outFields: 'STATE_NAME,Name,y17_M119_valueText,y17_M119_classRange,y17_M120_valueText,y17_M120_classRange,y17_M121_valueText,y17_M121_classRange',
                        returnGeometry: false
                    }
                });

                const attributesData = response.data.features.map(feature => ({
                    state: feature.attributes.STATE_NAME,
                    county: feature.attributes.Name,
                    allGoats: feature.attributes.y17_M119_valueText,
                    allGoatsRange: feature.attributes.y17_M119_classRange,
                    milkGoats: feature.attributes.y17_M120_valueText,
                    milkGoatsRange: feature.attributes.y17_M120_classRange,
                    meatGoats: feature.attributes.y17_M121_valueText,
                    meatGoatsRange: feature.attributes.y17_M121_classRange,
                }));

                const uniqueStates = [...new Set(attributesData.map(item => item.state))];

                console.log('Fetched Data:', attributesData); // Debugging: Log fetched data

                setData(attributesData);
                setStates(uniqueStates);
                setLoading(false);
            } catch (error) {
                console.error('API Error:', error);
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleTypeChange = (event) => {
        const selected = event.target.value;
        setSelectedType(selected);
        setSelectedState('');
        let filtered;
        switch (selected) {
            case 'all':
                filtered = data;
                break;
            case 'dairy':
                filtered = data.filter(item => item.milkGoats);
                break;
            case 'meat':
                filtered = data.filter(item => item.meatGoats);
                break;
            default:
                filtered = [];
        }
        console.log('Filtered Data:', filtered); // Debugging: Log filtered data
        setFilteredData(filtered);
    };

    const handleStateChange = (event) => {
        const selected = event.target.value;
        setSelectedState(selected);
        const filtered = data.filter(item => item.state === selected && (selectedType === 'all' || (selectedType === 'dairy' && item.milkGoats) || (selectedType === 'meat' && item.meatGoats)));
        setFilteredData(filtered);
    };

    return (
        <main>
            <div className="content">
                <h1>Goat Data</h1>
                <label htmlFor="typeSelect">Select type:</label>
                <select id="typeSelect" className="large-select" onChange={handleTypeChange} value={selectedType}>
                    <option value="">Select Type</option>
                    <option value="dairy">Dairy</option>
                    <option value="meat">Meat</option>
                    <option value="all">All Goats</option>
                </select>

                {selectedType && (
                    <>
                        <label htmlFor="stateSelect">Select state:</label>
                        <select id="stateSelect" className="large-select" onChange={handleStateChange} value={selectedState}>
                            <option value="">Select State</option>
                            {states.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </>
                )}

                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}

                {!loading && !error && selectedState && filteredData.length > 0 && (
                    <>
                        <h2>Data for {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} in {selectedState}</h2>
                        <table className="goat-data-table">
                            <thead>
                                <tr>
                                    <th>State</th>
                                    <th>County</th>
                                    {selectedType === 'all' && (
                                        <>
                                            <th>All Goats</th>
                                            <th>Range</th>
                                        </>
                                    )}
                                    {selectedType === 'dairy' && (
                                        <>
                                            <th>Milk Goats</th>
                                            <th>Range</th>
                                        </>
                                    )}
                                    {selectedType === 'meat' && (
                                        <>
                                            <th>Meat Goats</th>
                                            <th>Range</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.state}</td>
                                        <td>{item.county}</td>
                                        {selectedType === 'all' && (
                                            <>
                                                <td>{item.allGoats}</td>
                                                <td>{item.allGoatsRange}</td>
                                            </>
                                        )}
                                        {selectedType === 'dairy' && (
                                            <>
                                                <td>{item.milkGoats}</td>
                                                <td>{item.milkGoatsRange}</td>
                                            </>
                                        )}
                                        {selectedType === 'meat' && (
                                            <>
                                                <td>{item.meatGoats}</td>
                                                <td>{item.meatGoatsRange}</td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </main>
    );
};

export default GoatData;
