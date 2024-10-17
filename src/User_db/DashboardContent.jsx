import React from 'react';
import styles from './DashboardContent.module.css';

const DashboardContent = React.forwardRef((props, ref) => {
  // Retrieve the username from local storage
  const username = localStorage.getItem('username') || 'User'; // Default to 'User' if not found

  return (
      <div ref={ref} className={styles.dashboardContent}>
          <div className={styles.greeting}>
              <h2>Welcome back, {username}!</h2> {/* Use the retrieved username */}
          </div>
          <div className={styles.overview}>
              <span>Total Policies: 5</span>
              <span>Total Claims: 2</span>
              <span>Upcoming Payments: 1</span>
          </div>
      </div>
  );
});

export default DashboardContent;
