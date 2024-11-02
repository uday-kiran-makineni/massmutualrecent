import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import styles from'./ClaimSection.module.css'; // Import a CSS file for additional styles
import Navbar from '../components/Navbar';
// import AdminFooter from '../components/AdminFooter';
import AgentFooter from './Nagentfooter';

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
        <div className={styles.Claimcontainer}>
            <div>
                <h2 className={styles.ClaimcontainerH}>Your Claims</h2>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {claims.length > 0 ? (
                <>
                    <p className={styles.ClaimcontainerP}>Total Claims: {claims.length}</p>

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
                !error && <p className={styles.box}>No claims found.</p>
            )}
        </div>
        <AgentFooter/>
        </>
    );
};

export default ClaimsSection;
