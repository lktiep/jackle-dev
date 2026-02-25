'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './AnimatedText.module.css';

interface AnimatedTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
  animation?: 'chars' | 'words' | 'lines';
}

export default function AnimatedText({
  text,
  as: Tag = 'p',
  className = '',
  delay = 0,
  stagger = 0.03,
  animation = 'chars',
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(
      `.${styles.animUnit}`
    );

    gsap.set(elements, {
      opacity: 0,
      y: animation === 'lines' ? 40 : 20,
      rotateX: animation === 'chars' ? -40 : 0,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              stagger,
              delay,
              ease: 'power3.out',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [text, delay, stagger, animation]);

  const units = animation === 'words' ? text.split(' ') : text.split('');

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={`${styles.container} ${className}`}
      style={{ perspective: '600px' }}
    >
      {units.map((unit, i) => (
        <span key={i} className={styles.animUnit}>
          {unit === ' ' ? '\u00A0' : unit}
          {animation === 'words' && i < units.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}
