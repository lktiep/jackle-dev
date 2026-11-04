import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { PROFILE } from '@/lib/content';
import './globals.css';

const geist = Geist({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const title = 'Jack Le — CTO · Solutions & Technical Architect';
const description =
  'Eighteen years designing and leading production platforms: AI agent infrastructure, server-authoritative economies, real-time simulation, multi-tenant SaaS. Telecom, enterprise SaaS, gaming, Web3 and AgriTech.';

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.site),
  title,
  description,
  applicationName: 'jackle.dev',
  authors: [{ name: 'Jack Le (Tiep Le)', url: PROFILE.site }],
  keywords: [
    'Solutions Architect',
    'Technical Architect',
    'CTO',
    'Head of Engineering',
    'distributed systems',
    'AI agents',
    'MCP',
    'LLM integration',
    'Google Cloud',
    'Kubernetes',
    'Jack Le',
    'Tiep Le',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    url: PROFILE.site,
    siteName: 'jackle.dev',
    type: 'profile',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0c0d0f',
  colorScheme: 'dark',
};

/* Runs before first paint. Adds `html.motion` only when the visitor allows
   motion; if the GSAP runtime hasn't booted within 4 s (blocked script,
   slow device), it removes the class so no content stays hidden. */
const motionBoot = `(function(){try{var d=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');setTimeout(function(){if(!window.__motionReady)d.classList.remove('motion')},4000)}catch(e){}})();`;

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jack Le',
  alternateName: 'Tiep Le',
  url: PROFILE.site,
  email: `mailto:${PROFILE.email}`,
  jobTitle: 'CTO · Solutions & Technical Architect',
  sameAs: [PROFILE.github],
  knowsAbout: [
    'Solution architecture',
    'Distributed systems',
    'AI agents and MCP',
    'LLM and OCR integration',
    'Google Cloud',
    'Kubernetes',
    'Real-time multiplayer systems',
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
