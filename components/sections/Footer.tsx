import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.gradientLine} />
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Jackle. Built with{' '}
          <span className={styles.heart}>♥</span> and too much coffee.
        </p>
        <p className={styles.tech}>
          Next.js · React Three Fiber · GSAP
        </p>
      </div>
    </footer>
  );
}
