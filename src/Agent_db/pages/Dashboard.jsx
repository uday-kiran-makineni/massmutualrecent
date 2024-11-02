import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AdminFooter from '../components/AdminFooter';
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import AgentFooter from './AgentFooter';

const dashboardItems = [
  { name: 'My policies', icon: '📜', route: '/Policies' }, 
  // { name: 'My Business', icon: '💰' , route: '/business' },
  { name: 'Claims', icon: '📋', route: '/claim' },
  { name: 'Proposal', icon: '📑' ,route: '/download-forms'},
  { name: 'Pending Renewals', icon: '🔄', route: '/expired-policies-page' },
  { name: 'Contests', icon: '🏆' , route: '/contests-page'},
  { name: 'Earnings', icon: '💵', route: '/earnings-page' },
  { name: 'Locate', icon: '📍', route: '/locate' },
  { name: 'Clubs', icon: '🤝', route: '/clubs' },
  { name: 'Acknowledgement', icon: '✅', route: '/acknowledgement' },
  { name: 'Payment Link', icon: '🔗', route: '/payment-page' },
  { name: 'Product 360', icon: '🌟', route: '/products' },
  { name: 'My Customers', icon: '👥' , route: '/customers'}
];

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook

  // Retrieve the username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || 'Guest'); // Set 'Guest' as a fallback
  }, []);

  const handleItemClick = (route) => {
    if (route) {
      navigate(route); // Navigate to the specified route
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-header">
        <h2 className='agentdashboardheading'> Welcome back, {username} </h2>
        <div className="policy-buttons">
          <button 
            className="btn create-btn" 
            onClick={() => navigate('/add-policy')} // Navigate to AddPolicy when clicked
        >
            Create Policy
          </button>
          <button className="btn update-btn"  onClick={() => navigate('/update-policy')}>Update Policy</button>
          <button className="btn delete-btn"  onClick={() => navigate('/delete-policy')}>Delete Policy</button>
        </div>
      </div>
      <h2 className='agentdashboardheading alignment'> Here are your quick links </h2>
      <div className="dashboard">
        {dashboardItems.map((item, index) => (
          <div 
            key={index} 
            className="dashboard-item" 
            onClick={() => handleItemClick(item.route)} // Add onClick to each item
          >
            <div className="icon">{item.icon}</div>
            <div className="label">{item.name}</div>
          </div>
        ))}
      </div>
      <AgentFooter/>
    </>
  );
};

export default Dashboard;
