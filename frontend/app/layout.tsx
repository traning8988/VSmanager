import type { Metadata } from 'next'
import Header from './components/Header'
import './globals.css';
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"]});
 
export const metadata: Metadata = {
  title: 'VSmanager',
  description: "野球大会の運用システムです"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`bg-zinc-800 text-white ${inter.className}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}