import type { Metadata } from 'next';
import {
  CAPABILITIES,
  CASE_STUDIES,
  EXPERIENCE,
  PROFILE,
  PROOF,
  RECOGNITION,
} from '@/lib/content';
import './cv.css';

/* Printable résumé. Rendered to public/Jack-Le-CV.pdf by `npm run cv`;
   the page itself stays reachable for people who prefer a link. */

export const metadata: Metadata = {
  title: 'Jack Le — CV',
  description: `CV of ${PROFILE.name}, ${PROFILE.role}.`,
  robots: { index: false, follow: true },
  alternates: { canonical: '/cv' },
};

const YEARS = new Date().getFullYear() - PROFILE.since;
const host = (url: string) => url.replace(/^https?:\/\//, '');

function fmt(value: number, decimals = 0) {
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export default function CV() {
  const proof = PROOF.filter((p) => p.label !== PROOF[0].label);

  return (
    <div className="cv-root">
      <main className="cv">
        <header className="cv-head">
          <div>
            <h1>
              {PROFILE.name} <span>({PROFILE.legalName})</span>
            </h1>
            <p className="cv-role">{PROFILE.role}</p>
          </div>
          <ul className="cv-contact">
            <li>
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            </li>
            <li>
              <a href={PROFILE.site}>{host(PROFILE.site)}</a>
            </li>
            <li>
              <a href={PROFILE.github}>{host(PROFILE.github)}</a>
            </li>
            <li>Vietnam · English, Vietnamese</li>
          </ul>
        </header>

        <section className="cv-summary">
          <p className="cv-headline">{PROFILE.headline}</p>
          <p>
            {YEARS} years from multi-threaded telecom systems to AI-native products. I sit between the business and the
            engineers: run the solution workshop, draw the C4, write the ADRs, then build and load-test the first version
            myself. From a 300-engineer delivery division to the CTO seat, across telecom, insurance, banking,
            healthcare, enterprise SaaS, gaming, Web3 and AgriTech. Today I design AI-native systems: agent memory over
            MCP, server-authoritative economies, deterministic real-time simulation.
          </p>
        </section>

        <ul className="cv-proof">
          {proof.map((p) => (
            <li key={p.label}>
              <b>
                {fmt(p.value, p.decimals ?? 0)}
                {p.suffix}
              </b>
              <span>{p.label}</span>
            </li>
          ))}
        </ul>

        <section>
          <h2>Experience</h2>
          {EXPERIENCE.map((e) => (
            <article className="cv-job" key={e.period}>
              <div className="cv-job-head">
                <h3>
                  {e.role} <span>· {e.org}</span>
                </h3>
                <span className="cv-period">{e.period}</span>
              </div>
              <p className="cv-job-sum">{e.summary}</p>
              <ul className="cv-bullets">
                {e.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="cv-stack">{e.stack.join(' · ')}</p>
            </article>
          ))}
        </section>

        <section>
          <h2>Selected projects</h2>
          <div className="cv-projects">
            {CASE_STUDIES.map((c) => (
              <article className="cv-project" key={c.slug}>
                <div className="cv-job-head">
                  <h3>
                    {c.title} <span>· {c.role}</span>
                  </h3>
                  <span className="cv-period">{c.period}</span>
                </div>
                <p className="cv-kicker">{c.kicker}</p>
                <ul className="cv-evidence">
                  {c.evidence.slice(0, 2).map((ev) => (
                    <li key={ev.label}>
                      <b>{ev.value}</b> {ev.label}
                    </li>
                  ))}
                </ul>
                <p className="cv-stack">
                  {c.stack.slice(0, 5).join(' · ')}
                  {c.link ? (
                    <>
                      {' — '}
                      <a href={c.link.href}>{c.link.label}</a>
                    </>
                  ) : (
                    <> — {c.status}</>
                  )}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2>Capabilities</h2>
          <dl className="cv-caps">
            {CAPABILITIES.map((c) => (
              <div key={c.area}>
                <dt>{c.area}</dt>
                <dd>{c.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>Recognition</h2>
          <ul className="cv-bullets cv-recog">
            {RECOGNITION.map((r) => (
              <li key={r.title}>{r.title}</li>
            ))}
          </ul>
        </section>

        <footer className="cv-foot">
          Full case studies, architecture notes and benchmarks at <a href={PROFILE.site}>{host(PROFILE.site)}</a>
        </footer>
      </main>
    </div>
  );
}
