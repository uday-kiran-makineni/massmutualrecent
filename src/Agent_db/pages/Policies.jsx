import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PolicySection.module.css';
import CryptoJS from 'crypto-js';


const secretKey = 'your-secret-key';

const PolicySection = () => {
  const [healthPolicies, setHealthPolicies] = useState([]);
  const [lifePolicies, setLifePolicies] = useState([]);
  const [motorPolicies, setMotorPolicies] = useState([]);
  const [travelPolicies, setTravelPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username'); 
  const password = localStorage.getItem('password'); 
  

  const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  
  const decryptedPassword = decryptData(password);

  useEffect(() => {
    const fetchPolicies = async (policyType) => {
      try {
        const response = await axios.get(`http://localhost:8081/api/${policyType}/agent/${userId}`, {
          headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${decryptedPassword}`) // Using credentials from local storage
          }
        });
        return response.data; // Return fetched data
      } catch (error) {
        setError(`Error fetching ${policyType} policies. Please try again later.`);
        return []; // Return an empty array on error
      }
    };

    const fetchAllPolicies = async () => {
      setLoading(true); // Start loading
      const [health, life, motor, travel] = await Promise.all([
        fetchPolicies('healthpolicies'),
        fetchPolicies('lifeinsurance'),
        fetchPolicies('motorinsurances'),
        fetchPolicies('travelinsurances'),
      ]);
      setHealthPolicies(health);
      setLifePolicies(life);
      setMotorPolicies(motor);
      setTravelPolicies(travel);
      setLoading(false); // Stop loading
    };

    fetchAllPolicies();
  }, [userId]);

  useEffect(() => {
    if (!loading) {
      // Calculate total number of policies and total premium amounts for each category
      const totalHealthPolicies = healthPolicies.length;
      const totalLifePolicies = lifePolicies.length;
      const totalMotorPolicies = motorPolicies.length;
      const totalTravelPolicies = travelPolicies.length;

      const totalHealthPremium = healthPolicies.reduce((sum, policy) => sum + policy.premiumAmount, 0);
      const totalLifePremium = lifePolicies.reduce((sum, policy) => sum + policy.premiumAmount, 0);
      const totalMotorPremium = motorPolicies.reduce((sum, policy) => sum + policy.premiumAmount, 0);
      const totalTravelPremium = travelPolicies.reduce((sum, policy) => sum + policy.premiumAmount, 0);

      // Store totals in local storage
      localStorage.setItem('totalHealthPolicies', totalHealthPolicies);
      localStorage.setItem('totalHealthPremium', totalHealthPremium);
      localStorage.setItem('totalLifePolicies', totalLifePolicies);
      localStorage.setItem('totalLifePremium', totalLifePremium);
      localStorage.setItem('totalMotorPolicies', totalMotorPolicies);
      localStorage.setItem('totalMotorPremium', totalMotorPremium);
      localStorage.setItem('totalTravelPolicies', totalTravelPolicies);
      localStorage.setItem('totalTravelPremium', totalTravelPremium);
    }
  }, [healthPolicies, lifePolicies, motorPolicies, travelPolicies, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  // Calculate total number of policies for display
  const totalHealthPolicies = healthPolicies.length;
  const totalLifePolicies = lifePolicies.length;
  const totalMotorPolicies = motorPolicies.length;
  const totalTravelPolicies = travelPolicies.length;
  const total = totalHealthPolicies + totalLifePolicies + totalMotorPolicies + totalTravelPolicies;

  return (
    <section className={styles.policySection}>
      <h2 className={styles.totalPolicies}>Total Policies: {total}</h2>

      <h3 className={styles.sectionTitle}>Your Health Policies</h3>
      {healthPolicies.length > 0 ? (
        healthPolicies.map(policy => (
          <div className={styles.policyCard} key={policy.policyNumber}>
            <div className={styles.policyInfo}>
              <span>Policy Number: {policy.policyNumber}</span>
              <span>Policy Name: Health Insurance</span>
              <span>Premium Amount: ${policy.premiumAmount}</span>
              <span>Coverage Amount: ${policy.coverageAmount}</span>
              <span>Next Payment Due: {policy.endDate}</span>
              <span>Claim Limit: ${policy.claimLimit}</span>
            </div>
            <div className={styles.policyActions}>
              <button className={styles.actionBtn}>View</button>
              <button className={styles.actionBtn}>Renew</button>
              <button className={styles.actionBtn}>Claim</button>
            </div>
          </div>
        ))
      ) : (
        <p>No health policies found.</p>
      )}

      <h3 className={styles.sectionTitle}>Your Life Insurance Policies</h3>
      {lifePolicies.length > 0 ? (
        lifePolicies.map(policy => (
          <div className={styles.policyCard} key={policy.policyNumber}>
            <div className={styles.policyInfo}>
              <span>Policy Number: {policy.policyNumber}</span>
              <span>Policy Name: Life Insurance</span>
              <span>Premium Amount: ${policy.premiumAmount}</span>
              <span>Coverage Amount: ${policy.coverageAmount}</span>
              <span>Beneficiary: {policy.beneficiaryDetails}</span>
              <span>Policy Status: {policy.policyStatus}</span>
              <span>Sum Assured: ${policy.sumAssured}</span>
              <span>Risk Cover: {policy.riskCoverDetails}</span>
              <span>Terms & Conditions: {policy.termsAndConditions}</span>
            </div>
            <div className={styles.policyActions}>
              <button className={styles.actionBtn}>View</button>
              <button className={styles.actionBtn}>Renew</button>
              <button className={styles.actionBtn}>Claim</button>
            </div>
          </div>
        ))
      ) : (
        <p>No life insurance policies found.</p>
      )}

      <h3 className={styles.sectionTitle}>Your Motor Insurance Policies</h3>
      {motorPolicies.length > 0 ? (
        motorPolicies.map(policy => (
          <div className={styles.policyCard} key={policy.policyNumber}>
            <div className={styles.policyInfo}>
              <span>Policy Number: {policy.policyNumber}</span>
              <span>Policy Name: Motor Insurance</span>
              <span>Premium Amount: ${policy.premiumAmount}</span>
              <span>Coverage Amount: ${policy.coverageAmount}</span>
              <span>Vehicle: {policy.vehicleMake} {policy.vehicleModel}</span>
              <span>Registration Number: {policy.vehicleRegistrationNumber}</span>
              <span>Beneficiary: {policy.beneficiaryDetails}</span>
              <span>Policy Status: {policy.policyStatus}</span>
              <span>Coverage Details: {policy.coverageDetails}</span>
              <span>Terms & Conditions: {policy.termsAndConditions}</span>
            </div>
            <div className={styles.policyActions}>
              <button className={styles.actionBtn}>View</button>
              <button className={styles.actionBtn}>Renew</button>
              <button className={styles.actionBtn}>Claim</button>
            </div>
          </div>
        ))
      ) : (
        <p>No motor insurance policies found.</p>
      )}

      <h3 className={styles.sectionTitle}>Your Travel Insurance Policies</h3>
      {travelPolicies.length > 0 ? (
        travelPolicies.map(policy => (
          <div className={styles.policyCard} key={policy.policyNumber}>
            <div className={styles.policyInfo}>
              <span>Policy Number: {policy.policyNumber}</span>
              <span>Policy Name: Travel Insurance</span>
              <span>Premium Amount: ${policy.premiumAmount}</span>
              <span>Coverage Amount: ${policy.coverageAmount}</span>
              <span>Start Date: {policy.startDate}</span>
              <span>End Date: {policy.endDate}</span>
              <span>Policy Status: {policy.policyStatus}</span>
              <span>Terms & Conditions: {policy.termsAndConditions}</span>
            </div>
            <div className={styles.policyActions}>
              <button className={styles.actionBtn}>View</button>
              <button className={styles.actionBtn}>Renew</button>
              <button className={styles.actionBtn}>Claim</button>
            </div>
          </div>
        ))
      ) : (
        <p>No travel insurance policies found.</p>
      )}
    </section>
  );
};

export default PolicySection;
