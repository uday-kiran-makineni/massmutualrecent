import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/AddPolicy.module.css';

const AddPolicy = () => {
  const [policyName, setPolicyName] = useState('');
  const [policyType, setPolicyType] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset messages
    setErrorMessage('');
    setSuccessMessage('');

    // Simple validation
    if (!policyName || !policyType || !coverageAmount || !duration) {
      setErrorMessage('All fields are required!');
      return;
    }

    // Simulate API call
    console.log({ policyName, policyType, coverageAmount, duration });
    
    // Show success message
    setSuccessMessage('Policy created successfully!');
    
    // Clear form
    setPolicyName('');
    setPolicyType('');
    setCoverageAmount('');
    setDuration('');
  };

  return (
    <>
      <Navbar />
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2>Create New Policy</h2>
        </div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="policyName">Policy Name</label>
            <input
              type="text"
              id="policyName"
              placeholder="Enter policy name"
              value={policyName}
              onChange={(e) => setPolicyName(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="policyType">Policy Type</label>
            <select
              id="policyType"
              value={policyType}
              onChange={(e) => setPolicyType(e.target.value)}
              className={styles.input}
            >
              <option value="">Select Policy Type</option>
              <option value="health">Health</option>
              <option value="life">Life</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="coverageAmount">Coverage Amount</label>
            <input
              type="number"
              id="coverageAmount"
              placeholder="Enter coverage amount"
              value={coverageAmount}
              onChange={(e) => setCoverageAmount(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="duration">Duration (Years)</label>
            <input
              type="number"
              id="duration"
              placeholder="Enter duration in years"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            Create Policy
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPolicy;
