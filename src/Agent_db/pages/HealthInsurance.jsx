import React, { useState } from 'react';
import axios from 'axios';
import './HealthInsuranceForm.css'; // Make sure to link your CSS file

const HealthInsuranceForm = () => {
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
    const [errors, setErrors] = useState({}); // Error state for validation

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear error when user modifies input
    };

    // Validate form inputs
    const validateForm = () => {
        const newErrors = {};
        if (!formData.policyNumber) newErrors.policyNumber = 'Policy Number is required.';
        if (!formData.coverageAmount) newErrors.coverageAmount = 'Coverage Amount is required.';
        if (!formData.startDate) newErrors.startDate = 'Start Date is required.';
        if (!formData.endDate) newErrors.endDate = 'End Date is required.';
        if (!formData.userId) newErrors.userId = 'User ID is required.';
        if (!formData.userEmail) newErrors.userEmail = 'User Email is required.';
        if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile Number is required.';
        if (!formData.beneficiaryDetails) newErrors.beneficiaryDetails = 'Beneficiary Details are required.';
        if (!formData.premiumAmount) newErrors.premiumAmount = 'Premium Amount is required.';
        if (!formData.claimLimit) newErrors.claimLimit = 'Claim Limit is required.';
        if (!formData.coverageDetails) newErrors.coverageDetails = 'Coverage Details are required.';

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors); // Set errors to state
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8081/api/healthpolicies',
                formData,
                {
                    headers: {
                        'Authorization': 'Basic ' + btoa('user:user'), // Basic Auth
                        'Content-Type': 'application/json'
                    }
                }
            );
            setMessage('Policy created successfully!');
            setFormData({ // Reset form on success
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
        } catch (error) {
            setMessage('Error creating policy. Please try again.');
            console.error('Error:', error.response || error.message);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-heading">Health Insurance Policy Form</h2>
            {message && <p className="form-message">{message}</p>}
            <form onSubmit={handleSubmit} className="policy-form">
                
                <div className="form-group">
                    <label>Policy Number*</label>
                    <input
                        type="text"
                        name="policyNumber"
                        value={formData.policyNumber}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    {errors.policyNumber && <p className="error-message">{errors.policyNumber}</p>}
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

                <div className="form-group">
                    <label>Start Date*</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    {errors.startDate && <p className="error-message">{errors.startDate}</p>}
                </div>

                <div className="form-group">
                    <label>End Date*</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    {errors.endDate && <p className="error-message">{errors.endDate}</p>}
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
                        required
                    />
                    {errors.userId && <p className="error-message">{errors.userId}</p>}
                </div>

                <div className="form-group">
                    <label>User Email*</label>
                    <input
                        type="email"
                        name="userEmail"
                        value={formData.userEmail}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    {errors.userEmail && <p className="error-message">{errors.userEmail}</p>}
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

                <button type="submit" className="form-submit">Submit</button>
            </form>
        </div>
    );
};

export default HealthInsuranceForm;
