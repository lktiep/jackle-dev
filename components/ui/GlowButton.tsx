'use client';

import styles from './GlowButton.module.css';

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
}: GlowButtonProps) {
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...(href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className={styles.content}>{children}</span>
      <span className={styles.glow} />
    </Tag>
  );
}
