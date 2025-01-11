import React, { useState, useEffect } from "react";
import styles from '../styles/AddPolicy.module.css';
import axios from "axios";
import Navbar from '../components/Navbar';

function TravelInsurance() {
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
    policyStatus: "Active", // Default status
    beneficiaryDetails: "",
    travelDestination: "",
    departureDate: "",
    returnDate: "",
    travelPurpose: "Vacation", // Default travel purpose
    termsAndConditions: "",
    medicalCoverage: "",
    tripCancellationCoverage: "",
    riskCoverDetails: ""
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedAgentId = localStorage.getItem('agentId');
    const storedAgentEmail = localStorage.getItem('agentEmail');
    setFormData(prevState => ({
      ...prevState,
      agentId: storedAgentId || 0,
      agentEmail: storedAgentEmail || "company@gmail.com"
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  // const validateForm = () => {
  //   let newErrors = {};
  //   Object.keys(formData).forEach(key => {
  //     if (formData[key] === "" && key !== "agentId" && key !== "agentEmail" && key !== "policyStatus") {
  //       newErrors[key] = "This field is required";
  //     }
  //   });

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (formData.userEmail && !emailRegex.test(formData.userEmail)) {
  //     newErrors.userEmail = "Invalid email format";
  //   }

  //   const mobileRegex = /^\d{10}$/;
  //   if (formData.mobileNumber && !mobileRegex.test(formData.mobileNumber)) {
  //     newErrors.mobileNumber = "Invalid mobile number format (10 digits required)";
  //   }

  //   ['premiumAmount', 'coverageAmount', 'medicalCoverage', 'tripCancellationCoverage'].forEach(field => {
  //     if (formData[field] && (isNaN(formData[field]) || Number(formData[field]) <= 0)) {
  //       newErrors[field] = "Must be a positive number";
  //     }
  //   });

  //   const today = new Date();
  //   const startDate = new Date(formData.startDate);
  //   const endDate = new Date(formData.endDate);
  //   const departureDate = new Date(formData.departureDate);
  //   const returnDate = new Date(formData.returnDate);

  //   if (startDate < today) {
  //     newErrors.startDate = "Start date cannot be in the past";
  //   }
  //   if (endDate <= startDate) {
  //     newErrors.endDate = "End date must be after start date";
  //   }
  //   if (departureDate < today) {
  //     newErrors.departureDate = "Departure date cannot be in the past";
  //   }
  //   if (returnDate <= departureDate) {
  //     newErrors.returnDate = "Return date must be after departure date";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (true) {
      try {
        const response = await axios.post('http://localhost:8081/api/travelinsurances', formData, {
          headers: {
            'Authorization': 'Basic ' + btoa('agent:agent'),
            'Content-Type': 'application/json',
          }
        });
        console.log('Form submitted successfully:', response.data);
        setSuccessMessage("Travel Insurance policy created successfully!");
        setErrorMessage(""); // Clear previous errors

        // Reset form data
        setFormData({
          policyNumber: "",
          agentId: localStorage.getItem('agentId') || "",
          agentEmail: localStorage.getItem('agentEmail') || "",
          userId: "",
          userEmail: "",
          mobileNumber: "",
          startDate: "",
          endDate: "",
          premiumAmount: "",
          coverageAmount: "",
          paymentFrequency: "",
          policyStatus: "Active", // Reset to default status
          beneficiaryDetails: "",
          travelDestination: "",
          departureDate: "",
          returnDate: "",
          travelPurpose: "Vacation", // Reset to default travel purpose
          termsAndConditions: "",
          medicalCoverage: "",
          tripCancellationCoverage: "",
          riskCoverDetails: ""
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrorMessage("An error occurred while creating the policy. Please try again.");
        setSuccessMessage(""); // Clear previous success message
      }
    } else {
      console.log("Form has errors. Please correct them.");
      setErrorMessage("Please fix the highlighted errors before submitting.");
    }
  };

  return (
    <>
    <Navbar/>
    <div className={styles.Formbg}>
      <h1 className={styles.title}>Travel Insurance Policy Form</h1>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <h3>Policy Information</h3>
        <label>Policy Number</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="text" 
          name="policyNumber" 
          value={formData.policyNumber} 
          onChange={handleChange} 
          placeholder="Policy Number" 
        />
        {errors.policyNumber && <span style={{ color: 'red' }}>{errors.policyNumber}</span>}
        <br />

        <label>Coverage Amount</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="text" 
          name="coverageAmount" 
          value={formData.coverageAmount} 
          onChange={handleChange} 
          placeholder="Coverage Amount" 
        />
        {errors.coverageAmount && <span style={{ color: 'red' }}>{errors.coverageAmount}</span>}
        <br />

        <label>Start Date</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="date" 
          name="startDate" 
          value={formData.startDate} 
          onChange={handleChange} 
        />
        {errors.startDate && <span style={{ color: 'red' }}>{errors.startDate}</span>}
        <br />

        <label>End Date</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="date" 
          name="endDate" 
          value={formData.endDate} 
          onChange={handleChange} 
        />
        {errors.endDate && <span style={{ color: 'red' }}>{errors.endDate}</span>}
        <br />

        <h3>Policyholder Details</h3>
        <label>User ID</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="text" 
          name="userId" 
          value={formData.userId} 
          onChange={handleChange} 
          placeholder="User ID" 
        />
        {errors.userId && <span style={{ color: 'red' }}>{errors.userId}</span>}
        <br />

        <label>User Email</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="email" 
          name="userEmail" 
          value={formData.userEmail} 
          onChange={handleChange} 
          placeholder="User Email" 
        />
        {errors.userEmail && <span style={{ color: 'red' }}>{errors.userEmail}</span>}
        <br />

        <label>Mobile Number</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="text" 
          name="mobileNumber" 
          value={formData.mobileNumber} 
          onChange={handleChange} 
          placeholder="Mobile Number" 
        />
        {errors.mobileNumber && <span style={{ color: 'red' }}>{errors.mobileNumber}</span>}
        <br />

        <label>Beneficiary Details</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="text" 
          name="beneficiaryDetails" 
          value={formData.beneficiaryDetails} 
          onChange={handleChange} 
          placeholder="Beneficiary Name, Relation, etc." 
        />
        {errors.beneficiaryDetails && <span style={{ color: 'red' }}>{errors.beneficiaryDetails}</span>}
        <br />

        <label>Travel Destination</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="text" 
          name="travelDestination" 
          value={formData.travelDestination} 
          onChange={handleChange} 
          placeholder="Travel Destination" 
        />
        {errors.travelDestination && <span style={{ color: 'red' }}>{errors.travelDestination}</span>}
        <br />

        <label>Departure Date</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="date" 
          name="departureDate" 
          value={formData.departureDate} 
          onChange={handleChange} 
        />
        {errors.departureDate && <span style={{ color: 'red' }}>{errors.departureDate}</span>}
        <br />

        <label>Return Date</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="date" 
          name="returnDate" 
          value={formData.returnDate} 
          onChange={handleChange} 
        />
        {errors.returnDate && <span style={{ color: 'red' }}>{errors.returnDate}</span>}
        <br />

        <label>Payment Frequency</label>
        <input 
          type="text" 
          name="paymentFrequency" 
          value={formData.paymentFrequency} 
          onChange={handleChange} 
          placeholder="Payment Frequency" 
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
}

export default TravelInsurance;
