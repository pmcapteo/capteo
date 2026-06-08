import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales — Capteo',
  robots: { index: false },
}

export default function MentionsLegales() {
  return (
    <div style={{ maxWidth: 760, margin: '80px auto', padding: '0 24px', fontFamily: 'DM Sans, sans-serif', color: '#374165', lineHeight: 1.7 }}>
      <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', color: '#0a1628', marginBottom: 32 }}>Mentions légales</h1>
      <p><strong>Éditeur du site :</strong> Capteo</p>
      <p><strong>Contact :</strong> contact@capteo.fr</p>
      <p style={{ marginTop: 24 }}><a href="/" style={{ color: '#e8460a' }}>← Retour à l'accueil</a></p>
    </div>
  )
}
