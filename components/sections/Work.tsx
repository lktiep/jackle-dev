import Image from "next/image";
import { ALSO_BUILT, CASE_STUDIES, type CaseStudy } from "@/lib/content";
import { ArrowUpRight } from "@/components/ui/Icons";

function Media({ c }: { c: CaseStudy }) {
  if (c.image) {
    return (
      <figure>
        <div className="media-frame">
          <Image
            src={c.image.src}
            alt={c.image.alt}
            fill
            sizes="(min-width: 1280px) 680px, (min-width: 1024px) 54vw, 100vw"
            quality={72}
            data-parallax
          />
        </div>
        <figcaption className="media-caption">
          <span>{c.title} · production UI</span>
          <span>{c.period}</span>
        </figcaption>
      </figure>
    );
  }
  if (!c.spec) return null;
  return (
    <figure>
      <div className="artifact spec">
        <div className="artifact-bar">
          <span>{c.spec.file}</span>
          <span className="artifact-kind">spec</span>
        </div>
        <div className="spec-hero">
          <span className="spec-big">{c.spec.big}</span>
          <span className="spec-big-label">{c.spec.bigLabel}</span>
        </div>
        <div className="artifact-body">
          {c.spec.rows.map(([k, v], i) => (
            <div className="artifact-row" key={k}>
              <span className="artifact-ln" aria-hidden>
                {i + 1}
              </span>
              <span className="artifact-key">{k}</span>
              <span className="artifact-val">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="media-caption">
        <span>{c.status}</span>
        <span>{c.period}</span>
      </figcaption>
    </figure>
  );
}

function EndToEnd({ c }: { c: CaseStudy }) {
  const e = c.endToEnd;
  if (!e) return null;
  const titleId = `e2e-${c.slug}`;
  return (
    <section className="e2e" aria-labelledby={titleId}>
      <header className="e2e-head" data-reveal>
        <p className="mono e2e-eyebrow">
          <span className="accent">blank repo</span> → live production
        </p>
        <h4 id={titleId}>{e.title}</h4>
        <p>{e.intro}</p>
      </header>
      <div className="e2e-track">
        <div className="e2e-rail" aria-hidden>
          <span className="e2e-rail-fill" data-draw-x />
        </div>
        <ol className="e2e-stages">
          {e.stages.map((s, i) => (
            <li className="e2e-stage" key={s.id} data-step data-reveal>
              <span className="e2e-node" aria-hidden />
              <p className="mono e2e-idx">
                <span>{String(i + 1).padStart(2, "0")}</span> {s.discipline}
              </p>
              <p className="e2e-value">{s.value}</p>
              <p className="e2e-label">{s.label}</p>
              <p className="e2e-detail">{s.detail}</p>
            </li>
          ))}
        </ol>
      </div>
      <p className="mono e2e-note" data-reveal>
        {e.note}
      </p>
    </section>
  );
}

export default function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow section-label">02 / Selected work</p>
          <div>
            <h2 id="work-title" className="section-title" data-split>
              Systems I designed, built{" "}
              <span className="dim">and measured.</span>
            </h2>
            <p className="section-intro" data-reveal>
              Each one is written up the way I would present it to a client: the
              constraint that made it hard, the architecture that answered it,
              and the numbers that prove it held.
            </p>
          </div>
        </header>

        <div className="cases">
          {CASE_STUDIES.map((c, i) => (
            <div className="case-group" key={c.slug}>
              <article
                className={`case${i % 2 ? " case--flip" : ""}`}
                aria-labelledby={`case-${c.slug}`}
              >
                <div className="case-media" data-reveal>
                  <Media c={c} />
                </div>
                <div className="case-body">
                  <div data-reveal>
                    <p className="mono case-meta">
                      <span className="accent">{c.index}</span>
                      <span>{c.period}</span>
                      <span>{c.role}</span>
                    </p>
                    <h3 id={`case-${c.slug}`}>{c.title}</h3>
                    <p className="case-kicker">{c.kicker}</p>
                    <p className="case-summary">{c.summary}</p>
                  </div>

                  <div className="case-block" data-reveal>
                    <h4>The constraint</h4>
                    <p>{c.problem}</p>
                  </div>

                  <div className="case-block" data-reveal>
                    <h4>Architecture</h4>
                    <ul className="case-arch">
                      {c.architecture.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  {c.evidence.length > 0 && (
                    <div className="case-block" data-reveal>
                      <h4>Evidence</h4>
                      <ul className="case-evidence">
                        {c.evidence.map((e) => (
                          <li key={e.label}>
                            <b>{e.value}</b>
                            <span>{e.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="case-block" data-reveal>
                    <ul className="tags" aria-label="Stack">
                      {c.stack.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    <div className="case-foot mono">
                      <span>{c.status}</span>
                      {c.link && (
                        <a
                          className="link"
                          href={c.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {c.link.label} <ArrowUpRight />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
              <EndToEnd c={c} />
            </div>
          ))}
        </div>

        <div className="also">
          <p className="eyebrow section-label">Also built</p>
          <ul className="also-list">
            {ALSO_BUILT.map((a) => (
              <li key={a.title} data-reveal>
                <b>{a.title}</b>
                <p>{a.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
