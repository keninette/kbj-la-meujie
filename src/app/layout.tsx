import type { Metadata } from 'next';
import { Inconsolata } from 'next/font/google';
import '../../public/globals.css';

const inconsolata = Inconsolata({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'kbj la meuji',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='fr'>
      <head></head>
      <body className={inconsolata.className}>{children}</body>
    </html>
  );
}
