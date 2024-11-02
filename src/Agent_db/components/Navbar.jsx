import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../assets/nobglogo.png';

const Navbar = () => {
    const navigate = useNavigate();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Clear local storage and redirect to Login
    const handleLogout = () => {
        localStorage.clear(); // Clear all items in local storage
        navigate('/Login'); // Navigate to Login page
    };

    return (
        <>
            <header className={styles.header}>
                <img src={logo} alt="MassMutual Logo" className={styles.logo} /> {/* Logo Image */}
                <nav className={styles.nav}>
                    <ul className={styles.navLinks}>
                        <li className={styles.Login} onClick={handleLogout}>Logout</li> {/* Logout button */}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
