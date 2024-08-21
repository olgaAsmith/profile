import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';

const rubik = Rubik({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: 'Profile',
  description: 'About me',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <body className={`scrollbar-custom min-h-screen flex ${rubik.className}`}>
        <div className='grow p-8 bg-slate-900'>
          <main className=''>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
