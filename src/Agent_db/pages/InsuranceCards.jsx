import React from 'react';
import styles from '../styles/InsuranceCards.module.css';

const InsuranceCards = () => {
  const cards = [
    { 
      title: "Health Insurance", 
      description: "Comprehensive health coverage for your peace of mind.",
      imgSrc: "https://res.cloudinary.com/do6twjc6g/image/upload/v1729147589/health_fu7fd6.webp"  
    },
    { 
      title: "Life Insurance", 
      description: "Secure your family's future with our life insurance plans.",
      imgSrc: "https://res.cloudinary.com/do6twjc6g/image/upload/v1729147736/life_gwqbpr.jpg"  
    },
    { 
      title: "Vehicle Insurance", 
      description: "Protect your vehicle against accidents and theft.",
      imgSrc: "https://res.cloudinary.com/do6twjc6g/image/upload/v1729148331/Vehicle-Insurance_kmq6h7.jpg"  
    },
    { 
      title: "Travel Insurance", 
      description: "Enjoy your travels with confidence and coverage.",
      imgSrc: "https://res.cloudinary.com/do6twjc6g/image/upload/v1729147674/Travel_dhe90q.jpg"  
    }
  ];

  return (
    <div className={styles.cardContainer}>
      {cards.map((card, index) => (
        <div key={index} className={styles.card}>
          <img src={card.imgSrc} alt={card.title} className={styles.cardImage} />
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <button className={styles.learnMore}>Choose</button>
        </div>
      ))}
    </div>
  );
};

export default InsuranceCards;
