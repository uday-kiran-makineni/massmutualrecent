import { useState, useEffect } from 'react';
import styles from './ContestsSection.module.css';

const ContestsSection = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [contests, setContests] = useState([]);
  const [agentProgress, setAgentProgress] = useState({
    totalHealthPremium: 0,
    totalLifePremium: 0,
    totalMotorPremium: 0,
    totalTravelPremium: 0,
  });

  // Fetching agent progress from localStorage
  useEffect(() => {
    const totalHealthPremium = localStorage.getItem('totalHealthPremium') || 0;
    const totalLifePremium = localStorage.getItem('totalLifePremium') || 0;
    const totalMotorPremium = localStorage.getItem('totalMotorPremium') || 0;
    const totalTravelPremium = localStorage.getItem('totalTravelPremium') || 0;

    setAgentProgress({
      totalHealthPremium: Number(totalHealthPremium),
      totalLifePremium: Number(totalLifePremium),
      totalMotorPremium: Number(totalMotorPremium),
      totalTravelPremium: Number(totalTravelPremium),
    });
  }, []);

  // Simulating the fetch of contests from an API
  useEffect(() => {
    const fetchContests = async () => {
      const data = [
        // Ongoing Contests
        {
          id: 1,
          name: 'Health Insurance Contest',
          policyType: 'Health',
          requiredPremium: 20000,
          perks: [
            'Bonus Commission up to 5% for the top agents',
            'Health Insurance Voucher worth ₹10,000',
            'Exclusive invitation to the Annual Health Agents Gala'
          ],
          startDate: '2024-10-01',
          endDate: '2024-11-30',
          status: 'ongoing',
        },
        {
          id: 2,
          name: 'Life Insurance Contest',
          policyType: 'Life',
          requiredPremium: 100000,
          perks: [
            'Luxury Watch worth ₹50,000 for top achievers',
            'Paid Holiday to any destination within India',
            'Priority Membership to the Executive Club'
          ],
          startDate: '2024-09-15',
          endDate: '2024-12-31',
          status: 'ongoing',
        },
        // Upcoming Contests
        {
          id: 3,
          name: 'Motor Insurance Contest',
          policyType: 'Motor',
          requiredPremium: 5000,
          perks: [
            'Free Car Service at select locations',
            'Fuel Vouchers worth ₹5,000',
            'Exclusive access to Motor Insurance Agents Community'
          ],
          startDate: '2024-11-01',
          endDate: '2024-12-15',
          status: 'upcoming',
        },
        {
          id: 4,
          name: 'Travel Insurance Contest',
          policyType: 'Travel',
          requiredPremium: 5000,
          perks: [
            'Flight Vouchers worth ₹20,000',
            'Hotel Discount Coupons for top performers',
            'Invitation to the Luxury Travel Expo'
          ],
          startDate: '2024-12-01',
          endDate: '2025-01-31',
          status: 'upcoming',
        },
      ];
      setContests(data);
    };
    fetchContests();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const calculateShortfall = (contest) => {
    let achievedPremium = 0;

    switch (contest.policyType) {
      case 'Health':
        achievedPremium = agentProgress.totalHealthPremium;
        break;
      case 'Life':
        achievedPremium = agentProgress.totalLifePremium;
        break;
      case 'Motor':
        achievedPremium = agentProgress.totalMotorPremium;
        break;
      case 'Travel':
        achievedPremium = agentProgress.totalTravelPremium;
        break;
      default:
        achievedPremium = 0;
    }

    const premiumShortfall = Math.max(0, contest.requiredPremium - achievedPremium);
    const isEligible = premiumShortfall === 0;

    return { premiumShortfall, isEligible, achievedPremium };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Format as dd/mm/yyyy
  };

  const renderContests = (status) => {
    return contests
      .filter((contest) => contest.status === status)
      .map((contest) => {
        const { premiumShortfall, isEligible, achievedPremium } = calculateShortfall(contest);

        return (
          <div key={contest.id} className={styles.contestCard}>
            <div className={styles.contestHeader}>
              <h3>{contest.name}</h3>
              <p><strong>Start Date:</strong> {formatDate(contest.startDate)}</p>
              <p><strong>End Date:</strong> {formatDate(contest.endDate)}</p>
            </div>
            <div className={styles.contestContent}>
              <p><strong>Required Premium:</strong> {contest.requiredPremium.toLocaleString()}</p>

              {/* Only show achieved premium and shortfall for ongoing contests */}
              {status === 'ongoing' && (
                <>
                  <p><strong>Your Achieved Premium:</strong> {achievedPremium.toLocaleString()}</p>
                  {isEligible ? (
                    <p><strong>Congratulations!</strong> You are eligible for all perks!</p>
                  ) : (
                    <p><strong>Shortfall in Premium:</strong> {premiumShortfall.toLocaleString()}</p>
                  )}
                </>
              )}

              <h4>Perks:</h4>
              <ul>
                {contest.perks.map((perk, index) => (
                  <li key={index}>{perk}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      });
  };

  return (
    <div className={styles.contestsSection}>
      <h2 className={styles.contestsTitle}>Company Contests</h2>

      {/* Tab Navigation */}
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${activeTab === 'ongoing' ? styles.tabButtonActive : ''}`}
          onClick={() => handleTabChange('ongoing')}
        >
          Ongoing Contests
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'upcoming' ? styles.tabButtonActive : ''}`}
          onClick={() => handleTabChange('upcoming')}
        >
          Upcoming Contests
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'ongoing' ? (
        <div className={styles.contestList}>
          {renderContests('ongoing')}
        </div>
      ) : (
        <div className={styles.contestList}>
          {renderContests('upcoming')}
        </div>
      )}
    </div>
  );
};

export default ContestsSection;
