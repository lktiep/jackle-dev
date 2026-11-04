'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

type Node = { id: string; x: number; y: number; w: number; h: number; title: string; sub: string; icon: string };

const NODES: Node[] = [
  { id: 'clients', x: 130, y: 16, w: 300, h: 58, title: 'Clients', sub: 'web · mobile · AI agents', icon: 'clients' },
  { id: 'edge', x: 130, y: 118, w: 300, h: 50, title: 'Edge', sub: 'CDN · WAF · signed tickets', icon: 'shield' },
  { id: 'gateway', x: 170, y: 212, w: 220, h: 50, title: 'API gateway / BFF', sub: 'authn · quotas · idempotency', icon: 'gate' },
  { id: 'domain', x: 20, y: 314, w: 160, h: 58, title: 'Domain services', sub: 'NestJS · Fastify', icon: 'boxes' },
  { id: 'ai', x: 200, y: 314, w: 160, h: 58, title: 'AI orchestration', sub: 'LLM · OCR · agents', icon: 'spark' },
  { id: 'ledger', x: 380, y: 314, w: 160, h: 58, title: 'Ledger & events', sub: 'append-only · outbox', icon: 'ledger' },
  { id: 'pg', x: 20, y: 432, w: 160, h: 50, title: 'PostgreSQL', sub: 'OLTP · row security', icon: 'db' },
  { id: 'vec', x: 200, y: 432, w: 160, h: 50, title: 'Vector store', sub: 'Qdrant · pgvector', icon: 'db' },
  { id: 'queue', x: 380, y: 432, w: 160, h: 50, title: 'Redis · queue', sub: 'cache · BullMQ', icon: 'db' },
];

const PATHS: Record<string, string> = {
  c1: 'M280 74 V118',
  c2: 'M280 168 V212',
  c3a: 'M280 262 C280 290 100 286 100 314',
  c3b: 'M280 262 V314',
  c3c: 'M280 262 C280 290 460 286 460 314',
  c4a: 'M100 372 V432',
  c4b: 'M280 372 V432',
  c4c: 'M460 372 V432',
};

const FLOWS = [
  { segs: ['c1', 'c2', 'c3a', 'c4a'], hits: ['edge', 'gateway', 'domain', 'pg'] },
  { segs: ['c1', 'c2', 'c3b', 'c4b'], hits: ['edge', 'gateway', 'ai', 'vec'] },
  { segs: ['c1', 'c2', 'c3c', 'c4c'], hits: ['edge', 'gateway', 'ledger', 'queue'] },
];

function Icon({ kind, x, y }: { kind: string; x: number; y: number }) {
  const t = `translate(${x} ${y})`;
  switch (kind) {
    case 'clients':
      return (
        <g className="n-ico" transform={t}>
          <rect x="0" y="1" width="11" height="8" rx="1.5" />
          <path d="M3 12h5" />
          <rect x="13" y="2" width="5" height="10" rx="1.2" />
        </g>
      );
    case 'shield':
      return (
        <g className="n-ico" transform={t}>
          <path d="M8 1 L14 3.5 V7.5 C14 11 11.5 13 8 14 C4.5 13 2 11 2 7.5 V3.5 Z" />
          <path d="M5.5 7.5 L7.3 9.3 L10.5 6" />
        </g>
      );
    case 'gate':
      return (
        <g className="n-ico" transform={t}>
          <path d="M1 7 H15 M10 3 L14 7 L10 11" />
          <path d="M1 2 V12" />
        </g>
      );
    case 'boxes':
      return (
        <g className="n-ico" transform={t}>
          <rect x="1" y="1" width="6" height="6" rx="1" />
          <rect x="9" y="1" width="6" height="6" rx="1" />
          <rect x="5" y="9" width="6" height="5" rx="1" />
        </g>
      );
    case 'spark':
      return (
        <g className="n-ico" transform={t}>
          <path d="M8 1 L9.6 6.4 L15 8 L9.6 9.6 L8 15 L6.4 9.6 L1 8 L6.4 6.4 Z" />
        </g>
      );
    case 'ledger':
      return (
        <g className="n-ico" transform={t}>
          <rect x="2" y="1" width="12" height="13" rx="1.5" />
          <path d="M5 5 H11 M5 8 H11 M5 11 H8" />
        </g>
      );
    default:
      return (
        <g className="n-ico" transform={t}>
          <ellipse cx="8" cy="3" rx="6" ry="2" />
          <path d="M2 3 V12 C2 13.1 4.7 14 8 14 C11.3 14 14 13.1 14 12 V3" />
          <path d="M2 7.5 C2 8.6 4.7 9.5 8 9.5 C11.3 9.5 14 8.6 14 7.5" />
        </g>
      );
  }
}

export default function ArchitectureDiagram() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root);
        const flows: gsap.core.Timeline[] = [];
        let visible = true;

        const intro = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.25 });
        intro
          .fromTo(q('.zone-g'), { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0)
          .fromTo(
            q('[data-node]'),
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.9, stagger: { each: 0.06, from: 'start' } },
            0.05,
          )
          .set(q('.conn'), { opacity: 1 }, 0.35)
          .fromTo(q('.conn'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.9, ease: 'power2.inOut', stagger: 0.05 }, 0.35)
          .fromTo(q('.conn-end'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.03 }, 0.9)
          .add(() => flows.forEach((f) => visible && f.play()));

        FLOWS.forEach((flow, i) => {
          const packet = q(`.packet-${i}`)[0];
          const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.6, delay: i * 1.15 });
          let t = 0;
          flow.segs.forEach((seg, j) => {
            const path = q(`#arch-${seg}`)[0] as unknown as SVGPathElement;
            const hl = q(`[data-hl="${flow.hits[j]}"]`)[0];
            const dur = Math.max(0.28, path.getTotalLength() / 170);
            tl.set(packet, { autoAlpha: 1 }, t)
              .to(packet, { duration: dur, ease: 'none', motionPath: { path, align: path, alignOrigin: [0.5, 0.5] } }, t)
              .set(packet, { autoAlpha: 0 }, t + dur)
              .fromTo(hl, { opacity: 0 }, { opacity: 1, duration: 0.12, ease: 'none' }, t + dur)
              .to(hl, { opacity: 0, duration: 0.7, ease: 'power2.out' }, t + dur + 0.17);
            // brief "processing" pause inside the node before the next hop
            t += dur + 0.14;
          });
          flows.push(tl);
        });

        // Don't burn frames when the figure is off-screen.
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle(self) {
            visible = self.isActive;
            flows.forEach((f) => (visible && intro.progress() === 1 ? f.play() : f.pause()));
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <figure className="arch" ref={root} aria-labelledby="arch-cap">
      <div className="arch-frame">
        <svg viewBox="0 0 560 500" role="img" aria-labelledby="arch-title arch-desc">
          <title id="arch-title">Reference architecture</title>
          <desc id="arch-desc">
            Clients pass through an edge layer and an API gateway into domain services, an AI orchestration layer
            and an event ledger, each backed by its own data store, all inside a private Kubernetes network.
          </desc>

          <g className="zone-g">
            <rect className="zone" x="6" y="196" width="548" height="300" rx="14" />
            <text className="zone-label" x="20" y="216">
              GKE / EKS
            </text>
            <text className="zone-label" x="540" y="216" textAnchor="end">
              PRIVATE VPC
            </text>
          </g>

          {Object.entries(PATHS).map(([id, d]) => (
            <path key={id} id={`arch-${id}`} className="conn" d={d} />
          ))}
          {[
            [280, 118],
            [280, 212],
            [100, 314],
            [280, 314],
            [460, 314],
            [100, 432],
            [280, 432],
            [460, 432],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} className="conn-end" cx={cx} cy={cy} r="2" />
          ))}

          {NODES.map((n) => {
            const center = n.w >= 220;
            const tx = center ? n.x + 46 : n.x + 36;
            return (
              <g key={n.id} data-node>
                <rect className="n-box" x={n.x} y={n.y} width={n.w} height={n.h} rx="10" />
                <rect className="n-hl" data-hl={n.id} x={n.x} y={n.y} width={n.w} height={n.h} rx="10" />
                <Icon kind={n.icon} x={center ? n.x + 18 : n.x + 12} y={n.y + n.h / 2 - 8} />
                <text className="n-title" x={tx} y={n.y + n.h / 2 - 2}>
                  {n.title}
                </text>
                <text className="n-sub" x={tx} y={n.y + n.h / 2 + 13}>
                  {n.sub}
                </text>
              </g>
            );
          })}

          {FLOWS.map((_, i) => (
            <circle key={i} className={`packet packet-${i}`} cx="0" cy="0" r="3.5" />
          ))}
        </svg>
      </div>
      <figcaption id="arch-cap">
        <span>fig. 01 — reference architecture</span>
        <span>request path · live</span>
      </figcaption>
    </figure>
  );
}
