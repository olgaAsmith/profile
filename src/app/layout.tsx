import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Rubik, Unbounded } from 'next/font/google';
import { site } from '@/lib/site';
import './globals.css';

const sans = Rubik({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Unbounded({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const title = `${site.name} — ${site.role.toLowerCase()}`;
const description = site.intro;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    'frontend',
    'React',
    'Next.js',
  ],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [{ url: '/favicon.png' }],
  },
  openGraph: {
    title,
    description,
    locale: 'ru_RU',
    type: 'website',
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0B0D',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} scrollbar-custom min-h-screen bg-ink font-sans text-fg`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
