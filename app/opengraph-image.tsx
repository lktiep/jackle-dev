import { ImageResponse } from 'next/og';

export const alt = 'Jack Le — CTO · Solutions & Technical Architect';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const rows = [
  ['Clients', 'web · mobile · AI agents'],
  ['Edge', 'CDN · WAF · signed tickets'],
  ['Gateway', 'authn · quotas · idempotency'],
  ['Services', 'domain · AI orchestration · ledger'],
  ['Data', 'PostgreSQL · vectors · queues'],
];

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0c0d0f',
          color: '#ececec',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 600 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: '#9a9ca3' }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: '#74d4a8' }} />
            jackle.dev
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Jack Le</div>
            <div style={{ fontSize: 30, color: '#9a9ca3', marginTop: 18 }}>CTO · Solutions & Technical Architect</div>
            <div style={{ fontSize: 34, marginTop: 40, lineHeight: 1.25, maxWidth: 560 }}>
              Platforms that stay correct under load — and the teams that ship them.
            </div>
          </div>
          <div style={{ fontSize: 20, color: '#63666d' }}>18 years · telecom · SaaS · gaming · AI systems</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14, marginLeft: 'auto', width: 420 }}>
          {rows.map(([t, s], i) => (
            <div
              key={t}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 20px',
                borderRadius: 12,
                border: `1px solid ${i === 2 ? '#74d4a8' : 'rgba(255,255,255,0.15)'}`,
                background: '#131518',
              }}
            >
              <div style={{ fontSize: 22 }}>{t}</div>
              <div style={{ fontSize: 16, color: '#63666d', marginTop: 4 }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
