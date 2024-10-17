import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ClaimsSection.module.css'; // Import a CSS file for additional styles

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

    // Function to return a background color based on the claim status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved':
                return '#d4edda'; // Light green
            case 'Pending':
                return '#fff3cd'; // Light yellow
            case 'Rejected':
                return '#f8d7da'; // Light red
            default:
                return '#e2e3e5'; // Light grey for unknown statuses
        }
    };

    return (
        <div>
            <h2>Your Claims</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {claims.length > 0 ? (
                <table className="claims-table">
                    <thead>
                        <tr>
                            <th>Policy Holder</th>
                            <th>Policy Type</th>
                            <th>Coverage Amount</th>
                            <th>Status</th>
                            <th>Agent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claims.map(claim => (
                            <tr key={claim.id} style={{ backgroundColor: getStatusColor(claim.status) }}>
                                <td>{claim.policyHolderName}</td>
                                <td>{claim.policyType}</td>
                                <td>${claim.coverageAmount.toLocaleString()}</td>
                                <td>{claim.status}</td>
                                <td>{claim.agentName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No claims found.</p>
            )}
        </div>
    );
};

export default ClaimsSection;
