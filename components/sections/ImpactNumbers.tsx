'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import styles from './ImpactNumbers.module.css';

const METRICS = [
  { value: 15, suffix: '+', label: 'Years of Experience', description: 'Since 2008', icon: '📅' },
  { value: 300, suffix: '+', label: 'Engineers Led', description: 'TMA Solutions Division', icon: '👥' },
  { value: 2000, suffix: '+', label: 'CCU Per Instance', description: 'Custom Multiplayer Server', icon: '🎮' },
  { value: 10, suffix: '+', label: 'Products Shipped', description: 'Across All Domains', icon: '🚀' },
  { value: 300, suffix: '+', label: 'ProjectEuler Solved', description: 'First Vietnamese', icon: '🧠' },
  { value: 4, suffix: '', label: 'Countries Worked', description: 'USA, UK, Australia', icon: '🌏' },
];

const DOMAINS = [
  { name: 'Telecom', percent: 35, color: '#00ff88' },
  { name: 'Gaming & Web3', percent: 25, color: '#00ddff' },
  { name: 'AgriTech', percent: 20, color: '#ffaa00' },
  { name: 'SaaS', percent: 12, color: '#8855ff' },
  { name: 'AI & ML', percent: 8, color: '#ff44aa' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const animate = useCallback(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.val).toLocaleString() + suffix;
        }
      },
    });
  }, [target, suffix]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate();
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return <span ref={ref} className={styles.metricValue}>0</span>;
}

export default function ImpactNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const domainsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (gridRef.current) {
              const cards = gridRef.current.children;
              gsap.fromTo(cards,
                { opacity: 0, y: 40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out' }
              );
            }

            if (domainsRef.current) {
              const bars = domainsRef.current.querySelectorAll(`.${styles.domainFill}`);
              gsap.fromTo(bars,
                { scaleX: 0 },
                { scaleX: 1, stagger: 0.1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
              );

              const items = domainsRef.current.querySelectorAll(`.${styles.domainItem}`);
              gsap.fromTo(items,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.2 }
              );
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`section ${styles.impact}`} id="impact">
      <div className="container">
        <span className="section-label">Impact</span>
        <h2 className="text-h1" style={{ marginBottom: '0.75rem' }}>
          Career in <span className="gradient-text">Numbers</span>
        </h2>
        <p className={styles.subtitle}>
          Key metrics from 15+ years of building and scaling technology.
        </p>

        <div ref={gridRef} className={styles.metricsGrid}>
          {METRICS.map((m) => (
            <div key={m.label} className={`${styles.metricCard} glass`}>
              <span className={styles.metricIcon}>{m.icon}</span>
              <CountUp target={m.value} suffix={m.suffix} />
              <span className={styles.metricLabel}>{m.label}</span>
              <span className={styles.metricDesc}>{m.description}</span>
            </div>
          ))}
        </div>

        <div className={styles.domainsSection}>
          <h3 className={styles.domainsTitle}>Domain Experience Distribution</h3>
          <div ref={domainsRef} className={styles.domainsList}>
            {DOMAINS.map((d) => (
              <div key={d.name} className={styles.domainItem}>
                <div className={styles.domainHeader}>
                  <span className={styles.domainName}>{d.name}</span>
                  <span className={styles.domainPercent}>{d.percent}%</span>
                </div>
                <div className={styles.domainTrack}>
                  <div
                    className={styles.domainFill}
                    style={{
                      '--fill-width': `${d.percent}%`,
                      '--fill-color': d.color,
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
