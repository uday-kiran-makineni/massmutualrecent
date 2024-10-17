import PropTypes from 'prop-types'; // Import PropTypes
import { NavLink } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = ({ onLogout }) => {
  return (
    <nav className={styles.navbar} aria-label="Primary Navigation">
      <div className={styles.logo}>
        <NavLink to="/dashboard" aria-label="Navigate to Dashboard" className={styles.logoLink}>
          <h1>PolicyManager</h1> {/* Changed to h1 for better semantic structure */}
        </NavLink>
      </div>
      <div className={styles.logout}>
        <button 
          className={styles.logoutButton} 
          onClick={onLogout} 
          aria-label="Logout" 
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

// Add PropTypes for validation
Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
