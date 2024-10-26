import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import styles from '../styles/AddPolicy.module.css';

const DownloadTravelInsuranceForm = () => {
  const [formData] = useState({
    policyNumber: '',
    agentId: '',
    agentEmail: '',
    userId: '',
    userEmail: '',
    mobileNumber: '',
    travelDestination: '',
    startDate: '',
    endDate: '',
    premiumAmount: '',
    coverageAmount: '',
    paymentFrequency: '',
    policyStatus: '',
    beneficiaryDetails: '',
    claimLimit: '',
    policyType: '',
    termsAndConditions: '',
    preExistingDiseases: '',
    travelAssistance: '',
  });

  const handleDownload = () => {
    const doc = new jsPDF();

    // PDF Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text('Travel Insurance Form', 105, 20, { align: 'center' });

    // Add a line below the title for separation
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // Section: Policy Information
    doc.setFontSize(14);
    doc.text('Policy Information', 20, 35);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const policyInfoFields = [
      'policyNumber', 'policyType', 'coverageAmount', 'travelDestination', 'startDate', 'endDate'
    ];
    
    policyInfoFields.forEach((key, index) => {
      doc.text(`${key.replace(/([A-Z])/g, ' $1')}: ${formData[key] || ''}`, 20, 45 + (index * 10));
    });

    // Section: Policyholder Details
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text('Policyholder Details', 20, 95);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const policyholderFields = [
      'userId', 'userEmail', 'mobileNumber', 'beneficiaryDetails', 'preExistingDiseases'
    ];
    
    policyholderFields.forEach((key, index) => {
      doc.text(`${key.replace(/([A-Z])/g, ' $1')}: ${formData[key] || ''}`, 20, 105 + (index * 10));
    });

    // Section: Premium Information
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text('Premium Information', 20, 155);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const premiumFields = [
      'premiumAmount', 'paymentFrequency', 'claimLimit', 'travelAssistance'
    ];
    
    premiumFields.forEach((key, index) => {
      doc.text(`${key.replace(/([A-Z])/g, ' $1')}: ${formData[key] || ''}`, 20, 165 + (index * 10));
    });

    // Section: Terms & Conditions
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text('Terms & Conditions', 20, 205);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const termsText = formData.termsAndConditions || 'Not Provided';
    const termsArray = doc.splitTextToSize(termsText, 170); // Wraps text within 170px width
    doc.text(termsArray, 20, 215);

    // Save the PDF
    doc.save('Travel_Insurance_Form.pdf');
  };

  return (
    <div className={styles.Formbg}>
      <h1 className={styles.title}>Travel Insurance Policy Form</h1>
      <h3>Preview Only - Downloadable</h3>
      <form>
        <h3>Policy Information</h3><br />
        <label>Policy Number</label>
        <input 
          type="text" 
          name="policyNumber" 
          value={formData.policyNumber} 
          disabled 
          placeholder="Policy Number" 
        />
        <br />

        <label>Policy Type</label>
        <select name="policyType" value={formData.policyType} disabled>
          <option value="Individual">Individual</option>
          <option value="Family">Family</option>
          <option value="Group">Group</option>
        </select>
        <br />

        <label>Coverage Amount</label>
        <input 
          type="text" 
          name="coverageAmount" 
          value={formData.coverageAmount} 
          disabled 
          placeholder="Coverage Amount" 
        />
        <br />

        <label>Travel Destination</label>
        <input 
          type="text" 
          name="travelDestination" 
          value={formData.travelDestination} 
          disabled 
          placeholder="Travel Destination" 
        />
        <br />

        <label>Start Date</label>
        <input 
          type="date" 
          name="startDate" 
          value={formData.startDate} 
          disabled 
        />
        <br />

        <label>End Date</label>
        <input 
          type="date" 
          name="endDate" 
          value={formData.endDate} 
          disabled 
        />
        <br /><hr />

        <h3>Policyholder Details</h3><br />
        <label>User ID</label>
        <input 
          type="text" 
          name="userId" 
          value={formData.userId} 
          disabled 
          placeholder="User ID" 
        />
        <br />

        <label>User Email</label>
        <input 
          type="email" 
          name="userEmail" 
          value={formData.userEmail} 
          disabled 
          placeholder="User Email" 
        />
        <br />

        <label>Mobile Number</label>
        <input 
          type="text" 
          name="mobileNumber" 
          value={formData.mobileNumber} 
          disabled 
          placeholder="Mobile Number" 
        />
        <br />

        <label>Beneficiary Details</label>
        <input 
          type="text" 
          name="beneficiaryDetails" 
          value={formData.beneficiaryDetails} 
          disabled 
          placeholder="Beneficiary Name, Relation" 
        />
        <br />

        <label>Pre-Existing Diseases</label>
        <input 
          type="text" 
          name="preExistingDiseases" 
          value={formData.preExistingDiseases} 
          disabled 
          placeholder="Pre-Existing Diseases (if any)" 
        />
        <br /><hr />

        <h3>Premium Information</h3><br />
        <label>Premium Amount</label>
        <input 
          type="text" 
          name="premiumAmount" 
          value={formData.premiumAmount} 
          disabled 
          placeholder="Premium Amount" 
        />
        <br />

        <label>Payment Frequency</label>
        <input 
          type="radio" 
          name="paymentFrequency" 
          value="Monthly" 
          checked={formData.paymentFrequency === 'Monthly'} 
          disabled 
        /> Monthly
        <input 
          type="radio" 
          name="paymentFrequency" 
          value="Quarterly" 
          checked={formData.paymentFrequency === 'Quarterly'} 
          disabled 
        /> Quarterly
        <input 
          type="radio" 
          name="paymentFrequency" 
          value="Annually" 
          checked={formData.paymentFrequency === 'Annually'} 
          disabled 
        /> Annually
        <br />

        <label>Claim Limit</label>
        <input 
          type="text" 
          name="claimLimit" 
          value={formData.claimLimit} 
          disabled 
          placeholder="Claim Limit" 
        />
        <br />

        <label>Travel Assistance</label>
        <input 
          type="text" 
          name="travelAssistance" 
          value={formData.travelAssistance} 
          disabled 
          placeholder="Travel Assistance Details" 
        />
        <br /><hr />

        <h3>Terms & Conditions</h3><br />
        <label>Coverage Details</label>
        <textarea 
          name="termsAndConditions" 
          value={formData.termsAndConditions} 
          disabled 
          placeholder="Terms and Conditions" 
        />
        <br />

        <button type="button" onClick={handleDownload}>
          Download Form as PDF
        </button>
      </form>
    </div>
  );
};

export default DownloadTravelInsuranceForm;
