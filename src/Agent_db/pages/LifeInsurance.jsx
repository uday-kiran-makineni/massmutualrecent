import React, { useState, useEffect } from "react";
import styles from '../styles/AddPolicy.module.css';
import axios from "axios";
import Navbar from '../components/Navbar';
function LifeInsurance() {
  const [formData, setFormData] = useState({
    policyNumber: "LI2024009",
          agentId: "1",
          agentEmail: "agent1@gmail.com",
          userId: "3",
          userEmail: "makineni.uday1@gmail.com",
          mobileNumber: "9177765166",
          startDate: "2024-11-30 00:00:00.000000",
          endDate: "2024-12-31 00:00:00.000000",
          premiumAmount: "15000",
          coverageAmount: "2000000",
          paymentFrequency: "Monthly",
          policyStatus: "Active",
          beneficiaryDetails: "Jimmy - Friend",
          policyType: "Term",
          termsAndConditions: "Flexible premiums, adjustable death benefits.",
          sumAssured: "50000",
          riskCoverDetails: "Covers life with a lump-sum payout upon death."
  });

  const [errors, setErrors] = useState({});

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

    ['premiumAmount', 'coverageAmount', 'sumAssured'].forEach(field => {
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
        const response = await axios.post('http://localhost:8081/api/lifeinsurance/create', formData, {
          auth: {
            username: 'user',
            password: 'user'
          }
        });
        console.log('Form submitted successfully:', response.data);
  
        // Send email notification
        const emailPayload = {
          userEmail: formData.userEmail,
          policyNumber: formData.policyNumber,
          coverageAmount: formData.coverageAmount,
          startDate: formData.startDate,
          endDate: formData.endDate
        };
        
        try {
          const emailResponse = await axios.post('http://localhost:8081/api/lifeinsurance/send_email', emailPayload, {
            auth:{
              username: 'user',
              password: 'user'
            }
          });
          console.log('Email sent successfully:', emailResponse.data);
          alert("Policy created and email sent successfully!"); 
        } catch (emailError) {
          console.error('Error sending email:', emailError);
          alert("Policy created, but there was an error sending the email.");
        }
  
        // Clear the form data
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
          beneficiaryDetails: "",
          policyType: "Term",
          termsAndConditions: "",
          sumAssured: "",
          riskCoverDetails: ""
        });
  
      } catch (error) {
        console.error('Error submitting form:', error);
        alert("There was an error creating the policy. Please try again.");
      }
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };
  

  return (
    <>
    <Navbar/>
    <div className={styles.Formbg}>
      <h1 className={styles.title}>Life Insurance Policy Form</h1>
      <form onSubmit={handleSubmit}>
        <h3>Policy Information</h3>

        <label>Policy Type</label><span style={{ color: 'red' }}>*</span>
        <select 
          name="policyType" 
          value={formData.policyType} 
          onChange={handleChange}
        >
          <option value="Term Life">Term Life</option>
          <option value="Whole Life">Whole Life</option>
          <option value="Universal Life">Universal Life</option>
        </select>
        {errors.policyType && <span style={{ color: 'red' }}>{errors.policyType}</span>}
        <br />

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
        <hr />

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
          placeholder="Beneficiary Name, Relation" 
        />
        {errors.beneficiaryDetails && <span style={{ color: 'red' }}>{errors.beneficiaryDetails}</span>}
        <br />
        <hr />
  
        <h3>Premium Information</h3>

        <label>Premium Amount</label><span style={{ color: 'red' }}>*</span>
        <input 
          type="text" 
          name="premiumAmount" 
          value={formData.premiumAmount} 
          onChange={handleChange} 
          placeholder="Premium Amount" 
        />
        {errors.premiumAmount && <span style={{ color: 'red' }}>{errors.premiumAmount}</span>}
        <br />

        <label>Payment Frequency</label><span style={{ color: 'red' }}>*</span>
        <select 
          name="paymentFrequency" 
          value={formData.paymentFrequency} 
          onChange={handleChange}
        >
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Annually">Annually</option>
        </select>
        {errors.paymentFrequency && <span style={{ color: 'red' }}>{errors.paymentFrequency}</span>}
        <br />
        <hr />

        <h3>Additional Information</h3>

        <label>Terms and Conditions</label>
        <textarea 
          name="termsAndConditions" 
          value={formData.termsAndConditions} 
          onChange={handleChange} 
          placeholder="Enter Terms and Conditions" 
        />
        <br />

        <label>Sum Assured</label>
        <input 
          type="text" 
          name="sumAssured" 
          value={formData.sumAssured} 
          onChange={handleChange} 
          placeholder="Sum Assured" 
        />
        <br />

        <label>Risk Cover Details</label>
        <textarea 
          name="riskCoverDetails" 
          value={formData.riskCoverDetails} 
          onChange={handleChange} 
          placeholder="Enter Risk Cover Details" 
        />
        <br />

        <button type="submit" className={styles.submitBtn}>Submit</button>
      </form>
    </div>
    </>
  );
}

export default LifeInsurance;
