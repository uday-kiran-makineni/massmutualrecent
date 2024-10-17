// src/pages/Dashboard.jsx

import { useNavigate } from 'react-router-dom';
import styles from '../styles/Dashboard.module.css'; // Import CSS Module
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate(); // Hook for navigation

  const dashboardData = [
    { title: "Total Registered Users", count: 250, route: "/users", icon: "fa-user", description: "View all registered users." },
    { title: "Listed Policies", count: 150, route: "/policies", icon: "fa-file-alt", description: "Browse available insurance policies." },
    { title: "Policy Categories", count: 20, route: "/categories", icon: "fa-list", description: "Explore policy categories." },
    { title: "Sub-Categories", count: 40, route: "/subcategories", icon: "fa-tags", description: "Detailed view of policy sub-categories." },
    { title: "Total Policies Sold", count: 500, route: "/all-policies", icon: "fa-briefcase", description: "Check all sold policies." },
    { title: "Approved Policy Holders", count: 450, route: "/approved-policy-holders", icon: "fa-thumbs-up", description: "List of approved policyholders." },
    { title: "Pending Approvals", count: 30, route: "/pending-approval", icon: "fa-clock", description: "Policies waiting for approval." },
    { title: "Disapproved Policy Holders", count: 20, route: "/disapproved-policy-holders", icon: "fa-thumbs-down", description: "Check disapproved policyholders." },
  ];

  return (
    <><Navbar />
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1>Welcome to MassMutual Insurance</h1>
        <p>Happy to have You!!!</p>
      </header>
      <div className={styles.dashboardGrid}>
        {dashboardData.map((item, index) => (
          <div 
            key={index} 
            className={styles.dashboardCard} 
            onClick={() => navigate(item.route)} // Navigate to the route
          >
            <div className={styles.icon}>
              <i className={`fa ${item.icon}`} aria-hidden="true"></i>
            </div>
            <div className={styles.cardContent}>
              <h2>{item.count}</h2>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Dashboard;
