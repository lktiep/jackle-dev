import Marquee from '@/components/ui/Marquee';
import { CAPABILITIES, DOMAINS } from '@/lib/content';

export default function Capabilities() {
  return (
    <section id="capabilities" className="section" aria-labelledby="cap-title">
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow section-label">04 / Capabilities</p>
          <div>
            <h2 id="cap-title" className="section-title" data-split>
              Breadth to design the whole system, <span className="dim">depth to debug any layer of it.</span>
            </h2>
          </div>
        </header>

        <div className="cap-list">
          {CAPABILITIES.map((c, i) => (
            <div className="cap" key={c.area} data-reveal>
              <h3>
                <span className="mono">0{i + 1}</span>
                {c.area}
              </h3>
              <ul>
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="domains">
        <div className="wrap domains-head">
          <p className="eyebrow section-label">Domains</p>
        </div>
        <Marquee items={DOMAINS} hot={['Insurance', 'Banking', 'Healthcare']} />
      </div>
    </section>
  );
}
