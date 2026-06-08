import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Capteo — Ne perdez plus jamais un chantier à cause d\'un appel manqué',
  description: 'Capteo répond automatiquement à vos prospects sur WhatsApp pendant que vous travaillez. Récupérez des demandes qualifiées sans décrocher. Installation gratuite, 97€/mois, sans engagement.',
  keywords: 'assistant whatsapp artisan, réponse automatique whatsapp, appels manqués artisan, plombier électricien peintre, chantiers perdus, prospects qualifiés',
  authors: [{ name: 'Capteo' }],
  metadataBase: new URL('https://capteo.fr'),
  openGraph: {
    title: 'Capteo — Ne perdez plus jamais un chantier à cause d\'un appel manqué',
    description: 'Capteo répond automatiquement à vos prospects sur WhatsApp. Récupérez toutes vos demandes, même en plein chantier. 97€/mois, sans engagement.',
    url: 'https://capteo.fr',
    siteName: 'Capteo',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Capteo — Assistant WhatsApp pour artisans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Capteo — Ne perdez plus jamais un chantier',
    description: 'Capteo répond automatiquement à vos prospects sur WhatsApp pendant que vous travaillez.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Capteo',
  description: 'Assistant WhatsApp automatique pour artisans — répond à vos prospects quand vous êtes sur un chantier',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  offers: {
    '@type': 'Offer',
    price: '97',
    priceCurrency: 'EUR',
    priceSpecification: {
      '@type': 'RecurringChargeSpecification',
      billingPeriod: 'Month',
    },
  },
  provider: {
    '@type': 'Organization',
    name: 'Capteo',
    url: 'https://capteo.fr',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@capteo.fr',
      contactType: 'customer service',
      availableLanguage: 'French',
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '47',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        {/* ── SCHEMA.ORG ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />

        {/* ── GOOGLE ANALYTICS ── Remplace G-XXXXXXXXXX par ton vrai ID */}
        {/* 
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}} />
        */}

        {/* ── META PIXEL ── Remplace XXXXXXXXXXXXXXXX par ton vrai Pixel ID */}
        {/*
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'XXXXXXXXXXXXXXXX');
          fbq('track', 'PageView');
        `}} />
        */}

        {/* ── GOOGLE ADS ── Remplace AW-XXXXXXXXX par ton vrai ID */}
        {/*
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-XXXXXXXXX');
        `}} />
        */}
      </head>
      <body>{children}</body>
    </html>
  )
}
