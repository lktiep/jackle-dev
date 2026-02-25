'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AnimatedText from '@/components/ui/AnimatedText';
import styles from './Skills.module.css';

const SKILL_CATEGORIES = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'CSS / Animations', level: 88 },
      { name: 'Three.js / WebGL', level: 70 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Python', level: 82 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'Supabase', level: 92 },
    ],
  },
  {
    category: 'AI & ML',
    skills: [
      { name: 'TensorFlow / TFLite', level: 75 },
      { name: 'Gemini AI', level: 80 },
      { name: 'Computer Vision', level: 72 },
      { name: 'Prompt Engineering', level: 88 },
    ],
  },
  {
    category: 'DevOps & Cloud',
    skills: [
      { name: 'Docker', level: 82 },
      { name: 'GCP', level: 78 },
      { name: 'Cloudflare', level: 90 },
      { name: 'Vercel', level: 92 },
    ],
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
            // Animate category cards
            const cards = gridRef.current.querySelectorAll(`.${styles.card}`);
            gsap.fromTo(
              cards,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out',
              }
            );

            // Animate progress bars
            const bars = gridRef.current.querySelectorAll(`.${styles.barFill}`);
            gsap.fromTo(
              bars,
              { scaleX: 0 },
              {
                scaleX: 1,
                stagger: 0.05,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.3,
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
    <section
      ref={sectionRef}
      className={`section ${styles.skills}`}
      id="skills"
    >
      <div className="container">
        <span className="section-label">Skills</span>

        <AnimatedText
          text="Tech Arsenal"
          as="h2"
          className="text-h1"
          animation="words"
          stagger={0.08}
        />

        <p className={styles.description}>
          The tools and technologies I use to bring ideas to life.
        </p>

        <div ref={gridRef} className={styles.grid}>
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.category} className={`${styles.card} glass`}>
              <h3 className={styles.catTitle}>{cat.category}</h3>
              <div className={styles.skillList}>
                {cat.skills.map((skill) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <div className={styles.skillHeader}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillLevel}>{skill.level}%</span>
                    </div>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{ '--fill-width': `${skill.level}%` } as React.CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
