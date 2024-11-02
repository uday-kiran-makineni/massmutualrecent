import React, { useState, useEffect } from "react";
import styles from '../styles/AddPolicy.module.css';
import axios from "axios";
import Navbar from '../components/Navbar';
function UpdateLifeInsurance() {
  const [formData, setFormData] = useState({
    policyNumber: "",
    agentId: "",
    agentEmail: "",
    userId: "",
    userEmail: "",
    mobileNumber: "",
    startDate: "",
    endDate: "", // Read-only
    premiumAmount: "",
    coverageAmount: "",
    paymentFrequency: "",
    policyStatus: "Inactive",
    beneficiaryDetails: "",
    policyType: "Term Life",
    termsAndConditions: "",
    sumAssured: "",
    riskCoverDetails: ""
  });

  const [errors, setErrors] = useState({});
  const [policyNumber, setPolicyNumber] = useState("");

  useEffect(() => {
    const storedAgentId = localStorage.getItem('agentId');
    const storedAgentEmail = localStorage.getItem('agentEmail');

    if (storedAgentId) {
      setFormData(prevState => ({
        ...prevState,
        agentId: storedAgentId,
        agentEmail: storedAgentEmail || ""
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
    
    // Validate editable form fields
    ['userEmail', 'mobileNumber', 'coverageAmount', 'paymentFrequency', 'beneficiaryDetails', 'termsAndConditions', 'sumAssured', 'riskCoverDetails'].forEach(key => {
      if (formData[key] === "") {
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

    ['coverageAmount', 'sumAssured'].forEach(field => {
      if (formData[field] && (isNaN(formData[field]) || Number(formData[field]) <= 0)) {
        newErrors[field] = "Must be a positive number";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.put(`http://localhost:8081/api/lifeinsurance/update/${policyNumber}`, formData, {
          auth: {
            username: 'user',
            password: 'user'
          }
        });
        console.log('Policy updated successfully:', response.data);
        
        // Clear the form data after successful submission
        setFormData({
          policyNumber: "",
          agentId: "",
          agentEmail: "",
          userId: "",
          userEmail: "",
          mobileNumber: "",
          startDate: "",
          endDate: "", // Keep this unchanged
          premiumAmount: "",
          coverageAmount: "",
          paymentFrequency: "",
          policyStatus: "Inactive",
          beneficiaryDetails: "",
          policyType: "Term Life",
          termsAndConditions: "",
          sumAssured: "",
          riskCoverDetails: ""
        });
        
        alert("Policy updated successfully!");
        
      } catch (error) {
        console.error('Error updating policy:', error);
        alert("There was an error updating the policy. Please try again.");
      }
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  const fetchPolicy = async () => {
    if (policyNumber) {
      try {
        const response = await axios.get(`http://localhost:8081/api/lifeinsurance/${policyNumber}`, {
          auth: {
            username: 'user',
            password: 'user'
          }
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching policy:', error);
        alert("Policy not found or error fetching policy. Please check the Policy Number.");
      }
    }
  };

  return (
    <>
    <Navbar/>
    <div className={styles.Formbg}>
      <h1 className={styles.title}>Update Life Insurance Policy</h1>
      <label>Enter Policy Number</label>
      <input 
        type="text" 
        value={policyNumber} 
        onChange={(e) => setPolicyNumber(e.target.value)} 
        placeholder="Policy Number" 
      />
      <button onClick={fetchPolicy}>Fetch Policy</button>

      <form onSubmit={handleSubmit}>
        <h3>Policy Information</h3>

        <label>Policy Number</label>
        <input 
          type="text" 
          name="policyNumber" 
          value={formData.policyNumber} 
          onChange={handleChange} 
          placeholder="Policy Number" 
          readOnly // Keep read-only
        />
        <br />

        <label>Coverage Amount</label>
        <input 
          type="text" 
          name="coverageAmount" 
          value={formData.coverageAmount} 
          onChange={handleChange} 
          placeholder="Coverage Amount" 
          readOnly
        />
        <br />


        <h3>Policyholder Details</h3>
    
        <label>User ID</label>
        <input 
          type="text" 
          name="userId" 
          value={formData.userId} 
          onChange={handleChange} 
          placeholder="User ID" 
          readOnly // Keep read-only
        />
        <br />

        <label>User Email</label>
        <input 
          type="email" 
          name="userEmail" 
          value={formData.userEmail} 
          onChange={handleChange} 
          placeholder="User Email" 
        />
        <br />

        <label>Mobile Number</label>
        <input 
          type="text" 
          name="mobileNumber" 
          value={formData.mobileNumber} 
          onChange={handleChange} 
          placeholder="Mobile Number" 
        />
        <br />

        <label>Beneficiary Details</label>
        <input 
          type="text" 
          name="beneficiaryDetails" 
          value={formData.beneficiaryDetails} 
          onChange={handleChange} 
          placeholder="Beneficiary Name, Relation" 
        />
        <br />
        <hr />
  
        <h3>Premium Information</h3>

        <label>Premium Amount</label>
        <input 
          type="text" 
          name="premiumAmount" 
          value={formData.premiumAmount} 
          onChange={handleChange} 
          placeholder="Premium Amount" 
          readOnly // Keep read-only
        />
        <br />

        <label>Payment Frequency</label>
        <select 
          name="paymentFrequency" 
          value={formData.paymentFrequency} 
          onChange={handleChange}
        >
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Annually">Annually</option>
        </select>
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
          readOnly // Keep read-only
        />
        <br />

        <label>Risk Cover Details</label>
        <textarea 
          name="riskCoverDetails" 
          value={formData.riskCoverDetails} 
          onChange={handleChange} 
          placeholder="Risk Cover Details" 
        />
        <br />

        <button type="submit" className={styles.submitBtn}>Update Policy</button>
      </form>
    </div>
    </>
  );
}

export default UpdateLifeInsurance;
