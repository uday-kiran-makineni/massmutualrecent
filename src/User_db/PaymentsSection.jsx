import styles from './PaymentsSection.module.css';

const PaymentsSection = () => {
  return (
    <section className={styles.paymentsSection}>
      <h3 className={styles.sectionTitle}>Upcoming Payments</h3>
      
      {/* First payment card */}
      <div className={styles.paymentCard}>
        <div className={styles.paymentDetails}>
          <span>Policy Name: Health Insurance</span>
          <br></br>
          <span>Due Date: 12/01/2024</span>
          <br></br>
          <span>Premium Amount: $200</span>
        </div>
      </div>
    </section>
  );
};

export default PaymentsSection;
