import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });
// ecommerce
export const metadata: Metadata = {
  title: 'Ler Mundo',
  description: 'Ler Mundo é um ecommerce de livros'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <meta property="og:image" content="/assets/og.webp" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />{' '}
      </body>
    </html>
  );
}
