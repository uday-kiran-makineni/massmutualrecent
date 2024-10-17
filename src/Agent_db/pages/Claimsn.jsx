import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import './ClaimSection.module.css'; // Import a CSS file for additional styles


const ClaimsSection = () => {
    const [claims, setClaims] = useState([]);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
    const encryptedUsername = localStorage.getItem('username'); // Retrieve encrypted username from localStorage
    const encryptedPassword = localStorage.getItem('password'); // Retrieve encrypted password from localStorage

    const secretKey = 'your-secret-key'; // Secret key used for encryption and decryption

    // Function to decrypt the username and password
    const decryptData = (encryptedData) => {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            console.log('Decrypted data:', decrypted); // Log the decrypted data
            return decrypted;
        } catch (e) {
            console.error('Decryption failed:', e); // Log decryption error
            return null;
        }
    };

    const fetchClaims = async () => {
        try {
            // Decrypt the username and password
            const decryptedUsername = decryptData(encryptedUsername); // Decrypt username
            const decryptedPassword = decryptData(encryptedPassword); // Decrypt password

            console.log('Decrypted username:', decryptedUsername); // Log decrypted username
            console.log('Decrypted password:', decryptedPassword); // Log decrypted password

            if (!decryptedUsername || !decryptedPassword) {
                throw new Error('Decryption failed or missing credentials');
            }

            console.log('Starting API call to fetch claims...');

            const response = await axios.get(`http://localhost:8081/api/claims/agent/${userId}`, {
                headers: {
                    'Authorization': 'Basic ' + btoa(`${decryptedUsername}:${decryptedPassword}`) // Use decrypted username and password
                }
            });

            console.log('API response:', response.data); // Log the API response data

            setClaims(response.data); // Set the claims state
            calculateMonthlyClaims(response.data); // Calculate monthly claims after fetching
        } catch (error) {
            setError('Error fetching claims. Please try again later.');
            console.error('Error fetching claims:', error); // Log the error
        }
    };

    const calculateMonthlyClaims = (claimsData) => {
        const monthlyCounts = {};
        console.log('Calculating monthly claims...'); // Log calculation start

        claimsData.forEach(claim => {
            const date = new Date(claim.date); // Assume claim.date is in a valid date format
            const month = date.toLocaleString('default', { month: 'long' }); // Get the full month name
            const year = date.getFullYear(); // Get the year
            const monthYear = `${month} ${year}`; // Combine month and year for storage

            if (!monthlyCounts[monthYear]) {
                monthlyCounts[monthYear] = 0; // Initialize if not present
            }

            monthlyCounts[monthYear] += 1; // Count the claim
        });

        console.log('Monthly claim counts:', monthlyCounts); // Log the monthly claim counts

        // Store monthly counts in local storage
        for (const [key, value] of Object.entries(monthlyCounts)) {
            localStorage.setItem(`totalClaims_${key}`, value); // Store with key as `totalClaims_Month Year`
            console.log(`Stored ${value} claims for ${key} in localStorage`); // Log each storage action
        }
    };

    useEffect(() => {
        console.log('Component mounted. Checking credentials...');
        console.log('userId:', userId);
        console.log('encryptedUsername:', encryptedUsername);
        console.log('encryptedPassword:', encryptedPassword);

        if (userId && encryptedUsername && encryptedPassword) {
            fetchClaims();
        } else {
            setError('User credentials are not available. Please log in.');
            console.error('Missing credentials. Cannot fetch claims.');
        }
    }, [userId, encryptedUsername, encryptedPassword]);

    // Function to return a border color based on the claim status
    const getStatusBorderColor = (status) => {
        switch (status) {
            case 'Approved':
                return '#28a745'; // Green
            case 'Pending':
                return '#ffc107'; // Yellow
            case 'Rejected':
                return '#dc3545'; // Red
            default:
                return '#6c757d'; // Grey for unknown statuses
        }
    };

    return (
        <div className="container"> {/* Wrap the table in a container */}
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
                            <tr key={claim.id} style={{ border: `2px solid ${getStatusBorderColor(claim.status)}` }}>
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
