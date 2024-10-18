import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from './assets/nobglogo.png';  // Import your logo image
import Hero from './Hero.jsx'
import WhyChoose from './WhyChoose.jsx'
import FAQ from './FAQ.jsx'
import Plans from './Plans.jsx'
import Subscription from './Subscription.jsx'
import Testimonials from './Testimonials.jsx'

const Header = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    return (
        <>
        <header className={styles.header}>
            <img src={logo} alt="MassMutual Logo" className={styles.logo} />  {/* Logo Image */}
            <nav className={styles.nav}>
                <ul className={styles.navLinks}>
                    <li><a href="#Hero">Home</a></li>
                    <li><a href="#WhyChoose">About Us</a></li>
                    <li><a href="#Plans">Plans</a></li>
                    <li><a href="#Contact">Contact</a></li>
                    <li><Link to="/Login">Login</Link></li>
                    
                </ul>
            </nav>
        </header>
        <div id="Hero">
            <Hero/>
        </div>
        <div id="WhyChoose">
        <WhyChoose/>
        </div>
        <FAQ/>
        <div id="Plans">
        <Plans/>
        </div>
        <Testimonials/>
        <div id="Contact">
        <Subscription/>
        </div>
        </>
    );
};

export default Header;
