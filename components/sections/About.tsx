'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AnimatedText from '@/components/ui/AnimatedText';
import styles from './About.module.css';

const KEYWORDS = [
  'Distributed Systems',
  'Real-time Platforms',
  'AI-native Builder',
  'Cloud-native',
  'System Architecture',
  'Technical Leadership',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

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

            const tags = tagsRef.current?.children;
            if (tags) {
              gsap.fromTo(tags,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, stagger: 0.06, duration: 0.5, ease: 'back.out(1.7)', delay: 0.6 }
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
              CTO / Head of Engineering with <strong>15+ years</strong> of experience building
              and scaling high-performance systems across <strong>telecom, SaaS, gaming,
              Web3, and AgriTech</strong> domains.
            </p>
            <p className={styles.bioSecondary}>
              Proven track record of architecting and delivering{' '}
              <strong>distributed systems handling millions of users</strong>, including
              real-time multiplayer platforms, large-scale data systems, and cloud-native
              infrastructures. Known for a <strong>builder mindset</strong> — reverse
              engineering complex systems, designing custom infrastructure, and leveraging
              AI to significantly accelerate development velocity.
            </p>
          </div>

          <div ref={tagsRef} className={styles.tags}>
            {KEYWORDS.map((kw) => (
              <span key={kw} className={styles.tag}>{kw}</span>
            ))}
          </div>

          <div ref={statsRef} className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>15+</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>10+</span>
              <span className={styles.statLabel}>Products Shipped</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>300+</span>
              <span className={styles.statLabel}>Engineers Led</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>M+</span>
              <span className={styles.statLabel}>Users Served</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
