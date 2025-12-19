import type { Metadata } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gordon Self Storage | Autonomous Units in Rosslyn & Thunder Bay',
  description: 'Premium autonomous self storage in Rosslyn, ON. 24/7 digital access, climate controlled units, and instant online booking. Serving Thunder Bay and surrounding areas.',
  keywords: ['Self Storage Rosslyn', 'Storage Units Thunder Bay', 'Climate Controlled Storage', 'Autonomous Storage', 'Gordon Trailer Sales Storage'],
  openGraph: {
    title: 'Gordon Self Storage | Secure & Autonomous',
    description: 'Book your unit online instantly. 24/7 access in Rosslyn, ON.',
    type: 'website',
    locale: 'en_CA',
  },
}

// forcing rebuild
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
