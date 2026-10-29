import type { Metadata, Viewport } from "next"
import { Atkinson_Hyperlegible, Fraunces } from "next/font/google"
import "./globals.css"
import { SITE } from "@/lib/site"

const heading = Fraunces({ subsets: ["latin"], variable: "--font-heading", display: "swap" })
const body = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-body", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
  alternates: { canonical: "/" },
}

export const viewport: Viewport = {
  themeColor: "#2F4A36",
  width: "device-width",
  initialScale: 1,
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  foundingDate: String(SITE.founded),
  email: SITE.email,
  telephone: SITE.phone,
  logo: `${SITE.url}/icon.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    postalCode: SITE.address.postalCode,
    addressLocality: SITE.address.locality,
    addressCountry: SITE.address.country,
  },
  areaServed: SITE.address.locality,
  contactPoint: [{ "@type": "ContactPoint", telephone: SITE.phone, email: SITE.email, contactType: "customer service", availableLanguage: "pt-PT" }],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" className={`${heading.variable} ${body.variable}`}>
      <body>
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
      </body>
    </html>
  )
}

