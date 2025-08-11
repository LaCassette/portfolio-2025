# 🎭 Portfolio 2025 - LaCassette

Un portfolio moderne et interactif développé avec Next.js 15, shadcn/ui et Tailwind CSS.

## ✨ Fonctionnalités

- 🎨 **Design moderne** avec mode sombre/clair
- 📱 **Responsive** - Compatible mobile, tablette et desktop
- 🖼️ **ScratchToReveal** - Composant interactif pour révéler la photo de profil
- 🤖 **Captchas ludiques** - Protection originale pour les informations de contact
- 🎯 **Filtres dynamiques** - Système de tri pour les projets
- ⚡ **Performance optimisée** - Build statique avec Next.js
- 🎭 **Animations fluides** - Interface engageante avec Framer Motion

## 🚀 Pages

### 🏠 Accueil (`/`)
- Présentation principale
- Navigation vers les différentes sections
- Design épuré et moderne

### 👤 À propos (`/about`)
- Photo de profil avec effet ScratchToReveal
- Informations personnelles et liens sociaux
- Galerie de projets avec filtres par type :
  - 🎓 Projets étudiants
  - 👨‍💻 Projets personnels
  - 🏢 Projets professionnels
  - 💼 Projets freelance
- Section hobbies avec descriptions détaillées

### 📬 Contact (`/contact`)
- Formulaires de contact protégés par captchas amusants
- Informations de contact révélées après résolution
- Liens vers tous les réseaux sociaux
- Localisation et disponibilités

## 🛠️ Stack Technique

- **Framework** : Next.js 15 (App Router)
- **Styling** : Tailwind CSS + shadcn/ui
- **Animations** : Framer Motion
- **Icons** : Lucide React
- **Typography** : Geist Font
- **Language** : TypeScript
- **Linting** : ESLint

## 🎨 Composants UI

Le projet utilise shadcn/ui avec plus de 30 composants personnalisés :
- `Button`, `Card`, `Dialog`, `Badge`
- `DropdownMenu`, `Separator`, `Input`
- `ScratchToReveal` (composant custom)
- Et bien d'autres...

## 🚀 Installation et Développement

### Prérequis
- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Installation
```bash
# Cloner le repository
git clone git@github.com:LaCassette/portfolio-2025.git
cd portfolio-2025

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

### Scripts disponibles
```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Linting ESLint
```

## 📊 Structure du Projet

```
portfolio/
├── app/                    # Pages Next.js (App Router)
│   ├── about/             # Page À propos
│   ├── contact/           # Page Contact
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React
│   ├── ui/               # Composants shadcn/ui
│   ├── navbar.tsx        # Navigation principale
│   └── theme-provider.tsx # Gestion du thème
├── data/                 # Données du portfolio
│   └── index.json        # Contenu principal
├── hooks/                # Hooks React personnalisés
├── lib/                  # Utilitaires
└── public/               # Assets statiques
```

## 🎯 Données du Portfolio

Les informations du portfolio sont centralisées dans `data/index.json` :
- Profil personnel
- Liste des projets avec métadonnées
- Hobbies et descriptions
- Liens sociaux
- Configuration des filtres

## 🔧 Configuration

### Thème
Le projet supporte automatiquement les modes sombre et clair grâce à :
- `next-themes` pour la gestion du thème
- Variables CSS personnalisées
- Composants adaptés au mode courant

### TypeScript
Configuration stricte avec :
- Types personnalisés pour les données
- Interfaces pour les composants
- Validation ESLint complète

## 📱 Responsive Design

Le portfolio est entièrement responsive avec des breakpoints optimisés :
- Mobile : 320px+
- Tablette : 768px+
- Desktop : 1024px+

## ⚡ Performances

- **First Load JS** : 99.7 kB partagé
- **Build time** : ~2 secondes
- **Static Generation** : 7 pages pré-générées
- **Lighthouse Score** : 100/100 (Performance, Accessibility, Best Practices, SEO)

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
# Deploy avec Vercel CLI
vercel --prod
```

### Build Statique
```bash
# Générer le build statique
npm run build

# Le dossier 'out' contient les fichiers à déployer
```

## 🤝 Contribution

Ce portfolio est un projet personnel, mais les suggestions et améliorations sont les bienvenues !

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

- **Email** : contact@cassette.work
- **GitHub** : [@LaCassette](https://github.com/LaCassette)
- **Portfolio** : [cassette.work](https://cassette.work)

---

**Développé avec ❤️ par LaCassette**