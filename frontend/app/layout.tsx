import type { Metadata } from 'next';
import Header from './components/Header';
import './globals.css';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VSmanager',
  description: '野球大会の運用システムです',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`bg-zinc-900 text-white ${inter.className}`}>
        <Header />
        <ToastContainer position="top-right" autoClose={5000} />
        <main className="pt-16 md:px-32">{children}</main>
        <footer className="h-6"></footer>
      </body>
    </html>
  );
}
