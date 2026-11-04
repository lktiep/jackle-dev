import { EXPERIENCE } from '@/lib/content';

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="exp-title">
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow section-label">03 / Experience</p>
          <div>
            <h2 id="exp-title" className="section-title" data-split>
              Eighteen years, <span className="dim">engineer to CTO.</span>
            </h2>
            <p className="section-intro" data-reveal>
              Global telecom clients, Australian enterprise SaaS, two CTO seats, and now independent platform work —
              hands on the code at every step.
            </p>
          </div>
        </header>

        <div className="timeline">
          <span className="timeline-line" aria-hidden>
            <i data-draw-line />
          </span>
          <ol>
          {EXPERIENCE.map((r) => (
            <li className="role" key={`${r.period}-${r.org}`} data-reveal>
              <p className="role-period">{r.period}</p>
              <div>
                <h3>{r.role}</h3>
                <p className="role-org">{r.org}</p>
                <p className="role-summary">{r.summary}</p>
                <ul className="tags" aria-label="Stack">
                  {r.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <ul className="role-points">
                {r.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
