# Capteo — Guide de déploiement complet

> Lis ce guide du début à la fin avant de faire quoi que ce soit.
> Chaque étape est dans l'ordre. Ne saute rien.

---

## AVANT DE COMMENCER — Ce qu'il te faut

- Un ordinateur avec internet
- 1 heure devant toi
- Une carte bancaire (pour le nom de domaine — ~12€/an)
- Une adresse email

---

## ÉTAPE 1 — Créer un compte GitHub (gratuit)

GitHub = l'endroit où tu stockes le code de ton site.

1. Va sur **github.com**
2. Clique sur "Sign up"
3. Entre ton email, crée un mot de passe, choisis un nom d'utilisateur
4. Vérifie ton email

---

## ÉTAPE 2 — Créer un compte Vercel (gratuit)

Vercel = l'endroit qui met ton site en ligne automatiquement.

1. Va sur **vercel.com**
2. Clique sur "Sign Up"
3. Choisis "Continue with GitHub" — connecte ton compte GitHub
4. Autorise Vercel à accéder à GitHub

---

## ÉTAPE 3 — Installer les outils sur ton ordinateur

### Sur Mac :
Ouvre le Terminal (Applications → Utilitaires → Terminal)

```bash
# Installer Homebrew (si pas déjà installé)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installer Node.js
brew install node
```

### Sur Windows :
1. Va sur **nodejs.org**
2. Télécharge la version "LTS"
3. Lance l'installeur, clique "Next" partout

### Vérifier l'installation (Mac et Windows) :
Ouvre le Terminal / Invite de commandes et tape :
```bash
node --version
npm --version
```
Tu dois voir des numéros de version. Si oui, c'est bon.

---

## ÉTAPE 4 — Mettre le code dans un dossier

1. Copie le dossier `capteo` (celui que tu as reçu) sur ton bureau
2. Ouvre le Terminal
3. Navigue vers le dossier :

```bash
cd ~/Desktop/capteo
```

4. Installe les dépendances :
```bash
npm install
```

5. Lance le site en local pour tester :
```bash
npm run dev
```

6. Ouvre ton navigateur et va sur **http://localhost:3000**
7. Tu dois voir le site. Si oui, parfait. Tape `Ctrl+C` pour arrêter.

---

## ÉTAPE 5 — Configurer le formulaire (IMPORTANT — sans ça tu ne reçois pas les leads)

Le formulaire envoie les leads par email via Formspree (gratuit jusqu'à 50 leads/mois).

1. Va sur **formspree.io**
2. Crée un compte gratuit
3. Clique "New Form"
4. Donne-lui un nom : "Capteo Leads"
5. Copie l'ID du formulaire — il ressemble à `xyzabcde`
6. Ouvre le fichier `src/app/page.tsx`
7. Trouve la ligne :
   ```
   const res = await fetch('https://formspree.io/f/YOUR_FORM_ID',
   ```
8. Remplace `YOUR_FORM_ID` par ton vrai ID
9. Sauvegarde le fichier

À chaque nouveau lead, tu recevras un email avec : prénom, téléphone, métier.

**Option alternative :** Si tu veux 0 limite, utilise Make.com (gratuit) pour envoyer les leads dans Google Sheets. Dis-le moi et je te donne les instructions.

---

## ÉTAPE 6 — Créer un repository GitHub

1. Ouvre ton navigateur, va sur **github.com**
2. Connecte-toi
3. Clique sur le "+" en haut à droite → "New repository"
4. Nom du repository : `capteo`
5. Laisse tout le reste par défaut
6. Clique "Create repository"

---

## ÉTAPE 7 — Envoyer le code sur GitHub

Dans ton Terminal (dans le dossier capteo) :

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Premier déploiement Capteo"

# Connecter à GitHub (remplace TON_USERNAME par ton vrai username GitHub)
git remote add origin https://github.com/TON_USERNAME/capteo.git

# Envoyer le code
git branch -M main
git push -u origin main
```

Si GitHub te demande un mot de passe : utilise un "Personal Access Token".
Va sur GitHub → Settings → Developer Settings → Personal access tokens → Generate new token → coche "repo" → génère.

---

## ÉTAPE 8 — Déployer sur Vercel

1. Va sur **vercel.com**, connecte-toi
2. Clique "Add New Project"
3. Clique "Import" à côté de ton repository `capteo`
4. Vercel détecte automatiquement Next.js
5. Clique "Deploy"
6. Attends 2-3 minutes
7. Vercel te donne une URL du type `capteo-xyz.vercel.app`

Ton site est en ligne !

---

## ÉTAPE 9 — Acheter un nom de domaine

Je recommande **Namecheap** (moins cher que GoDaddy, interface plus claire).

1. Va sur **namecheap.com**
2. Cherche `capteo.fr`
3. Si disponible, ajoute au panier (~12€/an)
4. Crée un compte et paie

Alternatives si capteo.fr est pris :
- `getcapteo.fr`
- `capteo-artisan.fr`
- `capteo.co`

---

## ÉTAPE 10 — Connecter le domaine à Vercel

1. Dans Vercel, va dans ton projet → "Settings" → "Domains"
2. Entre ton domaine (ex: capteo.fr)
3. Vercel te donne des DNS à configurer
4. Va sur Namecheap → "Manage" ton domaine → "Advanced DNS"
5. Ajoute les enregistrements DNS que Vercel t'a donnés :
   - Type A : `@` → IP de Vercel
   - Type CNAME : `www` → cname.vercel-dns.com
6. Attends 5 à 30 minutes que la propagation se fasse

---

## ÉTAPE 11 — Créer une adresse email professionnelle

Option gratuite : **Zoho Mail** (1 adresse gratuite avec ton domaine)

1. Va sur **zoho.com/mail**
2. Clique "Sign up for free"
3. Entre ton domaine
4. Crée contact@capteo.fr
5. Configure les enregistrements DNS MX dans Namecheap (Zoho te les donne)

---

## ÉTAPE 12 — Configurer Google Analytics (pour voir le trafic)

1. Va sur **analytics.google.com**
2. Crée un compte → crée une propriété pour capteo.fr
3. Copie ton ID de mesure (format G-XXXXXXXXXX)
4. Ouvre `src/app/layout.tsx`
5. Trouve les commentaires `/* ── GOOGLE ANALYTICS ──`
6. Décommente le code (supprime les `/*` et `*/`)
7. Remplace `G-XXXXXXXXXX` par ton vrai ID
8. Recommit et push :
   ```bash
   git add .
   git commit -m "Ajout Google Analytics"
   git push
   ```
9. Vercel redéploie automatiquement en 2 minutes

---

## ÉTAPE 13 — Configurer Meta Pixel (pour les pubs Facebook/Instagram)

1. Va sur **business.facebook.com**
2. Events Manager → "Connect Data Sources" → "Web"
3. Crée un Pixel → copie l'ID (format XXXXXXXXXXXXXXXX)
4. Dans `src/app/layout.tsx`, décommente le code Meta Pixel
5. Remplace `XXXXXXXXXXXXXXXX` par ton vrai ID Pixel
6. Recommit et push

---

## ÉTAPE 14 — Tester que tout fonctionne

Checklist finale :

- [ ] Le site s'affiche sur ton domaine
- [ ] Le formulaire fonctionne (remplis-le avec un faux numéro, tu dois recevoir l'email)
- [ ] Le site s'affiche bien sur mobile (ouvre sur ton téléphone)
- [ ] Google Analytics voit des visites
- [ ] L'URL https:// fonctionne (Vercel gère le SSL automatiquement)

---

## CHAQUE FOIS QUE TU MODIFIES LE SITE

```bash
# Dans le dossier capteo
git add .
git commit -m "Description de ce que tu as changé"
git push
```

Vercel redéploie automatiquement. C'est en ligne en 2 minutes.

---

## PROBLÈMES FRÉQUENTS

**"npm: command not found"** → Node.js n'est pas installé. Retour étape 3.

**"git: command not found"** → Installe Git sur git-scm.com

**Le site ne s'affiche pas sur le domaine** → La propagation DNS peut prendre jusqu'à 48h. Sois patient.

**Le formulaire n'envoie pas** → Vérifie que tu as bien remplacé `YOUR_FORM_ID` par ton vrai ID Formspree.

**Vercel dit "Build Failed"** → Envoie-moi le message d'erreur exact.

---

## CONTACTS UTILES

- **Formspree support** : formspree.io/help
- **Vercel support** : vercel.com/help
- **Namecheap support** : namecheap.com/support

---

_Site Capteo — Version 1.0_
