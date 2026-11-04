import { PROOF } from '@/lib/content';

function format(value: number, decimals = 0) {
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export default function Proof() {
  return (
    <section className="proof" aria-label="Selected numbers">
      <div className="wrap">
        <ul className="proof-grid">
          {PROOF.map((p) => (
            <li className="proof-item" key={p.label} data-reveal>
              <div className="proof-value">
                <span data-count={p.value} data-decimals={p.decimals ?? 0}>
                  {format(p.value, p.decimals)}
                </span>
                {p.suffix && <small>{p.suffix.trim()}</small>}
              </div>
              <p className="proof-label">{p.label}</p>
              <p className="proof-note">{p.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
