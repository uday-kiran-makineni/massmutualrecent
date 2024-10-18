
import React from 'react';
import './Products.css'; // Optional CSS for styling
import Navbar from '../components/Navbar';
import UserFooter from '../../User_db/UserFooter';

// Reusable Card Component
const InsuranceCard = ({ title, points }) => {
  return (
    <div className="card">
      <h2 className='text'>{title}</h2>
      <ul>
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

// Main Dashboard Component
const Products = () => {
  return (
    <>
    <Navbar/>
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Insurance Agent Dashboard</h1>
        <p>Track, manage, and explore various insurance products below.</p>
      </header>

      <div className="card-grid">
        <InsuranceCard 
          title="Life Insurance" 
          points={[
            "Provides financial security to the family after the policyholder’s demise.",
            "Includes term insurance, whole life insurance, and endowment plans.",
            "Can serve as a savings tool with maturity benefits.",
            "Optional riders available for critical illness or accidental death coverage."
          ]}
        />
        <InsuranceCard 
          title="Health Insurance" 
          points={[
            "Covers hospitalization and medical expenses, reducing out-of-pocket costs.",
            "Cashless treatments available at network hospitals.",
            "Includes coverage for critical illnesses, surgeries, and pre-existing diseases.",
            "Policies available for individuals, families, and senior citizens.",
            "Some plans offer maternity benefits, outpatient cover, and wellness perks."
          ]}
        />
        <InsuranceCard 
          title="Travel Insurance" 
          points={[
            "Covers trip cancellations, delays, and interruptions.",
            "Provides emergency medical assistance while traveling abroad.",
            "Compensation for lost baggage or personal belongings.",
            "Available for single trips, multi-trips, and student travelers.",
            "Includes personal liability cover for accidents during trips."
          ]}
        />
        <InsuranceCard 
          title="Motor Insurance" 
          points={[
            "Protects vehicles from damages due to accidents, theft, or natural disasters.",
            "Covers third-party liability as mandated by law.",
            "Includes add-ons like zero depreciation, roadside assistance, and engine protection.",
            "Cashless repairs available at network garages.",
            "Applicable for private cars, two-wheelers, and commercial vehicles."
          ]}
        />
      </div>
    </div>
    <UserFooter/>
    </>
  );
};

export default Products;