import {Link} from 'react-router-dom';
import styles from './HomePage.module.scss';


function HomePage() {
    return (
        <div className={styles.page}>
            <div className={styles.pageContainer}>
                <div className={styles.hero}>
                    <h1 className={styles.heroTitle}>GitHub <span className={styles.heroTitleAccent}>Analytics</span></h1>
                    <p className={styles.heroSubtitle}>Explore developer stats, top languages and repository activity</p>
                </div>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <p className={styles.cardLabel}>Single user</p>
                        <h2 className={styles.cardTitle}>About User</h2>
                        <p className={styles.cardDescription}>Explore repositories, top languages and activity of any GitHub user</p>
                        <Link to='/user-about'>
                            <button className={styles.cardBtn}>Try Now</button>
                        </Link>
                    </div>
                    <div className={styles.card}>
                        <p className={styles.cardLabel}>Two users</p>
                        <h2 className={styles.cardTitle}>Compare Users</h2>
                        <p className={styles.cardDescription}>Compare two GitHub developers side by side - repos, languages and growth</p>
                        <Link to='/user-compare'>
                            <button className={`${styles.cardBtn} ${styles.cardBtnSecondary}`}>Try Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomePage;