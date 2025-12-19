import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    Gordon<span className={styles.logoHighlight}>Storage</span>
                </Link>
                <div className={styles.links}>
                    <Link href="/units" className={styles.link}>Units</Link>
                    <Link href="/faq" className={styles.link}>FAQ</Link>
                    <Link href="/contact" className={styles.link}>Contact</Link>
                    <Link href="/booking" className={`btn btn-primary ${styles.cta}`}>
                        Book Now
                    </Link>
                </div>
            </div>
        </nav>
    );
}
