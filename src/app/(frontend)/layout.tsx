import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getSiteSettings } from '@/lib/payload/queries'
import { buildPageMetadata } from '@/lib/metadata'

import './styles.css'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata(
    settings.organizationName,
    settings.meta,
    settings.organizationShortName || settings.organizationName,
  )
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <html lang="ru">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
