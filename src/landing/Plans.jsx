
 import styles from './Plans.module.css';

const InsurancePlans = () => {
  return (
    <div className={styles.plansContainer}>
  <center><h1>Mass Mutual's trusted insurance policies</h1></center>
  <div className={styles.plans}>
    
    {/* Health Insurance Plan */}
    <div className={`${styles.plan} ${styles.lowPlan}`}>
      <h2>Health Insurance Policy</h2>
      <br></br>
      <p><strong>IRDAI UIN: HEAL123456789</strong></p>
      <p>Comprehensive coverage for your family's healthcare needs.</p>
      <ul>
        <li>Cashless hospitalization in network hospitals.</li>
        <li>Annual health check-ups included.</li>
        <li>Pre and post-hospitalization expenses covered.</li>
      </ul>
      <a href="#health" className={styles.planButton}>Get Health Insurance Policy</a>
    </div>

    {/* Life Insurance Plan */}
    <div className={`${styles.plan} ${styles.mediumPlan}`}>
      <h2>Life Insurance Policy</h2>
      <br></br>
      <p><strong>IRDAI UIN: LIFE987654321</strong></p>
      <p>Secure your family's financial future with our life insurance plans.</p>
      <ul>
        <li>Guaranteed payout on death of the insured.</li>
        <li>Flexible premium payment options available.</li>
        <li>Option to add riders for additional coverage.</li>
      </ul>
      <a href="#life" className={styles.planButton}>Get Life Insurance Policy</a>
    </div>

    {/* Vehicle Insurance Plan */}
    <div className={`${styles.plan} ${styles.highPlan}`}>
      <h2>Vehicle Insurance Policy</h2>
      <br></br>
      <p><strong>IRDAI UIN: VEHICLE11223344</strong></p>
      <p>Protect your vehicle against damages and theft.</p>
      <ul>
        <li>Comprehensive coverage including third-party liability.</li>
        <li>No claim bonus benefits for claim-free years.</li>
        <li>Quick and easy claim settlement process.</li>
      </ul>
      <a href="#vehicle" className={styles.planButton}>Get Vehicle Insurance Policy</a>
    </div>

  </div>
</div>

  );
}

export default InsurancePlans;
