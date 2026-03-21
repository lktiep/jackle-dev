import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import SmoothScroll from '@/components/providers/SmoothScroll';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jack Le (Tiep Le) — CTO & Technical Architect',
  description:
    'CTO / Head of Engineering with 15+ years building distributed systems, real-time platforms, and AI-native products across telecom, SaaS, gaming, Web3, and AgriTech.',
  keywords: [
    'CTO',
    'Technical Architect',
    'distributed systems',
    'real-time platforms',
    'AI',
    'full-stack',
    'Jack Le',
    'Tiep Le',
    'portfolio',
  ],
  authors: [{ name: 'Jack Le (Tiep Le)' }],
  openGraph: {
    title: 'Jack Le — CTO & Technical Architect',
    description:
      'CTO / Head of Engineering building distributed systems handling millions of users.',
    url: 'https://jackle.dev',
    siteName: 'jackle.dev',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jack Le — CTO & Technical Architect',
    description:
      'CTO / Head of Engineering building distributed systems and AI-native products.',
  },
  metadataBase: new URL('https://jackle.dev'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
