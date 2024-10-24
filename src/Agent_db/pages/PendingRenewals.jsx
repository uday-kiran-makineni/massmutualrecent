import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PolicySection.module.css';
import CryptoJS from 'crypto-js';
import Navbar from '../components/Navbar';
import AdminFooter from '../components/AdminFooter';
import UserFooter from '../../User_db/UserFooter';


const secretKey = 'your-secret-key';

const InactiveExpiredPolicies = () => {
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
            'Authorization': 'Basic ' + btoa(`${username}:${decryptedPassword}`)
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

      // Filter only inactive or expired policies
      const filterInactiveOrExpired = (policies) => {
        return policies.filter(policy => 
          policy.policyStatus.toLowerCase() === 'inactive' || 
          policy.policyStatus.toLowerCase() === 'expired'
        );
      };

      setHealthPolicies(filterInactiveOrExpired(health));
      setLifePolicies(filterInactiveOrExpired(life));
      setMotorPolicies(filterInactiveOrExpired(motor));
      setTravelPolicies(filterInactiveOrExpired(travel));
      setLoading(false); // Stop loading
    };

    fetchAllPolicies();
  }, [userId]);

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
    <>
      <Navbar/>
      <section className={styles.policySection}>
        <h2 className={styles.totalPolicies}>Total Inactive/Expired Policies: {total}</h2>

        <h3 className={styles.sectionTitle}>Your Inactive/Expired Health Policies</h3>
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
                <span>Status: {policy.policyStatus}</span>
              </div>
              <div className={styles.policyActions}>
                <button className={styles.actionBtn}>Update</button>
                <button className={styles.actionBtn}>Claim</button>
              </div>
            </div>
          ))
        ) : (
          <p>No inactive or expired health policies found.</p>
        )}

        <h3 className={styles.sectionTitle}>Your Inactive/Expired Life Insurance Policies</h3>
        {lifePolicies.length > 0 ? (
          lifePolicies.map(policy => (
            <div className={styles.policyCard} key={policy.policyNumber}>
              <div className={styles.policyInfo}>
                <span>Policy Number: {policy.policyNumber}</span>
                <span>Policy Name: Life Insurance</span>
                <span>Premium Amount: ${policy.premiumAmount}</span>
                <span>Coverage Amount: ${policy.coverageAmount}</span>
                <span>Beneficiary: {policy.beneficiaryDetails}</span>
                <span>Status: {policy.policyStatus}</span>
              </div>
              <div className={styles.policyActions}>
                <button className={styles.actionBtn}>Update</button>
                <button className={styles.actionBtn}>Claim</button>
              </div>
            </div>
          ))
        ) : (
          <p>No inactive or expired life insurance policies found.</p>
        )}

        <h3 className={styles.sectionTitle}>Your Inactive/Expired Motor Insurance Policies</h3>
        {motorPolicies.length > 0 ? (
          motorPolicies.map(policy => (
            <div className={styles.policyCard} key={policy.policyNumber}>
              <div className={styles.policyInfo}>
                <span>Policy Number: {policy.policyNumber}</span>
                <span>Policy Name: Motor Insurance</span>
                <span>Premium Amount: ${policy.premiumAmount}</span>
                <span>Coverage Amount: ${policy.coverageAmount}</span>
                <span>Vehicle: {policy.vehicleMake} {policy.vehicleModel}</span>
                <span>Status: {policy.policyStatus}</span>
              </div>
              <div className={styles.policyActions}>
                <button className={styles.actionBtn}>Update</button>
                <button className={styles.actionBtn}>Claim</button>
              </div>
            </div>
          ))
        ) : (
          <p>No inactive or expired motor insurance policies found.</p>
        )}

        <h3 className={styles.sectionTitle}>Your Inactive/Expired Travel Insurance Policies</h3>
        {travelPolicies.length > 0 ? (
          travelPolicies.map(policy => (
            <div className={styles.policyCard} key={policy.policyNumber}>
              <div className={styles.policyInfo}>
                <span>Policy Number: {policy.policyNumber}</span>
                <span>Policy Name: Travel Insurance</span>
                <span>Premium Amount: ${policy.premiumAmount}</span>
                <span>Coverage Amount: ${policy.coverageAmount}</span>
                <span>Status: {policy.policyStatus}</span>
              </div>
              <div className={styles.policyActions}>
                <button className={styles.actionBtn}>Update</button>
                <button className={styles.actionBtn}>Claim</button>
              </div>
            </div>
          ))
        ) : (
          <p>No inactive or expired travel insurance policies found.</p>
        )}
      </section>
      <UserFooter/>
    </>
  );
};

export default InactiveExpiredPolicies;
