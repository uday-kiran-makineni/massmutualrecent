import { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { Link } from 'react-router-dom';
import video1 from './assets/video1.mp4'; 
import video2 from './assets/video2.mp4';
import video3 from './assets/video3.mp4';
import video4 from './assets/video4.mp4';
import video5 from './assets/video5.mp4';

const content = [
    {
        video: video1,
        title: "Secure Your Future with MassMutual",
        description: "We offer financial planning and life insurance to help you protect what matters most."
    },
    {
        video: video2,
        title: "Planning for Tomorrow, Today",
        description: "Build a solid financial foundation with personalized plans that align with your goals."
    },
    {
        video: video3,
        title: "Expert Guidance Every Step of the Way",
        description: "Our team of experts will guide you through your financial journey, ensuring a prosperous future."
    },
    {
        video: video4,
        title: "Financial Solutions Tailored for You",
        description: "No matter your needs, we have plans that provide the protection and flexibility you require."
    },
    {
        video: video5,
        title: "Join Millions Securing Their Future",
        description: "MassMutual is committed to helping individuals and families achieve financial stability and success."
    }
];

const Hero = () => {
    const [currentContent, setCurrentContent] = useState(0);

    // Automatically change content every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentContent((prevContent) => (prevContent + 1) % content.length);
        }, 7000);
        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    return (
        <section className={styles.hero}>
            {/* Background video carousel */}
            <div className={styles.videoContainer}>
                {content.map((item, index) => (
                    <video 
                        key={index}
                        src={item.video} 
                        autoPlay 
                        loop 
                        muted 
                        className={`${styles.video} ${currentContent === index ? styles.visible : styles.hidden}`} 
                        preload="auto"
                        onEnded={() => setCurrentContent((prevContent) => (prevContent + 1) % content.length)} // Move to the next video when the current one ends
                    />
                ))}
            </div>
            
            {/* Hero content */}
            <div className={styles.heroContent}>
                <div className={styles.innerheroContent}>
                    <h2>{content[currentContent].title}</h2>
                    <h1>Plan today. Prosper tomorrow.</h1>
                    <p>{content[currentContent].description}</p>
                    <Link to="/Login"> 
                        <button className={styles.ctaButton}>Get Started ➔</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
