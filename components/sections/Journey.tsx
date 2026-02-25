'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Journey.module.css';

const MILESTONES = [
  {
    year: '2006',
    title: 'Started Coding',
    description: 'First lines of code. Fell in love with building things from scratch.',
    icon: '💻',
  },
  {
    year: '2010',
    title: 'Game Server Engineer',
    description: 'Built and scaled MMO game servers handling thousands of concurrent players.',
    icon: '🎮',
  },
  {
    year: '2014',
    title: 'Senior Developer',
    description: 'Led full-stack development across web and mobile platforms. Shipped products at scale.',
    icon: '⚡',
  },
  {
    year: '2017',
    title: 'Crypto & Blockchain',
    description: 'Dove into DeFi, smart contracts, and crypto trading platforms during the blockchain revolution.',
    icon: '🔗',
  },
  {
    year: '2020',
    title: 'Technical Architect',
    description: 'Designed system architectures for complex, high-traffic applications. Mentored engineering teams.',
    icon: '🏗️',
  },
  {
    year: '2023',
    title: 'CTO',
    description: 'Leading technology strategy, AI/ML integration, and building the future of agriculture-tech.',
    icon: '🚀',
  },
];

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && timelineRef.current) {
            // Animate the line
            const line = timelineRef.current.querySelector(`.${styles.lineFill}`);
            if (line) {
              gsap.fromTo(line, { scaleY: 0 }, {
                scaleY: 1, duration: 1.5, ease: 'power3.out',
              });
            }

            // Animate milestones
            const items = timelineRef.current.querySelectorAll(`.${styles.item}`);
            gsap.fromTo(items,
              { opacity: 0, x: -40 },
              {
                opacity: 1, x: 0,
                stagger: 0.15, duration: 0.7, ease: 'power3.out', delay: 0.3,
              }
            );

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
    <section ref={sectionRef} className={`section ${styles.journey}`} id="journey">
      <div className="container">
        <span className="section-label">Journey</span>
        <h2 className="text-h1" style={{ marginBottom: '1rem' }}>
          20 Years of <span className="gradient-text">Building</span>
        </h2>
        <p className={styles.subtitle}>
          From writing my first lines of code to leading technology strategy as CTO.
        </p>

        <div ref={timelineRef} className={styles.timeline}>
          <div className={styles.line}>
            <div className={styles.lineFill} />
          </div>

          {MILESTONES.map((m, i) => (
            <div key={m.year} className={styles.item} style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}>
              <div className={styles.marker}>
                <span className={styles.markerIcon}>{m.icon}</span>
              </div>
              <div className={styles.card}>
                <span className={styles.year}>{m.year}</span>
                <h3 className={styles.title}>{m.title}</h3>
                <p className={styles.description}>{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
