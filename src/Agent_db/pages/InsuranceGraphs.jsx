import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import styles from './InsuranceGraphs.module.css';

const InsuranceGraphs = () => {

  // Retrieve data from local storage, default to 0 if null
  const totalHealthPolicies = JSON.parse(localStorage.getItem('totalHealthPolicies')) || 0;
  const totalLifePolicies = JSON.parse(localStorage.getItem('totalLifePolicies')) || 0;
  const totalMotorPolicies = JSON.parse(localStorage.getItem('totalMotorPolicies')) || 0;
  const totalTravelPolicies = JSON.parse(localStorage.getItem('totalTravelPolicies')) || 0;

  const totalHealthPremium = JSON.parse(localStorage.getItem('totalHealthPremium')) || 0;
  const totalLifePremium = JSON.parse(localStorage.getItem('totalLifePremium')) || 0;
  const totalMotorPremium = JSON.parse(localStorage.getItem('totalMotorPremium')) || 0;
  const totalTravelPremium = JSON.parse(localStorage.getItem('totalTravelPremium')) || 0;

  // Data for Pie Chart (Policy Types Distribution)
  const policyData = [
    { name: 'Health', value: totalHealthPolicies },
    { name: 'Motor', value: totalMotorPolicies },
    { name: 'Life', value: totalLifePolicies },
    { name: 'Travel', value: totalTravelPolicies },
  ];

  // Data for Bar Chart (Premiums by Policy Type)
  const premiumData = [
    { name: 'Health', premium: totalHealthPremium },
    { name: 'Motor', premium: totalMotorPremium },
    { name: 'Life', premium: totalLifePremium },
    { name: 'Travel', premium: totalTravelPremium },
  ];

  // Data for Radar Chart (Comparing Policies and Premiums)
  const radarData = [
    { type: 'Health', policies: totalHealthPolicies, premium: totalHealthPremium },
    { type: 'Motor', policies: totalMotorPolicies, premium: totalMotorPremium },
    { type: 'Life', policies: totalLifePolicies, premium: totalLifePremium },
    { type: 'Travel', policies: totalTravelPolicies, premium: totalTravelPremium },
  ];

  const COLORS = ['#1E90FF', '#4682B4', '#002E81', '#87CEFA']; // Blue color variants

  return (
    <section className={styles.graphsSection}>
      <h3 className={styles.sectionTitle}>Insurance Data Visualization</h3>

      <div className={styles.chartContainer}>
        {/* Pie Chart for Policy Distribution */}
        <div className={styles.chart}>
          <h4 className={styles.chartTitle}>Policy Types Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={policyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {policyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Premiums by Policy Type */}
        <div className={styles.chart}>
          <h4 className={styles.chartTitle}>Premiums by Policy Type</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={premiumData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="premium" fill="#002E81" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart for Comparing Policies and Premiums */}
        <div className={styles.chart}>
          <h4 className={styles.chartTitle}>Policies vs Premiums Comparison</h4>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={90} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="type" />
              <PolarRadiusAxis />
              <Radar name="Policies" dataKey="policies" stroke="#1E90FF" fill="#1E90FF" fillOpacity={0.6} />
              <Radar name="Premiums" dataKey="premium" stroke="#87CEFA" fill="#87CEFA" fillOpacity={0.6} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default InsuranceGraphs;
