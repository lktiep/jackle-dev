'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AnimatedText from '@/components/ui/AnimatedText';
import ProjectCard from '@/components/ui/ProjectCard';
import styles from './Projects.module.css';

const PROJECTS = [
  {
    title: 'Shrimp Farm Platform',
    description:
      'End-to-end SaaS platform for smart shrimp farming — real-time monitoring, AI-powered camera detection, water quality analytics, and multi-farm management for commercial aquaculture operations.',
    tags: ['Next.js', 'Supabase', 'TFLite', 'Gemini AI', 'GCP', 'IoT'],
    href: 'https://farms.shrimpfarm.vn',
    accent: '#00d4ff',
    size: 'featured' as const,
    icon: '🦐',
    gradient: 'linear-gradient(135deg, #0a1e2e, #0d2d3d, #0a3040)',
    year: '2024 — Present',
    role: 'CTO & Lead Engineer',
  },
  {
    title: 'Kèo Thơm',
    description:
      'Social marketplace for exclusive group-buy deals. Real-time auction bidding, integrated wallet with frozen funds, seller verification, and automated payout system.',
    tags: ['Next.js', 'Supabase', 'Cloudflare Pages', 'TypeScript'],
    href: 'https://keothom.bid',
    accent: '#00ff88',
    size: 'large' as const,
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #0a2e1a, #0d3d2e, #0a402a)',
    year: '2025',
    role: 'Full-Stack Developer',
  },
  {
    title: 'Game Server Infrastructure',
    description:
      'High-performance MMO game server cluster handling 5,000+ concurrent players with real-time state synchronization, matchmaking, and anti-cheat systems.',
    tags: ['C++', 'Node.js', 'Redis', 'WebSocket', 'Docker'],
    href: '#',
    accent: '#ff6644',
    size: 'large' as const,
    icon: '🎮',
    gradient: 'linear-gradient(135deg, #2e1a0a, #3d1d0d, #401a0a)',
    year: '2010 — 2016',
    role: 'Game Server Engineer',
  },
  {
    title: 'Crypto Trading Platform',
    description:
      'DeFi trading platform with automated strategies, on-chain analytics, portfolio management, and real-time market data aggregation across multiple exchanges.',
    tags: ['React', 'Solidity', 'Web3.js', 'Python', 'WebSocket'],
    href: '#',
    accent: '#ffaa00',
    size: 'medium' as const,
    icon: '₿',
    gradient: 'linear-gradient(135deg, #2e2a0a, #3d350d, #40320a)',
    year: '2017 — 2019',
    role: 'Technical Lead',
  },
  {
    title: 'OpenClaw',
    description:
      'Multi-agent AI orchestration — browser automation, visual content generation, and social media management powered by LLMs and headless browsers.',
    tags: ['Node.js', 'Docker', 'Playwright', 'GCP', 'AI Agents'],
    href: '#',
    accent: '#8855ff',
    size: 'medium' as const,
    icon: '🤖',
    gradient: 'linear-gradient(135deg, #1a0a2e, #220d3d, #1e0a40)',
    year: '2025',
    role: 'Creator',
  },
  {
    title: 'Shrimp Scanner',
    description:
      'Mobile-first ML species classification — real-time on-device detection with TFLite, Gemini AI cloud fallback, and species database management.',
    tags: ['React', 'TensorFlow', 'Gemini AI', 'Camera API'],
    href: '#',
    accent: '#00ddaa',
    size: 'medium' as const,
    icon: '🔬',
    gradient: 'linear-gradient(135deg, #0a2e22, #0d3d2e, #0a4030)',
    year: '2024',
    role: 'ML Engineer',
  },
  {
    title: 'Antigravity Quota',
    description:
      'VS Code extension for real-time API quota monitoring — live status bar, quota alerts, and usage analytics with WebSocket connection.',
    tags: ['TypeScript', 'VS Code API', 'WebSocket'],
    href: '#',
    accent: '#4488ff',
    size: 'medium' as const,
    icon: '📊',
    gradient: 'linear-gradient(135deg, #0a1a2e, #0d2240, #0a1e3d)',
    year: '2025',
    role: 'Creator',
  },
  {
    title: 'Enterprise Platforms',
    description:
      'Led architecture design for multiple enterprise-grade applications — ERP systems, logistics platforms, and e-commerce solutions serving 100K+ users.',
    tags: ['Microservices', 'Kubernetes', 'PostgreSQL', 'AWS', 'CI/CD'],
    href: '#',
    accent: '#cc44ff',
    size: 'medium' as const,
    icon: '🏢',
    gradient: 'linear-gradient(135deg, #200a2e, #2d0d3d, #280a40)',
    year: '2018 — 2022',
    role: 'Technical Architect',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && gridRef.current) {
            const cards = gridRef.current.children;
            gsap.fromTo(cards,
              { opacity: 0, y: 60, scale: 0.94 },
              {
                opacity: 1, y: 0, scale: 1,
                stagger: 0.1, duration: 0.8, ease: 'power3.out',
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
    <section ref={sectionRef} className={`section ${styles.projects}`} id="projects">
      <div className="container">
        <span className="section-label">Projects</span>

        <AnimatedText
          text="Things I've Built"
          as="h2"
          className="text-h1"
          animation="words"
          stagger={0.08}
        />

        <p className={styles.description}>
          Two decades of shipping products — from game servers and crypto platforms
          to AI-powered agriculture tech and creative developer tools.
        </p>

        <div ref={gridRef} className={styles.grid}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
