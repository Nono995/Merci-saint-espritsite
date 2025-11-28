import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Grace & Faith - Église Moderne',
  description: 'Une communauté de foi dynamique, accueillante et engagée',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-light">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
