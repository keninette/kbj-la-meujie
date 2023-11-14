import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../public/globals.css'

const inter = Inter({ subsets: ['latin'] })

// todo unique template or layout
// todo double google font import
export const metadata: Metadata = {
  title: 'kbj la meuji',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inconsolata" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
