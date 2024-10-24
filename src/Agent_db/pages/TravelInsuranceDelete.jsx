import React, { useState } from 'react';
import axios from 'axios';

const TravelPolicyDelete = () => {
    const [policyNumber, setPolicyNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        setError(''); // Clear previous errors

        if (!policyNumber) {
            setError("Policy number is required");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8081/api/travelinsurances/${policyNumber}`, {
                auth: {
                    username: 'user', // replace with your username
                    password: 'user'  // replace with your password
                }
            });

            if (response.status === 200) {
                // Alert the user about successful deletion
                alert(`Policy deleted successfully: ${policyNumber}`);
                setPolicyNumber(''); // Clear the input field after successful deletion
            }
        } catch (error) {
            console.error("Error deleting policy:", error);
            setError("Only admin can delete a policy."); // Set a generic error message
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '30vh auto', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Delete Travel Insurance Policy</h1>
            <form onSubmit={handleDelete}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="policyNumber" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Policy Number:</label>
                    <input
                        type="text"
                        id="policyNumber"
                        value={policyNumber}
                        onChange={(e) => setPolicyNumber(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#002451', color: 'white', fontSize: '16px', cursor: 'pointer' }}>
                    Delete Policy
                </button>
            </form>
            {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default TravelPolicyDelete;
