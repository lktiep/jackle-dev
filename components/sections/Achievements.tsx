'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Achievements.module.css';

const ACHIEVEMENTS = [
  {
    icon: '🏆',
    title: 'VS Extension Contest Winner',
    description: 'CodeProject Visual Studio Extension Contest',
    metric: 'Winner',
    gradient: 'linear-gradient(135deg, #ffaa00, #ff6644)',
  },
  {
    icon: '🧠',
    title: 'First Vietnamese — ProjectEuler',
    description: 'First Vietnamese to solve 300+ problems on ProjectEuler.net',
    metric: '300+',
    gradient: 'linear-gradient(135deg, #8855ff, #ff44aa)',
  },
  {
    icon: '🚀',
    title: 'Products at Scale',
    description: 'Built products reaching 100,000+ users and downloads',
    metric: '100K+',
    gradient: 'linear-gradient(135deg, #00ff88, #00ddff)',
  },
  {
    icon: '🌐',
    title: 'Systems for Millions',
    description: 'Designed and operated systems handling millions of concurrent users',
    metric: 'M+ Users',
    gradient: 'linear-gradient(135deg, #00ddff, #4488ff)',
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && gridRef.current) {
            const cards = gridRef.current.children;
            gsap.fromTo(cards,
              { opacity: 0, y: 50, rotateY: -10 },
              {
                opacity: 1, y: 0, rotateY: 0,
                stagger: 0.12, duration: 0.8, ease: 'power3.out',
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`section ${styles.achievements}`} id="achievements">
      <div className="container">
        <span className="section-label">Achievements</span>
        <h2 className="text-h1" style={{ marginBottom: '0.75rem' }}>
          Notable <span className="gradient-text">Milestones</span>
        </h2>
        <p className={styles.subtitle}>
          Highlights from a career dedicated to pushing technical boundaries.
        </p>

        <div ref={gridRef} className={styles.grid}>
          {ACHIEVEMENTS.map((ach) => (
            <div key={ach.title} className={styles.card}>
              <div className={styles.cardGlow} style={{ background: ach.gradient }} />
              <div className={styles.cardContent}>
                <span className={styles.icon}>{ach.icon}</span>
                <span className={styles.metric} style={{ backgroundImage: ach.gradient }}>{ach.metric}</span>
                <h3 className={styles.title}>{ach.title}</h3>
                <p className={styles.description}>{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
