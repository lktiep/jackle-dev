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
  title: 'Jackle — Developer & Creator',
  description:
    'Portfolio of Jackle — Full-stack developer crafting digital experiences with modern web technologies, AI, and creative engineering.',
  keywords: ['developer', 'portfolio', 'full-stack', 'react', 'next.js', 'AI'],
  authors: [{ name: 'Jackle' }],
  openGraph: {
    title: 'Jackle — Developer & Creator',
    description: 'Full-stack developer crafting digital experiences.',
    url: 'https://jackle.dev',
    siteName: 'jackle.dev',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jackle — Developer & Creator',
    description: 'Full-stack developer crafting digital experiences.',
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
