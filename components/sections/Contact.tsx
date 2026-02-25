'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AnimatedText from '@/components/ui/AnimatedText';
import GlowButton from '@/components/ui/GlowButton';
import styles from './Contact.module.css';

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/jackle-dev',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:hello@jackle.dev',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              contentRef.current,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
            );

            const links = socialsRef.current?.children;
            if (links) {
              gsap.fromTo(
                links,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  stagger: 0.1,
                  duration: 0.6,
                  ease: 'power3.out',
                  delay: 0.4,
                }
              );
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.contact}`}
      id="contact"
    >
      <div className="container">
        <div ref={contentRef} className={styles.content}>
          <span className="section-label">Contact</span>

          <AnimatedText
            text="Let's Build Something"
            as="h2"
            className={`text-h1 ${styles.heading}`}
            animation="words"
            stagger={0.08}
          />

          <h3 className={`gradient-text ${styles.headingAccent}`}>
            Together.
          </h3>

          <p className={styles.description}>
            Got an idea, a project, or just want to say hi? I&apos;m always open
            to interesting conversations and collaborations.
          </p>

          <div className={styles.cta}>
            <GlowButton href="mailto:hello@jackle.dev">
              Say Hello →
            </GlowButton>
          </div>

          <div ref={socialsRef} className={styles.socials}>
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={social.label}
              >
                {social.icon}
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
