'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './DeepTech.module.css';

const DEEP_ITEMS = [
  {
    label: 'Reverse Engineering',
    detail: 'Reverse engineered 3D online game at assembly level (ASM). Reconstructed client-server protocols and internal systems.',
    icon: '🔬',
  },
  {
    label: 'Custom Multiplayer Server',
    detail: 'Built from scratch: 2000+ CCU per instance with real-time synchronization. Custom networking layer optimized for low latency.',
    icon: '🎮',
  },
  {
    label: 'System Internals',
    detail: 'Deep expertise in networking protocols, concurrency & performance optimization, system internals across Windows/Linux/Solaris.',
    icon: '⚙️',
  },
  {
    label: 'Blockchain & Web3',
    detail: 'Blockchain & crypto market analysis. Web3 automation systems, token economics, anti-exploit mechanisms.',
    icon: '🔗',
  },
];

export default function DeepTech() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && gridRef.current) {
            const cards = gridRef.current.children;
            gsap.fromTo(cards,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' }
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
    <section ref={sectionRef} className={`section ${styles.deeptech}`} id="deeptech">
      <div className="container">
        <span className="section-label">R&D</span>
        <h2 className="text-h1" style={{ marginBottom: '0.75rem' }}>
          Deep Tech & <span className="gradient-text">R&D</span>
        </h2>
        <p className={styles.subtitle}>
          Beyond product engineering — low-level hacking, protocol reconstruction, and system internals.
        </p>

        <div ref={gridRef} className={styles.grid}>
          {DEEP_ITEMS.map((item) => (
            <div key={item.label} className={styles.card}>
              <div className={styles.cardIcon}>{item.icon}</div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{item.label}</h3>
                <p className={styles.cardDetail}>{item.detail}</p>
              </div>
              <div className={styles.terminalDeco}>
                <span className={styles.terminalPrompt}>$ </span>
                <span className={styles.terminalCmd}>{item.label.toLowerCase().replace(/\s+/g, '_')}</span>
                <span className={styles.terminalCursor}>_</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
