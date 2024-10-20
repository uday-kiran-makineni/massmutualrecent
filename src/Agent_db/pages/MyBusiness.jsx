import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import './MyBusiness.css'; // Ensure you have this CSS for styling
import Navbar from '../components/Navbar';
import UserFooter from '../../User_db/UserFooter';

const MyBusiness = () => {
  const policiesChartRef = useRef(null); // Create a ref for policies chart
  const premiumsChartRef = useRef(null); // Create a ref for premiums chart
  const [data, setData] = useState({
    totalHealthPolicies: 0,
    totalHealthPremium: 0,
    totalLifePolicies: 0,
    totalLifePremium: 0,
    totalTravelPolicies: 0,
    totalTravelPremium: 0,
    totalMotorPolicies: 0,
    totalMotorPremium: 0
  });

  useEffect(() => {
    // Fetch data from localStorage and update the state
    const fetchData = {
      totalHealthPolicies: parseInt(localStorage.getItem('totalHealthPolicies')) || 0,
      totalHealthPremium: parseFloat(localStorage.getItem('totalHealthPremium')) || 0,
      totalLifePolicies: parseInt(localStorage.getItem('totalLifePolicies')) || 0,
      totalLifePremium: parseFloat(localStorage.getItem('totalLifePremium')) || 0,
      totalTravelPolicies: parseInt(localStorage.getItem('totalTravelPolicies')) || 0,
      totalTravelPremium: parseFloat(localStorage.getItem('totalTravelPremium')) || 0,
      totalMotorPolicies: parseInt(localStorage.getItem('totalMotorPolicies')) || 0,
      totalMotorPremium: parseFloat(localStorage.getItem('totalMotorPremium')) || 0,
    };

    setData(fetchData);
  }, []);

  useEffect(() => {
    let policiesChartInstance;
    let premiumsChartInstance;

    if (policiesChartRef.current) {
      const ctxPolicies = policiesChartRef.current.getContext('2d');

      // Destroy the chart if it exists to avoid duplication
      if (policiesChartInstance) {
        policiesChartInstance.destroy();
      }

      policiesChartInstance = new Chart(ctxPolicies, {
        type: 'bar',
        data: {
          labels: ['Health', 'Life', 'Travel', 'Motor'],
          datasets: [{
            label: 'Total Policies',
            data: [
              data.totalHealthPolicies,
              data.totalLifePolicies,
              data.totalTravelPolicies,
              data.totalMotorPolicies
            ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    if (premiumsChartRef.current) {
      const ctxPremiums = premiumsChartRef.current.getContext('2d');

      // Destroy the chart if it exists to avoid duplication
      if (premiumsChartInstance) {
        premiumsChartInstance.destroy();
      }

      premiumsChartInstance = new Chart(ctxPremiums, {
        type: 'bar',
        data: {
          labels: ['Health', 'Life', 'Travel', 'Motor'],
          datasets: [{
            label: 'Total Premiums',
            data: [
              data.totalHealthPremium,
              data.totalLifePremium,
              data.totalTravelPremium,
              data.totalMotorPremium
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    // Cleanup to prevent the 'Canvas is already in use' error
    return () => {
      if (policiesChartInstance) {
        policiesChartInstance.destroy();
      }
      if (premiumsChartInstance) {
        premiumsChartInstance.destroy();
      }
    };
  }, [data]);

  return (
    <>
    <Navbar/>
    <div className="business-dashboard">
        <div className='hralign'>
            <div className="card">
                <h3>Health Insurance</h3>
                <p>Total Policies: {data.totalHealthPolicies}</p>
                <p>Total Premiums: {data.totalHealthPremium}</p>
            </div>

            <div className="card">
                <h3>Life Insurance</h3>
                <p>Total Policies: {data.totalLifePolicies}</p>
                <p>Total Premiums: {data.totalLifePremium}</p>
            </div>
        </div>
        <div className='hralign'>
        <div className="card">
        <h3>Travel Insurance</h3>
        <p>Total Policies: {data.totalTravelPolicies}</p>
        <p>Total Premiums: {data.totalTravelPremium}</p>
      </div>

      <div className="card">
        <h3>Motor Insurance</h3>
        <p>Total Policies: {data.totalMotorPolicies}</p>
        <p>Total Premiums: {data.totalMotorPremium}</p>
      </div>
        </div>

      {/* Adding the Chart for Policies */}
      <div className="chart-container">
        <h3>Total Policies Chart</h3>
        <canvas id="policiesChart" ref={policiesChartRef} width="400" height="200"></canvas>
      </div>

      {/* Adding the Chart for Premiums */}
      <div className="chart-container">
        <h3>Total Premiums Chart</h3>
        <canvas id="premiumsChart" ref={premiumsChartRef} width="400" height="200"></canvas>
      </div>
    </div>
    <UserFooter/>
    </>
  );
};

export default MyBusiness;
