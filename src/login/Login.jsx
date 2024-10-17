import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header.jsx'; // Ensure this path is correct
import Footer from './Footer.jsx'; // Ensure this path is correct
import styles from './Login.module.css'; // Ensure this path is correct
import QRimg from './assets/mm-app-qr.png'; // Ensure this path is correct
import CryptoJS from 'crypto-js'; // Import crypto-js for encryption

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/auth/login', {
        username,
        password,
      });

      if (response.data.success) {
        // Encrypt password before storing it
        const encryptedPassword = CryptoJS.AES.encrypt(password, 'your-secret-key').toString();

        // Store encrypted password, username, roles, and userId in localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('userRoles', response.data.roles);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('password', encryptedPassword); // Store encrypted password

        // Redirect based on roles
        if (response.data.roles.includes('ROLE_USER')) {
            navigate('/Userdb'); 
        } else {
            navigate('/dashboard'); 
        }
      } else {
        setError('Login failed');
      }
    } catch (error) {
      console.error('Login error', error);
      setError('Login failed');
    }
  };

  return (
    <>
      <Header />
      <div className={styles.appContainer}>
        <h3 className={styles.titletext}>Log in to Dashboard</h3>
        <form onSubmit={handleLogin}> {/* Use handleLogin here */}
          <div className={styles.container}>
            <div className={styles.LoginCard}>
              <label>Username</label><br />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              /><br />

              <label>Password</label><br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              /><br />
              {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
              <button type='submit'>Log in</button>
              <p className={styles.textBelow}>
                Don't have an account? <Link to="/Signup">Sign up</Link>
              </p>
            </div>
          </div>
        </form>
        <div className={styles.AppWindow}>
          <h4>Discover the MassMutual App
            <img src={QRimg} alt="QR code" className={styles.qrimg} />
          </h4>
          <p>The easiest way to manage your policies, make payments, view statements, and more.</p>
          <p>Scan QR code to Download!</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
