import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClaimsSection = () => {
    const [claims, setClaims] = useState([]);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId'); // Assuming you store userId in localStorage

    const fetchClaims = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/claims/user/${userId}`, {
                headers: {
                    'Authorization': 'Basic ' + btoa('user:user') // Base64 encode the username:password
                }
            });
            setClaims(response.data);
        } catch (error) {
            setError('Error fetching claims. Please try again later.');
            console.error('Error fetching claims:', error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchClaims();
        } else {
            setError('User ID is not available. Please log in.');
        }
    }, [userId]);

    return (
        <div>
            <h2>Your Claims</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {claims.length > 0 ? (
                <ul>
                    {claims.map(claim => (
                        <li key={claim.id}>
                            <strong>{claim.policyHolderName}</strong> - {claim.policyType} - <em>{claim.status}</em>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No claims found.</p>
            )}
        </div>
    );
};

export default ClaimsSection;
