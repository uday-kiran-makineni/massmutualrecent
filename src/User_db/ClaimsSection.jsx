import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ClaimsSection.module.css';

const ClaimsSection = () => {
  const [claims, setClaims] = useState([]); // State to hold claims data
  const [error, setError] = useState(null); // State to hold error messages

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/claims'); // Adjust the URL if needed
        setClaims(response.data); // Set claims data to state
      } catch (err) {
        console.error('Error fetching claims:', err);
        setError('Failed to load claims.'); // Set error message if fetching fails
      }
    };

    fetchClaims(); // Call the fetch function
  }, []); // Empty dependency array to run once on component mount

  return (
    <section className={styles.claimsSection}>
      <h3 className={styles.sectionTitle}>Recent Claims</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}

      {/* Dynamically render claim cards */}
      {claims.length > 0 ? (
        claims.map((claim) => (
          <div key={claim.id} className={styles.claimCard}>
            <div className={styles.claimDetails}>
              <span>Claim ID: {claim.id}</span>
              <br />
              <span>Status: {claim.status}</span>
              <br />
              <span>Date Filed: {claim.dateFiled}</span>
              <br />
            </div>
          </div>
        ))
      ) : (
        <p>No claims found.</p> // Message if no claims are available
      )}

      <button className={styles.claimButton}>File a Claim</button>
    </section>
  );
};

export default ClaimsSection;
