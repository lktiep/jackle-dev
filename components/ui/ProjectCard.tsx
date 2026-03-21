'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  accent?: string;
  image?: string;
  size?: 'featured' | 'large' | 'medium';
  icon?: string;
  gradient?: string;
  year?: string;
  role?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  href = '#',
  accent = 'var(--color-accent)',
  size = 'medium',
  icon = '🚀',
  gradient = 'linear-gradient(135deg, #0a2e1a, #0d3d2e)',
  year,
  role,
  image,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    function handleMouseMove(e: MouseEvent) {
      const rect = card!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000,
      });

      card!.style.setProperty('--mouse-x', `${x}px`);
      card!.style.setProperty('--mouse-y', `${y}px`);
    }

    function handleMouseLeave() {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    }

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <a
      ref={cardRef}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`${styles.card} ${styles[size]}`}
      style={{ '--card-accent': accent } as React.CSSProperties}
    >
      {/* Visual area */}
      <div className={styles.visual} style={{ background: image ? 'transparent' : gradient }}>
        {image ? (
          <>
            <Image
              src={image}
              alt={title}
              fill
              className={styles.visualImage}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={styles.visualImageOverlay} />
          </>
        ) : (
          <>
            <div className={styles.visualIcon}>{icon}</div>
            <div className={styles.visualGrid} />
            <div className={styles.visualGlow} />
          </>
        )}
      </div>

      {/* Glare effect */}
      <div className={styles.glare} />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.meta}>
          {year && <span className={styles.year}>{year}</span>}
          {role && <span className={styles.role}>{role}</span>}
        </div>
        <div className={styles.header}>
          <span className={styles.dot} />
          <h3 className={styles.title}>{title}</h3>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <span className={styles.arrow}>→</span>
      </div>

      {/* Border */}
      <div className={styles.border} />
    </a>
  );
}
