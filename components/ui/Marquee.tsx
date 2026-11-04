'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* Endless band; scroll velocity briefly speeds it up. Static wrap when
   motion is reduced. Pauses itself when off-screen. */
export default function Marquee({ items, hot = [] }: { items: string[]; hot?: string[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const track = root.current!.querySelector('.marquee-track');
        const loop = gsap.to(track, { xPercent: -50, ease: 'none', duration: 38, repeat: -1 });
        const speed = { v: 1 };
        const settle = gsap.quickTo(speed, 'v', {
          duration: 0.8,
          ease: 'power3.out',
          onUpdate: () => {
            loop.timeScale(speed.v);
          },
        });

        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
          onUpdate: (self) => {
            const v = Math.min(Math.abs(self.getVelocity()) / 220, 5);
            speed.v = 1 + v;
            loop.timeScale(speed.v);
            settle(1);
          },
        });
      });
      mm.add('(prefers-reduced-motion: reduce)', () => {
        root.current!.classList.add('is-static');
        return () => root.current?.classList.remove('is-static');
      });
    },
    { scope: root },
  );

  const group = (hidden: boolean) => (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {items.map((d) => (
        <span key={d} className={hot.includes(d) ? 'hot' : undefined}>
          {d}
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" ref={root}>
      <div className="marquee-track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
