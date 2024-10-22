import React, { useState } from "react";
import axios from "axios";
import styles from '../styles/UpdatePolicy.module.css';

function UpdateTravelInsurance() {
  const [policyNumber, setPolicyNumber] = useState("");
  const [formData, setFormData] = useState({
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
    policyStatus: "Active",
    beneficiaryDetails: "",
    travelDestination: "",
    departureDate: "",
    returnDate: "",
    travelPurpose: "Vacation",
    termsAndConditions: "",
    medicalCoverage: "",
    tripCancellationCoverage: "",
    riskCoverDetails: ""
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const fetchPolicyDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/travelinsurances/policy/${policyNumber}`, {
        headers: {
          'Authorization': 'Basic ' + btoa('agent:agent'),
          'Content-Type': 'application/json',
        }
      });
      setFormData(response.data);
      setSuccessMessage("Policy details fetched successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error('Error fetching policy:', error);
      setErrorMessage("Failed to fetch policy details. Please check the policy number.");
      setSuccessMessage("");
    }
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach(key => {
      if (formData[key] === "" && key !== "agentId" && key !== "agentEmail" && key !== "policyStatus") {
        newErrors[key] = "This field is required";
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.userEmail && !emailRegex.test(formData.userEmail)) {
      newErrors.userEmail = "Invalid email format";
    }

    const mobileRegex = /^\d{10}$/;
    if (formData.mobileNumber && !mobileRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Invalid mobile number format (10 digits required)";
    }

    ['premiumAmount', 'coverageAmount', 'medicalCoverage', 'tripCancellationCoverage'].forEach(field => {
      if (formData[field] && (isNaN(formData[field]) || Number(formData[field]) <= 0)) {
        newErrors[field] = "Must be a positive number";
      }
    });

    const today = new Date();
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const departureDate = new Date(formData.departureDate);
    const returnDate = new Date(formData.returnDate);

    if (startDate < today) {
      newErrors.startDate = "Start date cannot be in the past";
    }
    if (endDate <= startDate) {
      newErrors.endDate = "End date must be after start date";
    }
    if (departureDate < today) {
      newErrors.departureDate = "Departure date cannot be in the past";
    }
    if (returnDate <= departureDate) {
      newErrors.returnDate = "Return date must be after departure date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.put(`http://localhost:8081/api/travelinsurances/${policyNumber}`, formData, {
          headers: {
            'Authorization': 'Basic ' + btoa('agent:agent'),
            'Content-Type': 'application/json',
          }
        });
        console.log('Policy updated successfully:', response.data);
        setSuccessMessage("Travel Insurance policy updated successfully!");
        setErrorMessage("");
      } catch (error) {
        console.error('Error updating policy:', error);
        setErrorMessage("An error occurred while updating the policy. Please try again.");
        setSuccessMessage("");
      }
    } else {
      console.log("Form has errors. Please correct them.");
      setErrorMessage("Please fix the highlighted errors before submitting.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Update Travel Insurance Policy</h1>
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      <div className={styles.fetchSection}>
        <label>Enter Policy Number:</label>
        <input
          type="text"
          value={policyNumber}
          onChange={(e) => setPolicyNumber(e.target.value)}
          placeholder="Policy Number"
          className={styles.policyInput}
        />
        <button onClick={fetchPolicyDetails} className={styles.fetchButton}>Fetch Policy</button>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>Policy Information</h3>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className={styles.inputGroup}>
            <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
            {key.includes("Date") ? (
              <input
                type="date"
                name={key}
                value={value}
                onChange={handleChange}
                className={styles.inputField}
              />
            ) : (
              <input
                type={key.includes("Email") ? "email" : "text"}
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
                className={styles.inputField}
                disabled={key === "agentId" || key === "agentEmail"}
              />
            )}
            {errors[key] && <span className={styles.errorText}>{errors[key]}</span>}
          </div>
        ))}
        <button type="submit" className={styles.submitButton}>Update Policy</button>
      </form>
    </div>
  );
}

export default UpdateTravelInsurance;
