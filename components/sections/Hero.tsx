'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AnimatedText from '@/components/ui/AnimatedText';
import GlowButton from '@/components/ui/GlowButton';
import styles from './Hero.module.css';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
});

const HERO_STATS = [
  { value: '15+', label: 'Years Experience' },
  { value: 'M+', label: 'Users Served' },
  { value: '5+', label: 'Companies Led' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '+=0.6'
    );

    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

    if (statsRef.current) {
      const items = statsRef.current.children;
      tl.fromTo(
        items,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );
    }

    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.2'
    );
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      <HeroScene />

      <div className={styles.content}>
        <div className={styles.labelRow}>
          <span className="section-label">CTO / Head of Engineering</span>
        </div>

        <AnimatedText
          text="Jack Le"
          as="h1"
          className={`text-display ${styles.name}`}
          delay={0.3}
          stagger={0.05}
        />

        <p ref={subtitleRef} className={styles.subtitle}>
          Building <span className="gradient-text">distributed systems</span> handling
          millions of users — from real-time multiplayer platforms to{' '}
          <span className="gradient-text">AI-native</span> products.
        </p>

        <div ref={ctaRef} className={styles.cta}>
          <GlowButton href="#projects">View Projects</GlowButton>
          <GlowButton href="#contact" variant="secondary">
            Get in Touch
          </GlowButton>
        </div>

        <div ref={statsRef} className={styles.heroStats}>
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className={styles.heroStat}>
              <span className={styles.heroStatValue}>{stat.value}</span>
              <span className={styles.heroStatLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  );
}
