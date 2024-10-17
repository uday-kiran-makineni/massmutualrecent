import React from 'react';
import styles from './DashboardContent.module.css';

const DashboardContent = React.forwardRef((props, ref) => {
  // Retrieve the username from local storage
  const username = localStorage.getItem('username') || 'User'; // Default to 'User' if not found

  return (
      <div ref={ref} className={styles.dashboardContent}>
          <div className={styles.greeting}>
              <h2>Welcome back, {username}!</h2> {/* Use the retrieved username */}

              {/* Buttons for Create, Update, and Delete */}
              <div className={styles.buttonGroup}>
                  <button className={`${styles.policyButton} ${styles.createButton}`}>Create Policy</button>
                  <button className={`${styles.policyButton} ${styles.updateButton}`}>Update Policy</button>
                  <button className={`${styles.policyButton} ${styles.deleteButton}`}>Delete Policy</button>
              </div>
          </div>
      </div>
  );
});

export default DashboardContent;
