import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PolicySection.module.css';
import CryptoJS from 'crypto-js';
import Navbar from '../components/Navbar';
import AdminFooter from '../components/AdminFooter';
import UserFooter from '../../User_db/UserFooter';

const secretKey = 'your-secret-key';

const EarningsSection = () => {
  const [activeTab, setActiveTab] = useState('commissions'); // State to track active tab
  const [healthPolicies, setHealthPolicies] = useState([]);
  const [lifePolicies, setLifePolicies] = useState([]);
  const [motorPolicies, setMotorPolicies] = useState([]);
  const [travelPolicies, setTravelPolicies] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [totalCommission, setTotalCommission] = useState(0);
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
            Authorization: 'Basic ' + btoa(`${username}:${decryptedPassword}`)
          }
        });
        return response.data;
      } catch (error) {
        setError(`Error fetching ${policyType} policies. Please try again later.`);
        return [];
      }
    };

    const fetchAllPolicies = async () => {
      setLoading(true);
      const [health, life, motor, travel] = await Promise.all([
        fetchPolicies('healthpolicies'),
        fetchPolicies('lifeinsurance'),
        fetchPolicies('motorinsurances'),
        fetchPolicies('travelinsurances')
      ]);
      setHealthPolicies(health);
      setLifePolicies(life);
      setMotorPolicies(motor);
      setTravelPolicies(travel);
      setLoading(false);
    };

    fetchAllPolicies();
  }, [userId]);

  useEffect(() => {
    if (!loading) {
      const commissionRate = 0.10;

      const calculateCommissions = (policies, policyType) => {
        return policies.map((policy) => {
          const commissionAmount = policy.premiumAmount * commissionRate;
          return {
            policyNumber: policy.policyNumber,
            policyType: policyType,
            premiumAmount: policy.premiumAmount,
            commissionAmount: commissionAmount
          };
        });
      };

      const allCommissions = [
        ...calculateCommissions(healthPolicies, 'Health'),
        ...calculateCommissions(lifePolicies, 'Life'),
        ...calculateCommissions(motorPolicies, 'Motor'),
        ...calculateCommissions(travelPolicies, 'Travel')
      ];

      setCommissions(allCommissions);

      const total = allCommissions.reduce((sum, policy) => sum + policy.commissionAmount, 0);
      setTotalCommission(total);

      allCommissions.forEach((commission, index) => {
        localStorage.setItem(`commission_${index}`, JSON.stringify(commission));
      });
    }
  }, [healthPolicies, lifePolicies, motorPolicies, travelPolicies, loading]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderIncentives = () => {
    // Sample data for incentives
    const sampleIncentives = [
      { id: 1, description: 'Performance Bonus', amount: 500 },
      { id: 2, description: 'Referral Bonus', amount: 300 },
      { id: 3, description: 'Annual Bonus', amount: 1000 },
    ];

    // Calculate total incentive
    const totalIncentive = sampleIncentives.reduce((sum, incentive) => sum + incentive.amount, 0);

    return (
      <>
        <table className={styles.incentiveTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {sampleIncentives.map(incentive => (
              <tr key={incentive.id}>
                <td>{incentive.id}</td>
                <td>{incentive.description}</td>
                <td>${incentive.amount}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="2" style={{ fontWeight: 'bold' }}>Total Incentive</td>
              <td style={{ fontWeight: 'bold' }}>${totalIncentive}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <>
      <Navbar />
      <section className={styles.policySection}>
        <h2 className={styles.totalPolicies}>Total Policies: {commissions.length}</h2>

        {/* Tab Navigation */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${activeTab === 'commissions' ? styles.active : ''}`}
            onClick={() => handleTabChange('commissions')}
          >
            Commissions
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'incentives' ? styles.active : ''}`}
            onClick={() => handleTabChange('incentives')}
          >
            Incentives
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'commissions' ? (
          <>
            <h3 className={styles.sectionTitle}>Commission Table</h3>
            {commissions.length > 0 ? (
              <table className={styles.commissionTable}>
                <thead>
                  <tr>
                    <th>Policy Number</th>
                    <th>Policy Type</th>
                    <th>Premium Amount</th>
                    <th>Commission Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {commissions.map((commission, index) => (
                    <tr key={index}>
                      <td>{commission.policyNumber}</td>
                      <td>{commission.policyType}</td>
                      <td>${commission.premiumAmount}</td>
                      <td>${commission.commissionAmount.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="3" style={{ fontWeight: 'bold' }}>Total Commission</td>
                    <td style={{ fontWeight: 'bold' }}>${totalCommission.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No commissions found.</p>
            )}
          </>
        ) : (
          <>
            <h3 className={styles.sectionTitle}>Incentive Table</h3>
            {renderIncentives()}
          </>
        )}
      </section>
      <UserFooter />
    </>
  );
};

export default EarningsSection;
