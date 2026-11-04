'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PRACTICE } from '@/lib/content';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Artifact = (typeof PRACTICE)[number]['artifact'];

function ArtifactPanel({ a, step }: { a: Artifact; step: string }) {
  return (
    <div className="artifact">
      <div className="artifact-bar">
        <span>{a.title}</span>
        <span className="artifact-kind">{a.kind}</span>
      </div>
      <div className="artifact-body">
        {a.lines.map(([k, v], i) => (
          <div className="artifact-row" key={k} data-row>
            <span className="artifact-ln" aria-hidden>{i + 1}</span>
            <span className="artifact-key">{k}</span>
            <span className="artifact-val">{v}</span>
          </div>
        ))}
      </div>
      <div className="artifact-foot">step {step} · artifact</div>
    </div>
  );
}

export default function Practice() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(
        { desktop: '(min-width: 1024px)', reduce: '(prefers-reduced-motion: reduce)' },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };
          if (!desktop) return;

          const steps = q<HTMLElement>('.practice-step');
          const panels = q<HTMLElement>('.stage-panels .artifact');
          const indexEl = q<HTMLElement>('[data-stage-index]')[0];
          let current = -1;

          root.current!.classList.add('js-practice');

          const activate = (i: number) => {
            if (i === current) return;
            const prev = current;
            current = i;
            steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
            if (indexEl) indexEl.textContent = PRACTICE[i].step;

            if (reduce) {
              panels.forEach((p, k) => gsap.set(p, { autoAlpha: k === i ? 1 : 0 }));
              return;
            }
            const dir = prev < i ? 1 : -1;
            if (prev >= 0) {
              gsap.to(panels[prev], { autoAlpha: 0, y: -18 * dir, duration: 0.45, ease: 'power2.in', overwrite: true });
            }
            const next = panels[i];
            gsap.fromTo(
              next,
              { autoAlpha: 0, y: 24 * dir },
              { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: prev >= 0 ? 0.18 : 0, overwrite: true },
            );
            gsap.fromTo(
              next.querySelectorAll('[data-row]'),
              { autoAlpha: 0, x: -10 },
              { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06, delay: prev >= 0 ? 0.3 : 0.1 },
            );
          };

          panels.forEach((p, k) => gsap.set(p, { autoAlpha: k === 0 ? 1 : 0 }));
          activate(0);

          steps.forEach((step, i) => {
            ScrollTrigger.create({
              trigger: step,
              start: 'top 55%',
              end: 'bottom 55%',
              onToggle: (self) => self.isActive && activate(i),
            });
          });

          if (!reduce) {
            gsap.to(q('.stage-rail-fill'), {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: { trigger: q('.practice-steps')[0], start: 'top 55%', end: 'bottom 55%', scrub: 0.4 },
            });
          }

          return () => {
            root.current?.classList.remove('js-practice');
            steps.forEach((s) => s.classList.remove('is-active'));
          };
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="practice" className="section" ref={root} aria-labelledby="practice-title">
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow section-label">01 / Practice</p>
          <div>
            <h2 id="practice-title" className="section-title" data-split>
              How I take a system from a whiteboard to <span className="dim">production.</span>
            </h2>
            <p className="section-intro" data-reveal>
              The same four moves whether the client is an insurer, a bank, a game studio or a farm operator — and
              each one leaves an artifact behind that the team can hold me to.
            </p>
          </div>
        </header>

        <div className="practice-grid">
          <ol className="practice-steps">
            {PRACTICE.map((p) => (
              <li className="practice-step" key={p.id}>
                <span className="mono step-no">{p.step}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <ul className="tags" aria-label="Focus areas">
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <ArtifactPanel a={p.artifact} step={p.step} />
              </li>
            ))}
          </ol>

          <div className="practice-stage">
            <div className="practice-sticky">
              <div className="stage-rail">
                <span className="stage-rail-fill" />
              </div>
              <div className="stage-panels">
                {PRACTICE.map((p) => (
                  <ArtifactPanel a={p.artifact} step={p.step} key={p.id} />
                ))}
              </div>
              <p className="mono stage-index">
                step <b data-stage-index>01</b> / 0{PRACTICE.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
