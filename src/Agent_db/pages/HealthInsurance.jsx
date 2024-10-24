//HealthInsurance.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from '../styles/AddPolicy.module.css';

function HealthInsurance() {
  const [formData, setFormData] = useState({
    policyNumber: "",
    agentId: "",
    agentEmail: "",
    userId: "",
    userEmail: "",
    mobileNumber: "",
    startDate: "",
    endDate: "",
    premiumAmount: "",
    coverageAmount: "",
    paymentFrequency: "",
    policyStatus: "",
    beneficiaryDetails: "",
    claimLimit: "",
    policyType: "Individual",
    termsAndConditions: "",
    preExistingDiseases: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedAgentId = localStorage.getItem('username');
    if (storedAgentId) {
      setFormData(prevState => ({
        ...prevState,
        agentId: storedAgentId
      }));
    } else {
      console.error('AgentId not found in local storage');
      // You might want to handle this case (e.g., redirect to login)
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear the error for this field as the user types
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    // Check for empty required fields
    Object.keys(formData).forEach(key => {
      if (formData[key] === "" && key !== "agentEmail" && key !== "policyStatus" && key !== "preExistingDiseases") {
        newErrors[key] = "This field is required";
      }
    });

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.userEmail && !emailRegex.test(formData.userEmail)) {
      newErrors.userEmail = "Invalid email format";
    }

    // Validate mobile number (assuming 10 digits)
    const mobileRegex = /^\d{10}$/;
    if (formData.mobileNumber && !mobileRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Invalid mobile number format (10 digits required)";
    }

    // Validate amounts are positive numbers
    ['premiumAmount', 'coverageAmount', 'claimLimit'].forEach(field => {
      if (formData[field] && (isNaN(formData[field]) || Number(formData[field]) <= 0)) {
        newErrors[field] = "Must be a positive number";
      }
    });

    // Validate dates
    const today = new Date();
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (startDate < today) {
      newErrors.startDate = "Start date cannot be in the past";
    }
    if (endDate <= startDate) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8081/api/healthpolicies', formData);
        console.log('Form submitted successfully:', response.data);
        // Handle successful submission (e.g., show success message, reset form, etc.)
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle submission error (e.g., show error message)
      }
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  return (
    <div className={styles.Formbg}>
      <h1 className={styles.title}>Health Insurance Policy Form</h1>
      <form onSubmit={handleSubmit}>
        <h3>Policy Information</h3><br />
        <label>Policy Number<span style={{ color: 'red' }}>*</span></label>
        <input 
          type="text" 
          name="policyNumber" 
          value={formData.policyNumber} 
          onChange={handleChange} 
          placeholder="Policy Number" 
        />
        {errors.policyNumber && <span style={{ color: 'red' }}>{errors.policyNumber}</span>}
        <br />

        <label>Policy Type<span style={{ color: 'red' }}>*</span></label>
        <select 
          name="policyType" 
          value={formData.policyType} 
          onChange={handleChange}
        >
          <option value="Individual">Individual</option>
          <option value="Family">Family</option>
          <option value="Critical Illness">Critical Illness</option>
        </select>
        {errors.policyType && <span style={{ color: 'red' }}>{errors.policyType}</span>}
        <br />

        <label>Coverage Amount<span style={{ color: 'red' }}>*</span></label>
        <input 
          type="text" 
          name="coverageAmount" 
          value={formData.coverageAmount} 
          onChange={handleChange} 
          placeholder="Coverage Amount" 
        />
        {errors.coverageAmount && <span style={{ color: 'red' }}>{errors.coverageAmount}</span>}
        <br />

        <label>Start Date<span style={{ color: 'red' }}>*</span></label>
        <input 
          type="date" 
          name="startDate" 
          value={formData.startDate} 
          onChange={handleChange} 
        />
        {errors.startDate && <span style={{ color: 'red' }}>{errors.startDate}</span>}
        <br />

        <label>End Date<span style={{ color: 'red' }}>*</span></label>
        <input 
          type="date" 
          name="endDate" 
          value={formData.endDate} 
          onChange={handleChange} 
        />
        {errors.endDate && <span style={{ color: 'red' }}>{errors.endDate}</span>}
        <br /><hr />

        <h3>Policyholder Details</h3><br />
        <label>User ID<span style={{ color: 'red' }}>*</span></label>
        <input 
          type="text" 
          name="userId" 
          value={formData.userId} 
          onChange={handleChange} 
          placeholder="User ID" 
        />
        {errors.userId && <span style={{ color: 'red' }}>{errors.userId}</span>}
        <br />

        <label>User Email<span style={{ color: 'red' }}>*</span></label>
        <input 
          type="email" 
          name="userEmail" 
          value={formData.userEmail} 
          onChange={handleChange} 
          placeholder="User Email" 
        />
        {errors.userEmail && <span style={{ color: 'red' }}>{errors.userEmail}</span>}
        <br />

        <label>Mobile Number<span style={{ color: 'red' }}>*</span></label>
        <input 
          type="text" 
          name="mobileNumber" 
          value={formData.mobileNumber} 
          onChange={handleChange} 
          placeholder="Mobile Number" 
        />
        {errors.mobileNumber && <span style={{ color: 'red' }}>{errors.mobileNumber}</span>}
        <br />

        <label>Beneficiary Details<span style={{ color: 'red' }}>*</span></label>
        <input 
          type="text" 
          name="beneficiaryDetails" 
          value={formData.beneficiaryDetails} 
          onChange={handleChange} 
          placeholder="Beneficiary Name, Relation" 
        />
        {errors.beneficiaryDetails && <span style={{ color: 'red' }}>{errors.beneficiaryDetails}</span>}
        <br />

        <label>Pre-Existing Diseases</label>
        <input 
          type="text" 
          name="preExistingDiseases" 
          value={formData.preExistingDiseases} 
          onChange={handleChange} 
          placeholder="Pre-Existing Diseases (if any)" 
        />
        {errors.preExistingDiseases && <span style={{ color: 'red' }}>{errors.preExistingDiseases}</span>}
        <br /><hr />

        <h3>Premium Information</h3><br />
        <label>Premium Amount<span style={{ color: 'red' }}>*</span></label>
        <input 
          type="text" 
          name="premiumAmount" 
          value={formData.premiumAmount} 
          onChange={handleChange} 
          placeholder="Premium Amount" 
        />
        {errors.premiumAmount && <span style={{ color: 'red' }}>{errors.premiumAmount}</span>}
        <br />

        <label>Payment Frequency<span style={{ color: 'red' }}>*</span></label>
        <input 
          type="radio" 
          name="paymentFrequency" 
          value="Monthly" 
          checked={formData.paymentFrequency === 'Monthly'} 
          onChange={handleChange} 
        /> Monthly
        <input 
          type="radio" 
          name="paymentFrequency" 
          value="Quarterly" 
          checked={formData.paymentFrequency === 'Quarterly'} 
          onChange={handleChange} 
        /> Quarterly
        <input 
          type="radio" 
          name="paymentFrequency" 
          value="Annually" 
          checked={formData.paymentFrequency === 'Annually'} 
          onChange={handleChange} 
        /> Annually
        {errors.paymentFrequency && <span style={{ color: 'red' }}>{errors.paymentFrequency}</span>}
        <br />

        <label>Claim Limit<span style={{ color: 'red' }}>*</span></label>
        <input 
          type="text" 
          name="claimLimit" 
          value={formData.claimLimit} 
          onChange={handleChange} 
          placeholder="Claim Limit" 
        />
        {errors.claimLimit && <span style={{ color: 'red' }}>{errors.claimLimit}</span>}
        <br /><hr />

        <h3>Terms & Conditions</h3><br />
        <label>Coverage Details<span style={{ color: 'red' }}>*</span></label>
        <textarea 
          name="termsAndConditions" 
          value={formData.termsAndConditions} 
          onChange={handleChange} 
          placeholder="Terms and Conditions" 
        />
        {errors.termsAndConditions && <span style={{ color: 'red' }}>{errors.termsAndConditions}</span>}
        <br />

        <input type="submit" value="Submit" id="submit" />
      </form>
    </div>
  );
}

export default HealthInsurance;