import React, { useState } from 'react';
import '../styles.css';

const GoatProfile = () => {
    const [goatData, setGoatData] = useState({
        id: '',
        name: '',
        sex: '',
        dateOfBirth: '',
        breed: '',
        medicalRecords: [],
        vetVisits: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGoatData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addMedicalRecord = () => {
        setGoatData(prevState => ({
            ...prevState,
            medicalRecords: [...prevState.medicalRecords, { date: '', description: '' }]
        }));
    };

    const updateMedicalRecord = (index, field, value) => {
        const newMedicalRecords = [...goatData.medicalRecords];
        newMedicalRecords[index][field] = value;
        setGoatData(prevState => ({
            ...prevState,
            medicalRecords: newMedicalRecords
        }));
    };

    const addVetVisit = () => {
        setGoatData(prevState => ({
            ...prevState,
            vetVisits: [...prevState.vetVisits, { date: '', vetName: '', reason: '' }]
        }));
    };

    const updateVetVisit = (index, field, value) => {
        const newVetVisits = [...goatData.vetVisits];
        newVetVisits[index][field] = value;
        setGoatData(prevState => ({
            ...prevState,
            vetVisits: newVetVisits
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save goatData to your backend or local storage
        console.log(goatData);
    };

    return (
        <div className="content">
            <h1>Goat Profile</h1>
            <p>
                The Goat Profile page allows users to manage detailed information about individual goats in their herd. Users can view and update profiles that include health and vaccination records, breeding history, and lineage tracking. This page provides a comprehensive and organized way to keep track of each goat's unique information, ensuring better herd management and care.
            </p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID:</label>
                    <input type="text" name="id" value={goatData.id} onChange={handleChange} />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={goatData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Sex:</label>
                    <select name="sex" value={goatData.sex} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input type="date" name="dateOfBirth" value={goatData.dateOfBirth} onChange={handleChange} />
                </div>
                <div>
                    <label>Breed:</label>
                    <input type="text" name="breed" value={goatData.breed} onChange={handleChange} />
                </div>

                <h2>Medical Records</h2>
                {goatData.medicalRecords.map((record, index) => (
                    <div key={index}>
                        <label>Date:</label>
                        <input type="date" value={record.date} onChange={(e) => updateMedicalRecord(index, 'date', e.target.value)} />
                        <label>Description:</label>
                        <input type="text" value={record.description} onChange={(e) => updateMedicalRecord(index, 'description', e.target.value)} />
                    </div>
                ))}
                <button type="button" onClick={addMedicalRecord}>Add Medical Record</button>

                <h2>Vet Visits</h2>
                {goatData.vetVisits.map((visit, index) => (
                    <div key={index}>
                        <label>Date:</label>
                        <input type="date" value={visit.date} onChange={(e) => updateVetVisit(index, 'date', e.target.value)} />
                        <label>Vet Name:</label>
                        <input type="text" value={visit.vetName} onChange={(e) => updateVetVisit(index, 'vetName', e.target.value)} />
                        <label>Reason:</label>
                        <input type="text" value={visit.reason} onChange={(e) => updateVetVisit(index, 'reason', e.target.value)} />
                    </div>
                ))}
                <button type="button" onClick={addVetVisit}>Add Vet Visit</button>

                <button type="submit">Save Profile</button>
            </form>
        </div>
    );
}

export default GoatProfile;
