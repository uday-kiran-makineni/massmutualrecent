import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HealthInsuranceForm.css';

const HealthInsuranceForm = () => {
    const [policyNumber, setPolicyNumber] = useState('');
    const [formData, setFormData] = useState({
        policyNumber: '',
        policyType: 'Individual',
        coverageAmount: '',
        startDate: '',
        endDate: '',
        userId: '',
        userEmail: '',
        mobileNumber: '',
        beneficiaryDetails: '',
        preExistingDiseases: '',
        premiumAmount: '',
        paymentFrequency: 'Monthly',
        claimLimit: '',
        coverageDetails: ''
    });

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    // Function to fetch policy details
    const fetchPolicyDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/healthpolicies/${policyNumber}`, {
                headers: {
                    'Authorization': 'Basic ' + btoa('user:user')
                }
            });
            setFormData(response.data);
            setMessage(''); // Clear any previous error messages
        } catch (error) {
            console.error('Error fetching policy details:', error);
            setMessage('Error fetching policy details. Please check the policy number.');
        }
    };

    const handleFetchPolicy = async (e) => {
        e.preventDefault();
        if (policyNumber) {
            await fetchPolicyDetails();
        } else {
            setMessage('Please enter a valid policy number.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.coverageAmount) newErrors.coverageAmount = 'Coverage Amount is required.';
        if (!formData.startDate) newErrors.startDate = 'Start Date is required.';
        if (!formData.endDate) newErrors.endDate = 'End Date is required.';
        if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile Number is required.';
        if (!formData.beneficiaryDetails) newErrors.beneficiaryDetails = 'Beneficiary Details are required.';
        if (!formData.premiumAmount) newErrors.premiumAmount = 'Premium Amount is required.';
        if (!formData.claimLimit) newErrors.claimLimit = 'Claim Limit is required.';
        if (!formData.coverageDetails) newErrors.coverageDetails = 'Coverage Details are required.';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8081/api/healthpolicies/update/${formData.policyNumber}`,
                formData,
                {
                    headers: {
                        'Authorization': 'Basic ' + btoa('user:user'),
                        'Content-Type': 'application/json'
                    }
                }
            );
            setMessage('Policy updated successfully!');
        } catch (error) {
            setMessage('Error updating policy. Please try again.');
            console.error('Error:', error.response || error.message);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-heading">Update Health Insurance Policy</h2>
            {message && <p className="form-message">{message}</p>}
            <form onSubmit={handleFetchPolicy} className="policy-fetch-form">
                <div className="form-group">
                    <label>Enter Policy Number*</label>
                    <input
                        type="text"
                        value={policyNumber}
                        onChange={(e) => setPolicyNumber(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <button type="submit" className="fetch-button">Fetch Policy Details</button>
            </form>

            {/* Render the main form only if a policy number has been fetched successfully */}
            {formData.policyNumber && (
                <form onSubmit={handleSubmit} className="policy-form">
                    <div className="form-group">
                        <label>Policy Number*</label>
                        <input
                            type="text"
                            name="policyNumber"
                            value={formData.policyNumber}
                            className="form-input"
                            readOnly // Read-only field
                        />
                    </div>
                    <div className="form-group">
                        <label>Policy Type*</label>
                        <select
                            name="policyType"
                            value={formData.policyType}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="Individual">Individual</option>
                            <option value="Family">Family</option>
                            <option value="Group">Group</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Coverage Amount*</label>
                        <input
                            type="number"
                            name="coverageAmount"
                            value={formData.coverageAmount}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                        {errors.coverageAmount && <p className="error-message">{errors.coverageAmount}</p>}
                    </div>

                    <h3 className="form-subheading">Policyholder Details</h3>

                    <div className="form-group">
                        <label>User ID*</label>
                        <input
                            type="text"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            className="form-input"
                            readOnly // Read-only field
                        />
                    </div>

                    <div className="form-group">
                        <label>User Email*</label>
                        <input
                            type="email"
                            name="userEmail"
                            value={formData.userEmail}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile Number*</label>
                        <input
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                        {errors.mobileNumber && <p className="error-message">{errors.mobileNumber}</p>}
                    </div>

                    <div className="form-group">
                        <label>Beneficiary Details*</label>
                        <input
                            type="text"
                            name="beneficiaryDetails"
                            value={formData.beneficiaryDetails}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                        {errors.beneficiaryDetails && <p className="error-message">{errors.beneficiaryDetails}</p>}
                    </div>

                    <div className="form-group">
                        <label>Pre-Existing Diseases</label>
                        <input
                            type="text"
                            name="preExistingDiseases"
                            value={formData.preExistingDiseases}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <h3 className="form-subheading">Premium Information</h3>

                    <div className="form-group">
                        <label>Premium Amount*</label>
                        <input
                            type="number"
                            name="premiumAmount"
                            value={formData.premiumAmount}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                        {errors.premiumAmount && <p className="error-message">{errors.premiumAmount}</p>}
                    </div>

                    <div className="form-group">
                        <label>Payment Frequency*</label>
                        <select
                            name="paymentFrequency"
                            value={formData.paymentFrequency}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="Monthly">Monthly</option>
                            <option value="Quarterly">Quarterly</option>
                            <option value="Annually">Annually</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Claim Limit*</label>
                        <input
                            type="number"
                            name="claimLimit"
                            value={formData.claimLimit}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                        {errors.claimLimit && <p className="error-message">{errors.claimLimit}</p>}
                    </div>

                    <div className="form-group">
                        <label>Coverage Details*</label>
                        <textarea
                            name="coverageDetails"
                            value={formData.coverageDetails}
                            onChange={handleChange}
                            className="form-input"
                            required
                        ></textarea>
                        {errors.coverageDetails && <p className="error-message">{errors.coverageDetails}</p>}
                    </div>

                    <button type="submit" className="submit-button">Update Policy</button>
                </form>
            )}
        </div>
    );
};

export default HealthInsuranceForm;
