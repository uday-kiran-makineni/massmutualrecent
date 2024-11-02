import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Nagentfooter from './Nagentfooter';


const PaymentPage = () => {
    const [policyNumber, setPolicyNumber] = useState('');
    const [policyDetails, setPolicyDetails] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePolicyFetch = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setPolicyDetails(null); // Clear previous policy details
        setLoading(true); // Start loading

        if (!policyNumber) {
            setError("Policy number is required");
            setLoading(false);
            return;
        }

        let endpoint = '';
        if (policyNumber.startsWith('HP')) {
            endpoint = `http://localhost:8081/api/healthpolicies/${policyNumber}`;
        } else if (policyNumber.startsWith('LI')) {
            endpoint = `http://localhost:8081/api/lifeinsurance/${policyNumber}`;
        } else if (policyNumber.startsWith('MOTOR')) {
            endpoint = `http://localhost:8081/api/motorinsurances/${policyNumber}`;
        } else if (policyNumber.startsWith('TRAVEL')) {
            endpoint = `http://localhost:8081/api/travelpolicies/${policyNumber}`;
        } else {
            setError("Invalid policy number format.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(endpoint, {
                auth: {
                    username: 'agent',  
                    password: 'agent' 
                }
            });

            if (response.status === 200) {
                setPolicyDetails(response.data);
            } else {
                setError("Policy not found.");
            }
        } catch (err) {
            console.error("Error fetching policy:", err);
            setError("Policy not found or an error occurred.");
        }
        setLoading(false); // Stop loading
    };

    const renderPolicyDetails = () => {
        if (!policyDetails) return null;

        return (
            <div style={styles.policyCard}>
                <h2>Policy Details</h2>
                <p><strong>Policy Number:</strong> {policyDetails.policyNumber}</p>
                <p><strong>Holder Name:</strong> {policyDetails.holderName}</p>
                <p><strong>Premium Amount:</strong> {policyDetails.premiumAmount}</p>
                <p><strong>Coverage Amount:</strong> {policyDetails.coverageAmount}</p>
                <button style={styles.generateLinkButton}>Generate Payment Link</button>
            </div>
        );
    };

    return (
        <>
        <Navbar/>
        <div style={styles.container}>
            <h1>Payment Page</h1>
            <form onSubmit={handlePolicyFetch} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="policyNumber" style={styles.label}>Policy Number:</label>
                    <input
                        type="text"
                        id="policyNumber"
                        value={policyNumber}
                        onChange={(e) => setPolicyNumber(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Fetching Policy...' : 'Fetch Policy'}
                </button>
            </form>

            {error && <p style={styles.error}>{error}</p>}
            {renderPolicyDetails()}
        </div>
<Nagentfooter/>
</>
    );
};

// Inline Styles for minimal and structured UI
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        marginTop: '60px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        marginBottom: '20px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
    },
    h1:{
        marginBottom:'30px',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
    },
    policyCard: {
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '10px',
        width: '300px',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
    },
    generateLinkButton: {
        marginTop: '15px',
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default PaymentPage;
