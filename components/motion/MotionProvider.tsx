'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

declare global {
  interface Window {
    __motionReady?: boolean;
  }
}

/* Page-wide motion runtime. Sections stay server-rendered and opt in with
   data attributes:
     data-reveal      fade + rise when scrolled into view (batched)
     data-split       heading split into masked lines
     data-count       count up to the value (data-decimals for precision)
     data-parallax    image drifts inside its frame while scrolling
     data-draw-line   vertical line scrubbed with the section */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const nav = document.querySelector<HTMLElement>('[data-nav]');

      // Nav state is useful with or without motion preference.
      ScrollTrigger.create({
        start: 80,
        end: 'max',
        onUpdate(self) {
          if (!nav) return;
          nav.classList.toggle('is-scrolled', self.scroll() > 80);
          const hide = self.direction === 1 && self.scroll() > window.innerHeight * 0.9;
          nav.classList.toggle('is-hidden', hide);
        },
        onLeaveBack() {
          nav?.classList.remove('is-scrolled', 'is-hidden');
        },
      });

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in lockstep.
        const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -72 }, autoRaf: false });
        lenis.on('scroll', ScrollTrigger.update);
        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        gsap.to('.progress', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
        });

        ScrollTrigger.batch(el.querySelectorAll('[data-reveal]'), {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { autoAlpha: 0, y: 28 },
              { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: true },
            ),
        });

        el.querySelectorAll<HTMLElement>('[data-split]').forEach((heading) => {
          SplitText.create(heading, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'line',
            autoSplit: true,
            onSplit(self) {
              gsap.set(heading, { autoAlpha: 1 });
              return gsap.from(self.lines, {
                yPercent: 115,
                duration: 1.1,
                ease: 'expo.out',
                stagger: 0.09,
                scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
              });
            },
          });
        });

        el.querySelectorAll<HTMLElement>('[data-count]').forEach((node) => {
          const end = Number(node.dataset.count);
          const decimals = Number(node.dataset.decimals ?? 0);
          const fmt = (v: number) =>
            v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
          const state = { v: 0 };
          node.textContent = fmt(0);
          gsap.to(state, {
            v: end,
            duration: 1.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: node, start: 'top 92%', once: true },
            onUpdate: () => {
              node.textContent = fmt(state.v);
            },
          });
        });

        el.querySelectorAll<HTMLElement>('[data-parallax]').forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: 'none',
              scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          );
        });

        el.querySelectorAll<HTMLElement>('[data-draw-line]').forEach((line) => {
          gsap.to(line, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: line.parentElement, start: 'top 70%', end: 'bottom 70%', scrub: 0.4 },
          });
        });

        window.__motionReady = true;

        return () => {
          gsap.ticker.remove(raf);
          lenis.destroy();
        };
      });

      // Web fonts change line breaks; re-measure once they're in.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
