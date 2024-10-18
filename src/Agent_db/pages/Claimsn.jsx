import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import './ClaimSection.module.css'; // Import a CSS file for additional styles
import Navbar from '../components/Navbar';
import AdminFooter from '../components/AdminFooter';

const ClaimsSection = () => {
    const [claims, setClaims] = useState([]);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
    const username = localStorage.getItem('username'); // Retrieve plain username from localStorage
    const encryptedPassword = localStorage.getItem('password'); // Retrieve encrypted password from localStorage

    const secretKey = 'your-secret-key'; // Secret key used for encryption and decryption

    const decryptPassword = (encryptedPassword) => {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            return decrypted;
        } catch (e) {
            console.error('Decryption failed:', e);
            return null;
        }
    };

    const fetchClaims = async () => {
        try {
            const decryptedPassword = decryptPassword(encryptedPassword);

            if (!username || !decryptedPassword) {
                throw new Error('Missing credentials');
            }

            const response = await axios.get(`http://localhost:8081/api/claims/agent/${userId}`, {
                headers: {
                    'Authorization': 'Basic ' + btoa(`${username}:${decryptedPassword}`)
                }
            });

            setClaims(response.data);
            calculateMonthlyClaims(response.data);
            setError(null);
        } catch (error) {
            setError('Error fetching claims. Please try again later.');
            console.error('Error fetching claims:', error.response || error.message || error);
        }
    };

    const calculateMonthlyClaims = (claimsData) => {
        const monthlyCounts = {};
        claimsData.forEach(claim => {
            const date = new Date(claim.date);
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            const monthYear = `${month} ${year}`;

            if (!monthlyCounts[monthYear]) {
                monthlyCounts[monthYear] = 0;
            }

            monthlyCounts[monthYear] += 1;
        });

        for (const [key, value] of Object.entries(monthlyCounts)) {
            localStorage.setItem(`totalClaims_${key}`, value);
        }
    };

    useEffect(() => {
        if (userId && username && encryptedPassword) {
            fetchClaims();
        } else {
            setError('User credentials are not available. Please log in.');
        }
    }, [userId, username, encryptedPassword]);

    const getStatusBorderColor = (status) => {
        switch (status) {
            case 'Approved':
                return '#28a745';
            case 'Pending':
                return '#ffc107';
            case 'Rejected':
                return '#dc3545';
            default:
                return '#6c757d';
        }
    };

    return (
        <>
        <Navbar/>
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Your Claims</h2>
                <button 
                    style={{
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        padding: '10px 20px', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer', 
                        fontSize: '16px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease'
                    }}
                    onClick={() => console.log('Add Claim clicked')}
                    onMouseOver={e => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={e => e.target.style.backgroundColor = '#007bff'}
                >
                    Add Claim
                </button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {claims.length > 0 ? (
                <>
                    <p>Total Claims: {claims.length}</p>

                    <table className="claims-table">
                        <thead>
                            <tr>
                                <th>Policy Holder</th>
                                <th>Policy Type</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {claims.map(claim => (
                                <tr key={claim.id} style={{ border: `2px solid ${getStatusBorderColor(claim.status)}` }}>
                                    <td>{claim.policyHolderName}</td>
                                    <td>{claim.policyType}</td>
                                    <td>${claim.coverageAmount.toLocaleString()}</td>
                                    <td>{claim.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                !error && <p>No claims found.</p>
            )}
        </div>
        <AdminFooter/>
        </>
    );
};

export default ClaimsSection;
