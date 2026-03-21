'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AnimatedText from '@/components/ui/AnimatedText';
import styles from './Skills.module.css';

const SKILL_CATEGORIES = [
  {
    category: 'Architecture & Systems',
    icon: '🧠',
    skills: [
      'Distributed Systems',
      'Microservices Architecture',
      'Real-time Systems',
      'Multiplayer Networking',
      'High-Performance Computing',
      'Event-driven Architecture',
      'Multi-threading & Concurrency',
    ],
    accentColor: '#00ff88',
  },
  {
    category: 'Cloud & Infrastructure',
    icon: '☁️',
    skills: [
      'Kubernetes (HPA/VPA)',
      'AWS / GCP Multi-cloud',
      'CI/CD Pipelines',
      'Docker & Containerization',
      'Observability & Monitoring',
      'Auto-scaling',
      'Infrastructure as Code',
    ],
    accentColor: '#00ddff',
  },
  {
    category: 'Data & Backend',
    icon: '🔧',
    skills: [
      'Kafka (Event Streaming)',
      'Redis (Real-time State)',
      'gRPC Communication',
      'PostgreSQL',
      'Big Data Pipelines',
      'Supabase',
      'Node.js / .NET',
    ],
    accentColor: '#ffaa00',
  },
  {
    category: 'Specialized Domains',
    icon: '🎮',
    skills: [
      'Game Backend (Unity, WebGL)',
      'Reverse Engineering (ASM)',
      'Blockchain / Web3',
      'AI-assisted Development',
      'Custom TCP Networking',
      'Protocol Reconstruction',
      'Tokenomics Design',
    ],
    accentColor: '#ff6644',
  },
  {
    category: 'Engineering Principles',
    icon: '📐',
    skills: [
      'SOLID & Clean Architecture',
      'System Design at Scale',
      'Performance Optimization',
      'Developer Productivity',
      'Technical Leadership',
      'Product-driven Engineering',
    ],
    accentColor: '#8855ff',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && gridRef.current) {
            const cards = gridRef.current.querySelectorAll(`.${styles.card}`);
            gsap.fromTo(
              cards,
              { opacity: 0, y: 40 },
              {
                opacity: 1, y: 0,
                stagger: 0.12, duration: 0.8, ease: 'power3.out',
              }
            );

            // Animate tags with delay
            const tags = gridRef.current.querySelectorAll(`.${styles.skillTag}`);
            gsap.fromTo(
              tags,
              { opacity: 0, scale: 0.85 },
              {
                opacity: 1, scale: 1,
                stagger: 0.02, duration: 0.4, ease: 'back.out(1.7)', delay: 0.4,
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
    <section
      ref={sectionRef}
      className={`section ${styles.skills}`}
      id="skills"
    >
      <div className="container">
        <span className="section-label">Expertise</span>

        <AnimatedText
          text="Core Expertise"
          as="h2"
          className="text-h1"
          animation="words"
          stagger={0.08}
        />

        <p className={styles.description}>
          Deep technical knowledge across architecture, cloud, data systems, and specialized domains.
        </p>

        <div ref={gridRef} className={styles.grid}>
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.category}
              className={`${styles.card} glass`}
              style={{ '--card-accent': cat.accentColor } as React.CSSProperties}
            >
              <div className={styles.cardHeader}>
                <span className={styles.catIcon}>{cat.icon}</span>
                <h3 className={styles.catTitle}>{cat.category}</h3>
              </div>
              <div className={styles.tagCloud}>
                {cat.skills.map((skill) => (
                  <span key={skill} className={styles.skillTag}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
