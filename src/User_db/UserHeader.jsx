import  { useState } from 'react';
import {Link} from 'react-router-dom';
import styles from './UserHeader.module.css';
import logo from './assets/nobglogo.png'; // Import your logo image


const UserHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className={styles.header}>
            <img src={logo} alt="MassMutual Logo" className={styles.logo} /> {/* Logo Image */}
            <nav className={styles.nav}>
                <ul className={styles.navLinks}>
                    <li><Link to="/">Home</Link></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Plans</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <div className={styles.profile}>
                <img 
                    src="https://res.cloudinary.com/dfkfysygf/image/upload/v1709352028/profile_dohabp.svg"
                    alt="Profile"
                    className={styles.profilePic}
                    onClick={toggleDropdown} // Toggle dropdown on click
                />
                {isDropdownOpen && (
                    <div className={styles.dropdown}>
                        <ul>
                            <li><a href="#">Profile</a></li>
                            <li><a href="#">Settings</a></li>
                            <li><a href="#">Log Out</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

export default UserHeader;
