'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Journey.module.css';

const EXPERIENCES = [
  {
    period: '2023 — Present',
    title: 'Principal Engineer (Independent)',
    company: 'AI & Platform Engineering',
    description: 'Designed and built multiple production-grade platforms across domains (AgriTech, marketplaces, automation tools).',
    icon: '🚀',
    achievements: [
      'Developed multi-tenant farm management system managing dozens of farms, each with thousands of ponds and hundreds of operational features',
      'Built real-time bidding platform "Kèo Thơm" for trading ornamental fish and plants, enabling live auction workflows',
      'Created Cortex Hub — AI platform to streamline development workflows, improve collaboration, context sharing, and efficiency with AI systems',
      'Developed automation plugins and tools (Zalox integration) to support bot systems and platform extensibility',
      'Actively researched and applied AI across development workflows: advanced AI coding platforms (Copilot, GPT-based tools) and built internal tooling to enhance team productivity',
    ],
    tags: ['Next.js', 'Go', 'Supabase', 'GCP', 'AI', 'LLM', 'Real-time'],
    accentColor: '#00ff88',
  },
  {
    period: '2022 — 2023',
    title: 'Chief Technology Officer (CTO)',
    company: 'High-Tech Agriculture Company',
    description: 'Led architecture and development of a large-scale AgriTech platform managing thousands of hectares of agricultural production.',
    icon: '🌾',
    achievements: [
      'Designed big data pipelines processing millions of data points from farming operations, enabling real-time monitoring and analytics',
      'Built distributed systems for crop lifecycle management, supply chain traceability (export compliance), and real-time operational dashboards',
      'Delivered data-driven insights to improve productivity, yield, and operational efficiency across large-scale farming operations',
      'Ensured system scalability and reliability under continuous data growth and real-time processing requirements',
    ],
    tags: ['Microservices', 'Big Data', 'Kubernetes', 'PostgreSQL', 'Real-time'],
    accentColor: '#ffaa00',
  },
  {
    period: '2021 — 2022',
    title: 'Chief Technology Officer (CTO)',
    company: 'D2 Solutions',
    description: 'Founded and led a high-performance team building a cross-platform 3D multiplayer game (Unity/WebGL) integrated with Web3 systems.',
    icon: '🎮',
    achievements: [
      'Architected distributed real-time backend supporting millions of users with dynamically scalable micro-clusters (~20 players/room)',
      'Designed custom TCP networking layer optimized for low-latency real-time gameplay, eliminating dependency on third-party services (Photon)',
      'Built microservices architecture: gRPC, Kafka event streaming, Redis real-time state — full cloud-native on Kubernetes (HPA/VPA) with CI/CD',
      'Designed transparent on-chain/off-chain economy with Web3 token model, ensuring fairness and auditability',
      'Led full product lifecycle: system architecture, game design, economic balancing, and observability stack (monitoring, logging, metrics)',
    ],
    tags: ['C++', 'Unity', 'gRPC', 'Kafka', 'Redis', 'Kubernetes', 'Web3', 'AWS/GCP'],
    accentColor: '#ff6644',
  },
  {
    period: '2016 — 2018',
    title: 'Senior Software Engineer',
    company: 'Ansarada (Top 16 Best Workplaces)',
    description: 'Contributed to building a world-class SaaS product in the deal management and data room domain, following top-tier engineering practices.',
    icon: '⚡',
    achievements: [
      'Worked in a high-performing engineering culture with strong emphasis on clean code, testing, maintainability, and CI/CD with modern DevOps practices',
      'Gained deep product engineering mindset, transitioning from outsourcing to building high-quality, user-centric software',
      'Collaborated closely with cross-functional teams to deliver features aligned with business value and customer needs',
      'Contributed to scalable system design and product quality at enterprise SaaS scale',
    ],
    tags: ['.NET', 'SaaS', 'CI/CD', 'Clean Architecture', 'DevOps'],
    accentColor: '#8855ff',
  },
  {
    period: '2008 — 2016',
    title: 'Technical Architect / Senior Software Engineer',
    company: 'TMA Solutions',
    description: 'Progressed from Senior Engineer to Technical Architect, leading multiple large-scale projects across telecom and enterprise domains.',
    icon: '🏗️',
    achievements: [
      'Technical Architect for DG1 division (~300 engineers) — responsible for system architecture, technical direction, and mentoring teams',
      'Delivered solutions for global telecom clients across Windows, Linux, and Solaris platforms',
      'Designed high-performance, multi-threaded systems in C/C++ focusing on scalability, stability, and cross-platform compatibility',
      'Led system porting: Windows → Linux (RedHat, SUSE), 32-bit → 64-bit (including driver-level components)',
      'Onsite internationally: USA (2×, 6 months each), UK, Australia (2×) — collaborating directly with customers and resolving production issues',
    ],
    tags: ['C/C++', 'Telecom', 'Windows', 'Linux', 'Solaris', 'SOLID', 'Multi-threading'],
    accentColor: '#00ddff',
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
            const line = timelineRef.current.querySelector(`.${styles.lineFill}`);
            if (line) {
              gsap.fromTo(line, { scaleY: 0 }, {
                scaleY: 1, duration: 1.5, ease: 'power3.out',
              });
            }

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
      { threshold: 0.05 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`section ${styles.journey}`} id="journey">
      <div className="container">
        <span className="section-label">Experience</span>
        <h2 className="text-h1" style={{ marginBottom: '1rem' }}>
          Professional <span className="gradient-text">Journey</span>
        </h2>
        <p className={styles.subtitle}>
          From writing high-performance C/C++ at a 300-engineer division to leading technology strategy as CTO.
        </p>

        <div ref={timelineRef} className={styles.timeline}>
          <div className={styles.line}>
            <div className={styles.lineFill} />
          </div>

          {EXPERIENCES.map((exp, i) => (
            <div
              key={exp.period}
              className={styles.item}
              style={{ '--delay': `${i * 0.1}s`, '--accent': exp.accentColor } as React.CSSProperties}
            >
              <div className={styles.marker}>
                <span className={styles.markerIcon}>{exp.icon}</span>
              </div>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.year}>{exp.period}</span>
                  <span className={styles.company}>{exp.company}</span>
                </div>
                <h3 className={styles.title}>{exp.title}</h3>
                <p className={styles.description}>{exp.description}</p>

                <ul className={styles.achievements}>
                  {exp.achievements.map((ach) => (
                    <li key={ach} className={styles.achievement}>
                      <span className={styles.achievementDot} />
                      {ach}
                    </li>
                  ))}
                </ul>

                <div className={styles.tagList}>
                  {exp.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
