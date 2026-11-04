import { ArrowRight, GitHub, Mail } from '@/components/ui/Icons';
import { PROFILE } from '@/lib/content';

export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow section-label">Contact</p>
          <h2 id="contact-title" data-split style={{ marginTop: 28 }}>
            Have a platform that has to be <span className="dim">right?</span>
          </h2>
          <p className="contact-copy" data-reveal>
            I&apos;m looking for a Solutions Architect or CTO role where I own the architecture end to end — in the
            room with clients, and in the code with the team. Happy to walk through any of the systems above in depth.
          </p>
          <div className="contact-actions" data-reveal>
            <a className="btn btn--primary" href={`mailto:${PROFILE.email}`}>
              <Mail /> Email me <ArrowRight />
            </a>
            <a className="btn btn--ghost" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
              <GitHub /> GitHub
            </a>
          </div>
        </div>
        <div className="contact-card" data-reveal>
          <dl>
            <div>
              <dt>email</dt>
              <dd>
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </dd>
            </div>
            <div>
              <dt>github</dt>
              <dd>
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                  github.com/lktiep
                </a>
              </dd>
            </div>
            <div>
              <dt>roles</dt>
              <dd>Solutions Architect · CTO · Head of Engineering</dd>
            </div>
            <div>
              <dt>work</dt>
              <dd>On-site, hybrid or remote</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
