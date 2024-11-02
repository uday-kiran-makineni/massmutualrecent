
import styles from './Subscription.module.css';

const Subscription = () => {
    return (
        <section className={styles.subscription}>
            <h2>Subscribe to Our Newsletter</h2>
            <input placeholder="Enter your email" className={styles.emailInput} />
            <button className={styles.subscribeButton}>Subscribe</button>
        </section>
    );
};

export default Subscription;
