import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CustomerList.module.css';
import CryptoJS from 'crypto-js';
import Navbar from '../components/Navbar';
import UserFooter from '../../User_db/UserFooter';
import * as XLSX from 'xlsx';

const secretKey = 'your-secret-key';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const encryptedPassword = localStorage.getItem('password');

  const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const decryptedPassword = decryptData(encryptedPassword);

  useEffect(() => {
    const fetchPolicies = async (policyType) => {
      try {
        const response = await axios.get(`http://localhost:8081/api/${policyType}/agent/${userId}`, {
          headers: {
            Authorization: 'Basic ' + btoa(`${username}:${decryptedPassword}`)
          }
        });
        return response.data;
      } catch (err) {
        console.error(`Error fetching ${policyType}:`, err);
        throw new Error(`Error fetching ${policyType}`);
      }
    };

    const fetchAllPolicies = async () => {
      setLoading(true);
      try {
        const [healthPolicies, lifePolicies, motorPolicies, travelPolicies] = await Promise.all([
          fetchPolicies('healthpolicies'),
          fetchPolicies('lifeinsurance'),
          fetchPolicies('motorinsurances'),
          fetchPolicies('travelinsurances')
        ]);

        const allPolicies = [
          ...healthPolicies,
          ...lifePolicies,
          ...motorPolicies,
          ...travelPolicies,
        ];

        const uniqueCustomers = [
          ...new Map(allPolicies.map(policy => [policy.userEmail, {
            user_id: policy.userId,
            email: policy.userEmail,
            mobile_number: policy.mobileNumber,
          }])).values(),
        ];

        setCustomers(uniqueCustomers);
      } catch (err) {
        setError('Error fetching policies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllPolicies();
  }, [userId, username, decryptedPassword]);

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(customers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');

    // Trigger file download
    XLSX.writeFile(workbook, 'Customer_List.xlsx');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <>
      <Navbar />
      <section className={styles.customerSection}>
        <h2 className={styles.customerTitle}>My Customers</h2>
        <button onClick={handleDownloadExcel} className={styles.downloadButton}>
          Download Excel File
        </button>
        {customers.length > 0 ? (
          <table className={styles.customerTable}>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.user_id}</td>
                  <td>{customer.email}</td>
                  <td>{customer.mobile_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No customers found.</p>
        )}
      </section>
      <UserFooter />
    </>
  );
};

export default CustomerList;
