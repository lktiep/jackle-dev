import ArchitectureDiagram from '@/components/hero/ArchitectureDiagram';
import { ArrowDown, ArrowRight } from '@/components/ui/Icons';
import { PROFILE } from '@/lib/content';

const YEARS = new Date().getFullYear() - PROFILE.since;

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="status" data-intro style={{ '--i': 0 } as React.CSSProperties}>
            <span className="status-dot" aria-hidden />
            Open to Solutions Architect &amp; CTO roles
          </p>
          <h1 id="hero-title" data-intro="lift" style={{ '--i': 1 } as React.CSSProperties}>
            {PROFILE.name}
            <span>{PROFILE.role}</span>
          </h1>
          <p className="hero-lede" data-intro="lift" style={{ '--i': 2 } as React.CSSProperties}>
            I architect platforms that <em>stay correct under load</em> — and lead the teams that ship them.
          </p>
          <p className="hero-sub" data-intro="lift" style={{ '--i': 3 } as React.CSSProperties}>
            {YEARS} years from multi-threaded telecom systems to AI-native products. I sit between the business and
            the engineers: run the solution workshop, draw the C4, write the ADRs, then build and load-test the first
            version myself.
          </p>
          <div className="hero-actions" data-intro style={{ '--i': 4 } as React.CSSProperties}>
            <a className="btn btn--primary" href="#work">
              Selected work <ArrowDown />
            </a>
            <a className="btn btn--ghost" href={`mailto:${PROFILE.email}`}>
              {PROFILE.email} <ArrowRight />
            </a>
          </div>
          <dl className="hero-meta" data-intro style={{ '--i': 5 } as React.CSSProperties}>
            <div>
              <dt className="sr">Based in</dt>
              <dd>
                <b>Vietnam</b> · on-site in USA, UK, Australia
              </dd>
            </div>
            <div>
              <dt className="sr">Languages</dt>
              <dd>
                <b>English</b> · Vietnamese
              </dd>
            </div>
          </dl>
        </div>
        <div data-intro style={{ '--i': 2 } as React.CSSProperties}>
          <ArchitectureDiagram />
        </div>
      </div>
    </section>
  );
}
