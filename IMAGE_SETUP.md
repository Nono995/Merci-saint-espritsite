# Guide d'Ajout d'Images - Site Merci Saint-Esprit Église

## Structure des Dossiers

Créez un dossier `public/images/` à la racine du projet:
```
web_site_ms/
├── public/
│   └── images/
│       ├── logo.png (déjà présent ✅)
│       ├── slider-1.jpg (Image Slider Entête)
│       ├── slider-2.jpg (Image Slider Entête)
│       ├── slider-3.jpg (Image Slider Entête)
│       ├── slider-4.jpg (Image Slider Entête)
│       ├── slider-5.jpg (Image Slider Entête)
│       ├── team-1.jpg (Community)
│       ├── team-2.jpg (Community)
│       ├── team-3.jpg (Community)
│       ├── team-4.jpg (Community)
│       ├── team-5.jpg (Community)
│       ├── team-6.jpg (Community)
│       ├── event-1.jpg (Events)
│       ├── event-2.jpg (Events)
│       ├── event-3.jpg (Events)
│       ├── event-4.jpg (Events)
│       ├── podcast-1.jpg (Podcasts)
│       ├── podcast-2.jpg (Podcasts)
│       ├── podcast-3.jpg (Podcasts)
│       ├── podcast-4.jpg (Podcasts)
│       ├── video-1.jpg (Short Videos)
│       ├── video-2.jpg (Short Videos)
│       ├── video-3.jpg (Short Videos)
│       ├── video-4.jpg (Short Videos)
│       ├── video-5.jpg (Short Videos)
│       ├── video-6.jpg (Short Videos)
│       └── gallery-*.jpg (Galerie - 9 images)
├── app/
├── components/
...
```

## Sections avec Images

### 0. Image Slider - Entête (Hero Section) 🎠
- **Fichiers**: `slider-1.jpg` à `slider-5.jpg`
- **Emplacements**: Composant `ImageSlider.tsx` (intégré dans `Hero.tsx`)
- **Format recommandé**: 1920x1080px ou 16:9 aspect ratio
- **Caractéristiques**: 
  - Carousel rotatif avec auto-play (change toutes les 4 secondes)
  - Navigation par flèches (chevrons) et points indicateurs
  - Drag/swipe support pour mobile
  - Animations fluides avec Framer Motion
  - Gradient overlay pour meilleure lisibilité du texte
  - Compteur d'images (ex: "1 / 5")

### 1. Community (6 personnes)
- **Fichiers**: `team-1.jpg` à `team-6.jpg`
- **Emplacements**: Composant `Community.tsx`
- **Format recommandé**: 400x400px (carré)

### 2. Events (4 événements)
- **Fichiers**: `event-1.jpg` à `event-4.jpg`
- **Emplacements**: Composant `Events.tsx`
- **Format recommandé**: 600x400px

### 3. Podcasts (4 podcasts)
- **Fichiers**: `podcast-1.jpg` à `podcast-4.jpg`
- **Emplacements**: Composant `Podcasts.tsx`
- **Format recommandé**: 400x300px

### 4. Short Videos (6 vidéos)
- **Fichiers**: `video-1.jpg` à `video-6.jpg`
- **Emplacements**: Composant `ShortVideos.tsx`
- **Format recommandé**: 600x900px (vertical)

### 5. Galerie (9 images)
- **Fichiers**: `gallery-1.jpg` à `gallery-9.jpg`
- **Emplacements**: Composant `Gallery.tsx`
- **Format recommandé**: 600x600px (carré)

## Comment Remplacer les Placeholders

Actuellement, tous les emojis sont des placeholders. Pour ajouter vos vraies images:

1. **Placez les fichiers** dans `public/images/`
2. **Les chemins sont déjà configurés** dans les composants avec `/images/[nom-fichier].jpg`
3. **Les images s'afficheront automatiquement** quand le navigateur les trouvera

## Format des Images Recommandé

- **Format**: JPG ou PNG
- **Compression**: 80-90% de qualité (pour une bonne performance)
- **Poids**: Entre 100KB et 500KB par image
- **Dimensions**: Voir section "Sections avec Images" ci-dessus

## Optimisation

Pour optimiser vos images:
- Utilisez un outil comme **TinyPNG** ou **ImageOptim**
- Respectez les dimensions recommandées
- Utilisez un format compressé (JPEG est préféré pour photos)

## Exemple d'Ajout d'Image

```
1. Prenez une photo de Jean Dupont (pasteur principal)
2. Redimensionnez-la à 400x400px
3. Compressez-la en JPG
4. Sauvegardez-la sous: public/images/team-1.jpg
5. Rechargez le site - l'image s'affichera automatiquement!
```

## Questions?

Les images utilisent Next.js Image Optimization automatiquement. 
Toutes les images s'adaptent parfaitement sur mobile, tablet et desktop.
