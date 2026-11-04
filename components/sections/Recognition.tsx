import { RECOGNITION } from '@/lib/content';

export default function Recognition() {
  return (
    <section id="recognition" className="section" aria-labelledby="rec-title">
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow section-label">06 / Recognition</p>
          <h2 id="rec-title" className="section-title" data-split>
            Outside the day job.
          </h2>
        </header>
        <ul className="rec-list">
          {RECOGNITION.map((r, i) => (
            <li className="rec" key={r.title} data-reveal>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <h3>{r.title}</h3>
              <p className="rec-note">{r.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
