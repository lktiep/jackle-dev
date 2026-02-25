'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AnimatedText from '@/components/ui/AnimatedText';
import styles from './About.module.css';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              leftRef.current,
              { opacity: 0, x: -60 },
              { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
            );

            const statItems = statsRef.current?.querySelectorAll(`.${styles.statItem}`);
            if (statItems) {
              gsap.fromTo(statItems,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out', delay: 0.4 }
              );
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`section ${styles.about}`} id="about">
      <div className={`container ${styles.grid}`}>
        <div ref={leftRef} className={styles.left}>
          <div className={styles.avatarBox}>
            <div className={styles.avatarGlow} />
            <div className={styles.avatarRing} />
            <div className={styles.avatarInner}>
              <span className={styles.avatarEmoji}>⚡</span>
            </div>
            <div className={styles.statusBadge}>
              <span className={styles.statusDot} />
              <span>Available</span>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <span className="section-label">About</span>

          <AnimatedText
            text="CTO & Technical Architect"
            as="h2"
            className="text-h1"
            animation="words"
            stagger={0.06}
          />

          <div className={styles.bio}>
            <p className="text-body-lg">
              Since <strong>2006</strong>, I&apos;ve been architecting and building software that matters.
              From scaling <strong>MMO game servers</strong> handling thousands of concurrent players,
              to engineering <strong>crypto trading platforms</strong>,
              to leading <strong>AI-powered agriculture-tech</strong> as CTO —
              I bring nearly two decades of battle-tested experience in shipping products at scale.
            </p>
            <p className={styles.bioSecondary}>
              My philosophy: technology should amplify human potential. I combine deep
              technical expertise with product thinking to build systems that are both
              elegantly engineered and genuinely impactful.
            </p>
          </div>

          <div ref={statsRef} className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>20+</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>10+</span>
              <span className={styles.statLabel}>Products Shipped</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>CTO</span>
              <span className={styles.statLabel}>Current Role</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>∞</span>
              <span className={styles.statLabel}>Curiosity</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
