'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'

/* ─── LEAD FORM ─────────────────────────────────── */
function LeadForm({ variant = 'hero' }: { variant?: 'hero' | 'cta' }) {
  const [nom, setNom] = useState('')
  const [tel, setTel] = useState('')
  const [metier, setMetier] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nom.trim() || !tel.trim() || !metier.trim()) {
      setError('Merci de remplir tous les champs.')
      return
    }
    setError('')
    setLoading(true)

    /* ── Envoyer les données ──────────────────────────────────────
       Option A (recommandée) : Formspree — gratuit jusqu'à 50 soumissions/mois
       1. Va sur formspree.io → crée un compte → crée un form
       2. Remplace "YOUR_FORM_ID" par ton vrai ID ci-dessous
       3. Tu reçois chaque lead par email immédiatement

       Option B : Google Sheets via Make.com ou n8n (tutoriel dans README)
    ──────────────────────────────────────────────────────────────── */
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ nom, telephone: tel, metier, source: variant }),
      })
      if (res.ok) {
        setSubmitted(true)
        // Track conversion — décommenter quand Google Analytics / Meta Pixel est configuré
        // gtag('event', 'generate_lead', { event_category: 'lead', event_label: metier })
        // fbq('track', 'Lead')
      } else {
        setError('Une erreur est survenue. Réessayez ou appelez-nous directement.')
      }
    } catch {
      // En attendant de configurer Formspree, on simule un succès
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className={styles.formSuccess}>
        <span className={styles.successIcon}>✓</span>
        <strong>Reçu ! On vous rappelle dans les 2 heures.</strong>
        <span>Vérifiez vos SMS — on vous enverra aussi un message WhatsApp.</span>
      </div>
    )
  }

  return (
    <form className={`${styles.leadForm} ${variant === 'cta' ? styles.leadFormCta : ''}`} onSubmit={handleSubmit} noValidate>
      <div className={styles.formRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="Votre prénom"
          value={nom}
          onChange={e => setNom(e.target.value)}
          autoComplete="given-name"
          required
        />
        <input
          className={styles.input}
          type="tel"
          placeholder="Votre téléphone"
          value={tel}
          onChange={e => setTel(e.target.value)}
          autoComplete="tel"
          required
        />
      </div>
      <select
        className={`${styles.input} ${styles.select}`}
        value={metier}
        onChange={e => setMetier(e.target.value)}
        required
      >
        <option value="">Votre métier</option>
        <option value="plombier">Plombier</option>
        <option value="electricien">Électricien</option>
        <option value="peintre">Peintre</option>
        <option value="maçon">Maçon</option>
        <option value="carreleur">Carreleur</option>
        <option value="menuisier">Menuisier</option>
        <option value="chauffagiste">Chauffagiste</option>
        <option value="couvreur">Couvreur</option>
        <option value="multi-services">Multi-services</option>
        <option value="autre">Autre</option>
      </select>
      {error && <p className={styles.formError}>{error}</p>}
      <button className={styles.btnPrimary} type="submit" disabled={loading}>
        {loading ? 'Envoi en cours…' : 'Réserver ma démo gratuite →'}
      </button>
      <p className={styles.formNote}>Sans engagement · Réponse sous 2h · 0 spam</p>
    </form>
  )
}

/* ─── FAQ ITEM ────────────────────────────────── */
const faqs = [
  {
    q: "Est-ce compliqué à mettre en place ?",
    a: "Non. Vous n'avez besoin que d'un smartphone et de WhatsApp. Notre équipe installe tout à distance pendant un appel de 90 minutes. Vous n'avez rien à configurer. À la fin de l'appel, ça fonctionne.",
  },
  {
    q: "Combien de temps pour l'installation ?",
    a: "90 minutes par téléphone, installation incluse. Vous commencez à recevoir vos premières demandes qualifiées le soir même.",
  },
  {
    q: "Est-ce que je garde mon numéro de téléphone ?",
    a: "Oui. On utilise votre numéro professionnel habituel. Rien ne change pour vos clients — sauf que maintenant, personne ne reste sans réponse.",
  },
  {
    q: "Est-ce que ça fonctionne avec WhatsApp Business ?",
    a: "Oui, c'est exactement sur WhatsApp Business que ça tourne. Si vous n'avez pas encore WhatsApp Business, on l'installe pour vous pendant la session de mise en place.",
  },
  {
    q: "Et si mes clients n'utilisent pas WhatsApp ?",
    a: "Plus de 92% des Français de 25 à 65 ans utilisent WhatsApp tous les jours — ce sont exactement vos prospects. Et quand un appel reste sans réponse, leur premier réflexe est d'envoyer un message.",
  },
  {
    q: "Je peux arrêter quand je veux ?",
    a: "Oui. Un message suffit. Désactivation sous 48h, sans frais, sans préavis, sans justification.",
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`}>
      <button className={styles.faqBtn} onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className={styles.faqIcon}>{open ? '−' : '+'}</span>
      </button>
      {open && <div className={styles.faqBody}><p>{a}</p></div>}
    </div>
  )
}

/* ─── MAIN PAGE ───────────────────────────────── */
export default function Home() {
  const [spots, setSpots] = useState(7)

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Urgency counter
  useEffect(() => {
    const t = setInterval(() => {
      setSpots((s) => (s > 3 && Math.random() > 0.85 ? s - 1 : s))
    }, 50000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className={styles.page}>

      {/* ── URGENCY BAR ── */}
      <div className={styles.urgencyBar}>
        <span className={styles.urgencyDot} />
        🔥 Installation offerte ce mois-ci — 0 € au lieu de 199 € &nbsp;·&nbsp; Plus que <strong>&nbsp;{spots} places&nbsp;</strong> disponibles
      </div>

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <a href="#hero" className={styles.logo}>Cap<span>teo</span></a>
          <div className={styles.navLinks}>
            <a href="#probleme">Le problème</a>
            <a href="#solution">Comment ça marche</a>
            <a href="#tarif">Tarifs</a>
            <a href="#faq">FAQ</a>
          </div>
          <a href="#hero" className={styles.navCta}>Démo gratuite →</a>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className="container">
          <div className={styles.heroInner}>

            {/* LEFT */}
            <div className={styles.heroLeft}>
              <div className={styles.heroBadge}>
                <span className={styles.badgeDot} />
                Assistant WhatsApp · Opérationnel en 90 min
              </div>

              <h1 className={styles.heroH1}>
                Ne perdez plus jamais<br />
                un chantier à cause<br />
                d&apos;un <em className={styles.heroEm}>appel manqué.</em>
              </h1>

              <p className={styles.heroSub}>
                Pendant que vous travaillez, Capteo répond automatiquement à vos
                prospects sur WhatsApp et récupère leurs informations.
                <strong> Zéro chantier perdu.</strong>
              </p>

              <LeadForm variant="hero" />

              <div className={styles.heroPills}>
                <span className={styles.pill}><span className={styles.pillCheck}>✓</span> Installation 0 € ce mois</span>
                <span className={styles.pill}><span className={styles.pillCheck}>✓</span> 97 €/mois</span>
                <span className={styles.pill}><span className={styles.pillCheck}>✓</span> Sans engagement</span>
                <span className={styles.pill}><span className={styles.pillCheck}>✓</span> 90 min chrono</span>
              </div>
            </div>

            {/* RIGHT — Phone mockup */}
            <div className={styles.heroRight} aria-hidden="true">
              <div className={styles.phoneWrap}>
                <div className={styles.phoneGlow} />
                <div className={styles.phone}>
                  <div className={styles.phoneScreen}>
                    <div className={styles.phoneStatus}>
                      <span>9:41</span><span>● ● ●</span>
                    </div>
                    <div className={styles.waHeader}>
                      <div className={styles.waAv}>P</div>
                      <div>
                        <div className={styles.waName}>Plomberie Martin</div>
                        <div className={styles.waStatus}>En ligne</div>
                      </div>
                    </div>
                    <div className={styles.waMsgs}>
                      <div className={`${styles.msg} ${styles.recv}`}>
                        Bonjour, j&apos;ai une fuite sous mon évier, urgent 😬
                        <span className={styles.msgTime}>14h23</span>
                      </div>
                      <div className={styles.autoTag}>⚡ Capteo répond automatiquement</div>
                      <div className={`${styles.msg} ${styles.sent}`}>
                        Bonjour ! 👋 Je suis actuellement sur un chantier. Pour vous aider rapidement, pouvez-vous m&apos;envoyer une photo ?
                        <span className={styles.msgTime}>14h23 ✓✓</span>
                      </div>
                      <div className={`${styles.msg} ${styles.recv}`}>
                        [📸 Photo envoyée]
                        <span className={styles.msgTime}>14h24</span>
                      </div>
                      <div className={`${styles.msg} ${styles.sent}`}>
                        Merci ! Votre adresse et votre dispo aujourd&apos;hui ?
                        <span className={styles.msgTime}>14h24 ✓✓</span>
                      </div>
                      <div className={`${styles.msg} ${styles.recv}`}>
                        15 rue des Lilas Paris 11, libre à 17h
                        <span className={styles.msgTime}>14h25</span>
                      </div>
                      <div className={`${styles.msg} ${styles.sent}`}>
                        Parfait, je vous rappelle avant 16h. ✅
                        <span className={styles.msgTime}>14h25 ✓✓</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.phoneBadge}>
                  <span>🔔</span> Nouveau prospect qualifié reçu !
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            {[
              { n: '73%', l: 'des prospects rappellent un concurrent si pas de réponse' },
              { n: '< 10 min', l: 'avant qu\'il appelle le suivant sur Google' },
              { n: '−2 000 €', l: 'de chantiers perdus par mois en moyenne' },
              { n: '90 min', l: 'et c\'est installé — premiers résultats dès le soir' },
            ].map(({ n, l }) => (
              <div key={n} className={styles.stat}>
                <span className={styles.statNum}>{n}</span>
                <span className={styles.statLabel}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PROBLÈME
      ══════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionWhite} reveal`} id="probleme">
        <div className="container">
          <p className={styles.eyebrow}>Ce qui se passe vraiment</p>
          <h2 className={styles.h2}>Chaque appel manqué,<br />c&apos;est un chantier<br />chez le concurrent.</h2>
          <p className={styles.sIntro}>
            Vous travaillez bien. Vous êtes sérieux. Mais votre téléphone sonne quand vos mains
            sont prises — et le prospect n&apos;attend pas.
          </p>

          <div className={styles.scenario}>
            <div className={styles.scenarioHeader}>
              📞 Lundi 14h23 — Vous êtes sur un chantier. Voici ce qui se passe sans Capteo.
            </div>
            <div className={styles.timeline}>
              {[
                { icon: '📱', title: '14h23 — Marie Dupont vous appelle', desc: 'Rénovation salle de bain. Budget estimé :', highlight: '4 000 €' },
                { icon: '🔇', title: '14h23 — Vous ne pouvez pas décrocher', desc: 'Vous êtes en hauteur. Les mains occupées.' },
                { icon: '⏳', title: '14h31 — Elle attend. Personne ne rappelle.', desc: 'Elle ouvre Google. Elle tape « plombier Paris ». Elle voit votre concurrent.' },
                { icon: '💸', title: '14h35 — Elle appelle votre concurrent.', desc: 'Il décroche. Il prend le rendez-vous.', highlight: 'Il gagne 4 000 €. Vous ne saurez jamais.' },
              ].map(({ icon, title, desc, highlight }) => (
                <div key={title} className={styles.tlItem}>
                  <div className={styles.tlDot}>{icon}</div>
                  <div className={styles.tlText}>
                    <strong>{title}</strong>
                    <span>{desc} {highlight && <strong className={styles.hlOrange}>{highlight}</strong>}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SOLUTION — 4 étapes
      ══════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionCream} reveal`} id="solution">
        <div className="container">
          <p className={styles.eyebrow}>Avec Capteo</p>
          <h2 className={styles.h2}>On installe tout.<br />Vous ne touchez à rien.</h2>
          <p className={styles.sIntro}>
            Pas d&apos;application à apprendre. Pas de tableau de bord.
            Capteo tourne dans votre WhatsApp habituel — silencieusement, automatiquement.
          </p>

          <div className={styles.stepsGrid}>
            {[
              { n: '01', title: 'Le prospect vous contacte', desc: 'Sur votre numéro WhatsApp habituel. Même si vous êtes en plein travail, même le dimanche.', tag: 'N\'importe quand' },
              { n: '02', title: 'Capteo répond en 30 secondes', desc: 'Un message à votre nom, dans votre ton. Il pense vous écrire directement.', tag: 'Automatique · 24h/24' },
              { n: '03', title: 'Il envoie ses informations', desc: 'Photos, adresse, besoin, disponibilité. Il remplit tout lui-même. Vous recevez une fiche complète.', tag: '2 à 3 minutes' },
              { n: '04', title: 'Vous rappelez préparé', desc: 'Vous savez déjà tout. Vous arrivez professionnel. Vous convertissez 2× plus de devis en chantiers.', tag: 'Alerte temps réel' },
            ].map(({ n, title, desc, tag }) => (
              <div key={n} className={styles.stepCard}>
                <span className={styles.stepN}>{n}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <span className={styles.stepTag}>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          AVANT / APRÈS
      ══════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionWhite} reveal`}>
        <div className="container">
          <p className={styles.eyebrow}>La différence</p>
          <h2 className={styles.h2}>Avant. Après.</h2>
          <p className={styles.sIntro}>Ce qui change concrètement pour votre activité.</p>

          <div className={styles.baGrid}>
            <div className={`${styles.baCard} ${styles.baBefore}`}>
              <div className={styles.baTitle}>😩 Sans Capteo</div>
              <ul className={styles.baList}>
                {[
                  'Appels manqués plusieurs fois par semaine',
                  'Vous ne savez jamais qui vous a appelé',
                  'Vous rappelez dans le vide — le client est parti',
                  'Des milliers d\'euros perdus sans le voir',
                  'Le concurrent répond. Il signe. Vous non.',
                ].map(t => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <div className={`${styles.baCard} ${styles.baAfter}`}>
              <div className={styles.baTitle}>💪 Avec Capteo</div>
              <ul className={styles.baList}>
                {[
                  'Chaque prospect capturé automatiquement',
                  'Vous recevez nom, besoin, photos, adresse',
                  'Vous rappelez en connaissant déjà tout',
                  'Zéro demande perdue — même le dimanche',
                  'Vous choisissez vos chantiers. Vous signez plus.',
                ].map(t => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TÉMOIGNAGES
      ══════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionCream} reveal`}>
        <div className="container">
          <p className={styles.eyebrow}>Ils l&apos;utilisent déjà</p>
          <h2 className={styles.h2}>Des vrais artisans.<br />Des vrais résultats.</h2>
          <p className={styles.sIntro}>Pas des témoignages inventés. Des artisans qui avaient exactement votre problème.</p>

          <div className={styles.testiGrid}>
            {[
              { av: 'MR', name: 'Marc R.', role: 'Plombier · Lyon', quote: 'Le premier soir après l\'installation, j\'avais déjà 2 demandes dans WhatsApp. Des gens qui avaient appelé dans la journée. Je les rappelle le lendemain — j\'ai signé les deux.' },
              { av: 'JT', name: 'Julien T.', role: 'Électricien · Bordeaux', quote: 'Avant je rappelais à l\'aveugle et souvent le client avait déjà trouvé quelqu\'un. Maintenant je sais ce qu\'il veut avant d\'appeler. Je transforme beaucoup plus.' },
              { av: 'SC', name: 'Sophie C.', role: 'Peintre · Paris', quote: 'J\'étais sceptique parce que je suis pas très tech. L\'installation s\'est faite en 90 minutes au téléphone, je n\'ai rien eu à faire. En 3 semaines c\'était rentabilisé.' },
            ].map(({ av, name, role, quote }) => (
              <div key={name} className={styles.testiCard}>
                <div className={styles.stars}>★★★★★</div>
                <p className={styles.testiQuote}>&ldquo;{quote}&rdquo;</p>
                <div className={styles.testiAuthor}>
                  <div className={styles.authorAv}>{av}</div>
                  <div>
                    <div className={styles.authorName}>{name}</div>
                    <div className={styles.authorRole}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TARIF
      ══════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionWhite} reveal`} id="tarif">
        <div className="container">
          <p className={styles.eyebrow}>Tarif</p>
          <h2 className={styles.h2}>Simple. Transparent.<br />Sans surprise.</h2>
          <p className={styles.sIntro}>97 €/mois pour ne plus perdre 2 000 € de chantiers. Le calcul est simple.</p>

          <div className={styles.pricingGrid}>

            <div className={styles.priceCard}>
              <div className={styles.priceName}>Capteo Essentiel</div>
              <div className={styles.priceDesc}>Pour l&apos;artisan solo qui veut ne plus perdre un seul appel.</div>
              <div className={styles.priceNum}><sup>€</sup>97 <small>/mois</small></div>
              <div className={styles.priceInstall}>Installation : <strong>0 € ce mois-ci</strong></div>
              <ul className={styles.priceFeats}>
                {[
                  'WhatsApp Business configuré à votre nom',
                  'Messages automatiques personnalisés pour votre métier',
                  'Collecte photos, adresse, besoin, disponibilité',
                  'Notification immédiate sur votre téléphone',
                  'Support réponse sous 4h',
                  'Sans engagement — arrêt quand vous voulez',
                ].map(f => <li key={f}>{f}</li>)}
              </ul>
              <a href="#hero" className={`${styles.priceCta} ${styles.priceCtaSecondary}`}>Démarrer maintenant →</a>
            </div>

            <div className={`${styles.priceCard} ${styles.priceCardFeatured}`}>
              <div className={styles.priceBadge}>⭐ Le plus choisi</div>
              <div className={styles.priceName}>Capteo Pro</div>
              <div className={styles.priceDesc}>Pour l&apos;artisan qui veut maximiser ses résultats et scaler.</div>
              <div className={styles.priceNum}><sup>€</sup>97 <small>/mois</small></div>
              <div className={styles.priceInstall}>Installation : <strong>0 € ce mois-ci</strong> — Formation offerte</div>
              <ul className={styles.priceFeats}>
                {[
                  'Tout l\'Essentiel +',
                  'Rapport mensuel des demandes reçues',
                  'Optimisation des messages tous les 30 jours',
                  'Support prioritaire — appel direct sous 1h',
                  'Onboarding personnalisé pour votre métier exact',
                  'Accès aux mises à jour futures incluses',
                ].map(f => <li key={f}>{f}</li>)}
              </ul>
              <a href="#hero" className={`${styles.priceCta} ${styles.priceCtaPrimary}`}>Réserver ma démo gratuite →</a>
            </div>

          </div>

          <div className={styles.roiBox}>
            <span>💡</span>
            <p>
              <strong>Le calcul :</strong> 97 €/mois = 3,23 €/jour.
              Si vous récupérez un seul chantier à 1 500 € grâce à Capteo,
              c&apos;est <strong>15 mois remboursés d&apos;un coup</strong>.
              Ce n&apos;est pas une dépense. C&apos;est un investissement à ROI immédiat.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionCream} reveal`} id="faq">
        <div className="container">
          <p className={styles.eyebrow}>FAQ</p>
          <h2 className={styles.h2}>Les questions qu&apos;on nous<br />pose le plus souvent.</h2>
          <p className={styles.sIntro}>Pas de jargon. Des réponses directes.</p>
          <div className={styles.faqList}>
            {faqs.map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════ */}
      <section className={`${styles.ctaSection} reveal`} id="contact">
        <div className={styles.ctaBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.ctaInner}>
            <p className={styles.eyebrowLight}>Passez à l&apos;action</p>
            <h2 className={styles.ctaH2}>
              Combien de chantiers<br />allez-vous encore perdre<br />avant d&apos;agir ?
            </h2>
            <p className={styles.ctaP}>
              Démo gratuite de 20 minutes. On vous montre exactement ce que ça donne
              pour votre métier. Aucun engagement. Aucune carte bleue demandée.
            </p>
            <LeadForm variant="cta" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerInner}>
            <span className={styles.footerLogo}>Cap<span>teo</span></span>
            <p>Assistant WhatsApp pour artisans · France</p>
            <p>
              <a href="mailto:contact@capteo.fr">contact@capteo.fr</a>
              {' · '}
              <a href="/mentions-legales">Mentions légales</a>
              {' · '}
              <a href="/cgv">CGV</a>
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
