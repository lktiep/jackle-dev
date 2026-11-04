import { Download } from '@/components/ui/Icons';
import { CV_FILE, PROFILE } from '@/lib/content';

const LINKS = [
  ['#practice', 'Practice'],
  ['#work', 'Work'],
  ['#leverage', 'AI'],
  ['#experience', 'Experience'],
  ['#capabilities', 'Capabilities'],
];

export default function Nav() {
  return (
    <header className="nav" data-nav>
      <div className="wrap nav-inner">
        <a href="#top" className="brand">
          <span className="brand-mark" aria-hidden>JL</span>
          <span>{PROFILE.name}</span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="btn btn--ghost btn--sm btn--dl" href={CV_FILE.href} download={CV_FILE.name} aria-label="Download CV (PDF)">
            <Download /> CV
          </a>
          <a className="btn btn--ghost btn--sm" href="#contact">
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
