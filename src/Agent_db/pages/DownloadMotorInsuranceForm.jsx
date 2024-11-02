import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf"; // Import jsPDF
import styles from '../styles/AddPolicy.module.css';
import Navbar from "../components/Navbar";
import AgentFooter from "./AgentFooter";

function DownloadMotorInsuranceForm() {
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
    vehicleMake: "",
    vehicleModel: "",
    vehicleRegistrationNumber: "",
    beneficiaryDetails: "",
    termsAndConditions: "",
    coverageDetails: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedAgentId = localStorage.getItem('agentId');
    if (storedAgentId) {
      setFormData(prevState => ({
        ...prevState,
        agentId: storedAgentId
      }));
    } else {
      console.error('AgentId not found in local storage');
    }
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

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach(key => {
      if (formData[key] === "" && key !== "agentId") {
        newErrors[key] = "This field is required";
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    ['agentEmail', 'userEmail'].forEach(field => {
      if (formData[field] && !emailRegex.test(formData[field])) {
        newErrors[field] = "Invalid email format";
      }
    });

    const mobileRegex = /^\d{10}$/;
    if (formData.mobileNumber && !mobileRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Invalid mobile number format (10 digits required)";
    }

    ['premiumAmount', 'coverageAmount'].forEach(field => {
      if (formData[field] && (isNaN(formData[field]) || Number(formData[field]) <= 0)) {
        newErrors[field] = "Must be a positive number";
      }
    });

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
        const response = await axios.post('http://localhost:8081/api/motorinsurances', formData, {
          auth: {
            username: 'agent',
            password: 'agent'
          }
        });
        console.log('Form submitted successfully:', response.data);
        setMessage("Policy created successfully!");
        setFormData({
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
          vehicleMake: "",
          vehicleModel: "",
          vehicleRegistrationNumber: "",
          beneficiaryDetails: "",
          termsAndConditions: "",
          coverageDetails: ""
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        setMessage("Error submitting form. Please try again.");
      }
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Motor Insurance Policy Details", 14, 20);
    doc.text(`Policy Number: ${formData.policyNumber}`, 14, 30);
    doc.text(`Agent ID: ${formData.agentId}`, 14, 40);
    doc.text(`Agent Email: ${formData.agentEmail}`, 14, 50);
    doc.text(`User ID: ${formData.userId}`, 14, 60);
    doc.text(`User Email: ${formData.userEmail}`, 14, 70);
    doc.text(`Mobile Number: ${formData.mobileNumber}`, 14, 80);
    doc.text(`Start Date: ${formData.startDate}`, 14, 90);
    doc.text(`End Date: ${formData.endDate}`, 14, 100);
    doc.text(`Premium Amount: ${formData.premiumAmount}`, 14, 110);
    doc.text(`Coverage Amount: ${formData.coverageAmount}`, 14, 120);
    doc.text(`Payment Frequency: ${formData.paymentFrequency}`, 14, 130);
    doc.text(`Policy Status: ${formData.policyStatus}`, 14, 140);
    doc.text(`Vehicle Make: ${formData.vehicleMake}`, 14, 150);
    doc.text(`Vehicle Model: ${formData.vehicleModel}`, 14, 160);
    doc.text(`Vehicle Registration Number: ${formData.vehicleRegistrationNumber}`, 14, 170);
    doc.text(`Beneficiary Details: ${formData.beneficiaryDetails}`, 14, 180);
    doc.text(`Terms and Conditions: ${formData.termsAndConditions}`, 14, 190);
    doc.text(`Coverage Details: ${formData.coverageDetails}`, 14, 200);
    doc.save("motor_insurance_policy.pdf");
  };

  return (
    <>
    <Navbar/>
    <div className={styles.Formbg}>
      <h1 className={styles.title}>Motor Insurance Policy Form</h1>
      {message && <div style={{ color: 'green' }}>{message}</div>}
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
        <br /><hr />

        <h3>Policyholder Information</h3>
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
        <br /><hr />

        <h3>Vehicle Information</h3>
        <label>Vehicle Make</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="text" 
          name="vehicleMake" 
          value={formData.vehicleMake} 
          onChange={handleChange} 
          placeholder="Vehicle Make" 
        />
        {errors.vehicleMake && <span style={{ color: 'red' }}>{errors.vehicleMake}</span>}
        <br />

        <label>Vehicle Model</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="text" 
          name="vehicleModel" 
          value={formData.vehicleModel} 
          onChange={handleChange} 
          placeholder="Vehicle Model" 
        />
        {errors.vehicleModel && <span style={{ color: 'red' }}>{errors.vehicleModel}</span>}
        <br />

        <label>Vehicle Registration Number</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="text" 
          name="vehicleRegistrationNumber" 
          value={formData.vehicleRegistrationNumber} 
          onChange={handleChange} 
          placeholder="Vehicle Registration Number" 
        />
        {errors.vehicleRegistrationNumber && <span style={{ color: 'red' }}>{errors.vehicleRegistrationNumber}</span>}
        <br /><hr />

        <h3>Coverage Information</h3>
        <label>Premium Amount</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="number" 
          name="premiumAmount" 
          value={formData.premiumAmount} 
          onChange={handleChange} 
          placeholder="Premium Amount" 
        />
        {errors.premiumAmount && <span style={{ color: 'red' }}>{errors.premiumAmount}</span>}
        <br />

        <label>Coverage Amount</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="number" 
          name="coverageAmount" 
          value={formData.coverageAmount} 
          onChange={handleChange} 
          placeholder="Coverage Amount" 
        />
        {errors.coverageAmount && <span style={{ color: 'red' }}>{errors.coverageAmount}</span>}
        <br /><hr />
        <button type="button" onClick={downloadPDF}>Download PDF</button>
      </form>
    </div>
    <AgentFooter/>
    </>
  );
}

export default DownloadMotorInsuranceForm;
