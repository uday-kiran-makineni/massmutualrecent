import React, { useState } from 'react';
import axios from 'axios';

const LifeInsuranceDelete = () => {
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
            const response = await axios.delete(`http://localhost:8081/api/lifeinsurance/delete/${policyNumber}`, {
                auth: {
                    username: 'user', // replace with your username
                    password: 'user'  // replace with your password
                }
            });

            if (response.status === 200) {
                setMessage(`Policy deleted successfully: ${policyNumber}`);
            }
        } catch (error) {
            console.error("Error deleting policy:", error);
            setError("Only admin can delete a policy.");
        }
    };

    return (
        <div>
            <h1>Delete Life Insurance Policy</h1>
            <form onSubmit={handleDelete}>
                <div>
                    <label htmlFor="policyNumber">Policy Number:</label>
                    <input
                        type="text"
                        id="policyNumber"
                        value={policyNumber}
                        onChange={(e) => setPolicyNumber(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Delete Policy</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LifeInsuranceDelete;
