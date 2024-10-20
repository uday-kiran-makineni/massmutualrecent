import React from 'react';
import { jsPDF } from 'jspdf'; // Import jsPDF
import './TermsAndConditions.css'; // Import the CSS file
import Navbar from '../components/Navbar';
import UserFooter from '../../User_db/UserFooter';

const TermsAndConditions = () => {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(22);
    doc.text("Terms and Conditions", 20, 20);
    
    // Content
    const termsContent = [
      { title: "1. Eligibility Criteria", points: [
          "Must be a resident of the country.",
          "Age between 18 and 65 years.",
          "Valid identification required."
        ] 
      },
      { title: "2. Coverage Details", points: [
          "Coverage includes health, life, motor, and travel insurance.",
          "Specific limits apply to each type of insurance."
        ] 
      },
      { title: "3. Claim Process", points: [
          "Claims must be submitted within 30 days of the event.",
          "Required documents must be provided to process the claim."
        ] 
      },
      { title: "4. Exclusions", points: [
          "Claims related to pre-existing conditions are not covered.",
          "Certain activities may be excluded (e.g., extreme sports)."
        ] 
      },
      { title: "5. Premium Payment", points: [
          "Premiums must be paid on time to maintain coverage.",
          "Late payments may result in a lapse of coverage."
        ] 
      },
      { title: "6. Renewal Terms", points: [
          "Policies can be renewed annually.",
          "Renewal terms will be provided at the time of renewal."
        ] 
      },
      { title: "7. Contact Information", points: [
          "For questions, contact customer service at (123) 456-7890."
        ] 
      },
    ];

    let y = 30; // Initial y position for content

    termsContent.forEach(section => {
      doc.setFontSize(18);
      doc.text(section.title, 20, y);
      y += 10; // Space after title

      doc.setFontSize(12);
      section.points.forEach(point => {
        doc.text(`- ${point}`, 20, y);
        y += 8; // Space between points
      });
      y += 10; // Extra space after each section
    });

    doc.save("Terms_and_Conditions.pdf"); // Save the PDF with a filename
  };

  return (
    <>
    <Navbar/>
    <div className="terms-container">
      <h2>Terms and Conditions</h2>
      <div className="terms-section">
        <h3>1. Eligibility Criteria</h3>
        <ul>
          <li>Must be a resident of the country.</li>
          <li>Age between 18 and 65 years.</li>
          <li>Valid identification required.</li>
        </ul>
      </div>
      <div className="terms-section">
        <h3>2. Coverage Details</h3>
        <ul>
          <li>Coverage includes health, life, motor, and travel insurance.</li>
          <li>Specific limits apply to each type of insurance.</li>
        </ul>
      </div>
      <div className="terms-section">
        <h3>3. Claim Process</h3>
        <ul>
          <li>Claims must be submitted within 30 days of the event.</li>
          <li>Required documents must be provided to process the claim.</li>
        </ul>
      </div>
      <div className="terms-section">
        <h3>4. Exclusions</h3>
        <ul>
          <li>Claims related to pre-existing conditions are not covered.</li>
          <li>Certain activities may be excluded (e.g., extreme sports).</li>
        </ul>
      </div>
      <div className="terms-section">
        <h3>5. Premium Payment</h3>
        <ul>
          <li>Premiums must be paid on time to maintain coverage.</li>
          <li>Late payments may result in a lapse of coverage.</li>
        </ul>
      </div>
      <div className="terms-section">
        <h3>6. Renewal Terms</h3>
        <ul>
          <li>Policies can be renewed annually.</li>
          <li>Renewal terms will be provided at the time of renewal.</li>
        </ul>
      </div>
      <button onClick={handleExportPDF} className="export-button">Export PDF</button>
    </div>
    <UserFooter/>
    </>
  );
};

export default TermsAndConditions;
