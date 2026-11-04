import { LEVERAGE } from '@/lib/content';

export default function Leverage() {
  return (
    <section id="leverage" className="section" aria-labelledby="lev-title">
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow section-label">03 / AI leverage</p>
          <div>
            <h2 id="lev-title" className="section-title" data-split>
              AI multiplies what I ship. <span className="dim">Specs, gates and numbers keep it honest.</span>
            </h2>
            <p className="section-intro" data-reveal>
              I work with AI coding agents every day. They write much of the code; I own the spec, the gates and the
              measurement. That is how one engineer shipped a live game across every discipline, and how I get
              productive in fields I had never worked in.
            </p>
          </div>
        </header>

        <div className="lev">
          <ol className="lev-loop">
            {LEVERAGE.steps.map((s, i) => (
              <li className="lev-step" key={s.id} data-reveal>
                <span className="mono lev-no">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{s.verb}</h3>
                  <p>{s.body}</p>
                  <p className="mono lev-artifact">{s.artifact}</p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="lev-side" aria-label="Evidence">
            <dl className="lev-stats">
              {LEVERAGE.evidence.map((e) => (
                <div key={e.label} data-reveal>
                  <dt>{e.value}</dt>
                  <dd>{e.label}</dd>
                </div>
              ))}
            </dl>
            <div className="lev-territory" data-reveal>
              <p className="eyebrow">New territory, shipped</p>
              <dl>
                {LEVERAGE.territory.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
