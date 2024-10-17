import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PolicySection.module.css';

const PolicySection = () => {
  const [healthPolicies, setHealthPolicies] = useState([]);
  const [lifePolicies, setLifePolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId') || 8; // Assuming userId = 8

  useEffect(() => {
    const fetchHealthPolicies = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/healthpolicies/user/${userId}`, {
          headers: {
            'Authorization': 'Basic ' + btoa('user:user') // Replace with your auth credentials
          }
        });
        setHealthPolicies(response.data); // Save health policies in state
      } catch (error) {
        setError('Error fetching health policies. Please try again later.');
      }
    };

    const fetchLifePolicies = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/lifeinsurance/user/${userId}`, {
          headers: {
            'Authorization': 'Basic ' + btoa('user:user') // Replace with your auth credentials
          }
        });
        setLifePolicies(response.data); // Save life policies in state
      } catch (error) {
        setError('Error fetching life insurance policies. Please try again later.');
      } finally {
        setLoading(false); // Stop loading after both requests
      }
    };

    fetchHealthPolicies();
    fetchLifePolicies();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <section className={styles.policySection}>
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

      {/* Add Life Insurance Policies Section */}
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
    </section>
  );
};

export default PolicySection;
