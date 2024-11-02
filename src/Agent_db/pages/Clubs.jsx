import { useState, useEffect } from 'react';
import styles from './AgentClubDashboard.module.css';
import Navbar from '../components/Navbar';
import AgentFooter from './AgentFooter'

// Define club levels, thresholds, and benefits
const clubLevels = [
  {
    name: 'Branch Manager Club',
    threshold: 10000,
    perks: [
      'Basic Support',
      'Discounts on Services',
      'Certificate of Achievement',
      'Local Team Building Events',
    ],
  },
  {
    name: 'Zonal Manager Club',
    threshold: 25000,
    perks: [
      'Priority Support',
      'Access to Exclusive Events',
      'National Travel Incentives',
      'Enhanced Performance Bonuses',
    ],
  },
  {
    name: 'Executive Director Club',
    threshold: 50000,
    perks: [
      'VIP Support',
      'Invites to Annual Gala',
      'National Travel Incentives',
      'Family Health Coverage',
      'Stock Options Eligibility',
    ],
  },
  {
    name: 'Vice President Club',
    threshold: 100000,
    perks: [
      'Dedicated Account Manager',
      'Annual Retreat',
      'International Business Trips',
      'Luxury Accommodation Stays',
      'Company Car Allowance',
    ],
  },
  {
    name: 'President Club',
    threshold: 200000,
    perks: [
      'Lifetime Membership',
      'Luxury Benefits Package',
      'All-expenses-paid International Trips',
      'Personalized Recognition Awards',
      'Exclusive Health and Wellness Benefits',
    ],
  },
];

const AgentClubDashboard = () => {
  const [totalPremium, setTotalPremium] = useState(0);
  const [agentClub, setAgentClub] = useState(null);
  const [nextClubShortfall, setNextClubShortfall] = useState(null);

  useEffect(() => {
    // Retrieve individual premiums from localStorage and calculate total
    const healthPremium = parseFloat(localStorage.getItem('totalHealthPremium')) || 0;
    const lifePremium = parseFloat(localStorage.getItem('totalLifePremium')) || 0;
    const motorPremium = parseFloat(localStorage.getItem('totalMotorPremium')) || 0;
    const travelPremium = parseFloat(localStorage.getItem('totalTravelPremium')) || 0;

    const calculatedTotalPremium = healthPremium + lifePremium + motorPremium + travelPremium;
    setTotalPremium(calculatedTotalPremium);

    // Determine the current club level
    const currentClub = clubLevels.find(club => calculatedTotalPremium >= club.threshold);
    setAgentClub(currentClub);

    // Calculate shortfall to the next club
    const nextClub = clubLevels.find(club => club.threshold > calculatedTotalPremium);
    if (nextClub) {
      setNextClubShortfall(nextClub.threshold - calculatedTotalPremium);
    } else {
      setNextClubShortfall(null); // Top club achieved
    }
  }, []);

  return (
    <>
      <Navbar />
      <section className={styles.clubDashboard}>
        <h2 className={styles.dashboardTitle}>Agent Club Dashboard</h2>
        <p className={styles.totalPremium}>Total Premium: ${totalPremium.toLocaleString()}</p>
        <div className={styles.clubList}>
          {clubLevels.map((club, index) => {
            const achieved = totalPremium >= club.threshold;
            return (
              <div
                key={index}
                className={`${styles.clubCard} ${achieved ? styles.achieved : styles.notAchieved}`}
              >
                <h3 className={styles.clubName}>{club.name}</h3>
                <p className={styles.threshold}>Target: ${club.threshold.toLocaleString()}</p>
                <p className={styles.benefitsTitle}>Benefits:</p>
                <ul className={styles.perksList}>
                  {club.perks.map((perk, idx) => (
                    <li key={idx}>{perk}</li>
                  ))}
                </ul>
                {achieved ? (
                  <div className={styles.statusAchieved}>Achieved</div>
                ) : (
                  <div className={styles.shortfall}>
                    Shortfall to reach: ${(club.threshold - totalPremium).toLocaleString()}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {agentClub && (
          <div className={styles.currentClub}>
            <h3>Current Club: {agentClub.name}</h3>
            {nextClubShortfall !== null ? (
              <p>Shortfall to next club: ${nextClubShortfall.toLocaleString()}</p>
            ) : (
              <p>Congratulations! You've reached the top club.</p>
            )}
          </div>
        )}
      </section>
      <AgentFooter />
    </>
  );
};

export default AgentClubDashboard;
