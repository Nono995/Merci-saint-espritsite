# 📋 Guide: Modifer "Notre Mission" depuis l'Admin

## 🚀 Comment ça marche ?

Vous pouvez maintenant **modifier le contenu de la section "Notre Mission"** directement depuis le panel admin, et **les modifications apparaissent instantanément** sur le site public.

---

## 📍 ÉTAPE 1: Créer la table dans Supabase

**Avant de tester**, exécutez ce SQL dans Supabase SQL Editor:

```sql
-- Copiez le contenu du fichier: SQL_MISSION_VISION.sql
-- Et exécutez-le dans Supabase Dashboard > SQL Editor
```

**OU** copiez-collez directement:
```sql
CREATE TABLE IF NOT EXISTS mission_vision_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description1 TEXT,
  description2 TEXT,
  image_url TEXT,
  stats_label1 VARCHAR(100),
  stats_value1 VARCHAR(50),
  stats_label2 VARCHAR(100),
  stats_value2 VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

INSERT INTO mission_vision_content (
  section_name,
  title,
  description1,
  description2,
  image_url,
  stats_label1,
  stats_value1,
  stats_label2,
  stats_value2
) VALUES (
  'mission',
  'Notre Mission',
  'Nous croyons en une foi active, authentique et transformatrice. Notre mission est de créer un espace où les gens peuvent grandir spirituellement, trouver du soutien communautaire et vivre l''impact du Christ dans leur vie quotidienne.',
  'Avec des services modernes, une communauté chaleureuse et un engagement envers les services d''intérêt général, nous sommes là pour vous accompagner dans votre parcours spirituel.',
  '/images/img1.jpg',
  'Membres actifs',
  '500+',
  'Années d''expérience',
  '15+'
);

ALTER TABLE mission_vision_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read mission_vision_content"
  ON mission_vision_content FOR SELECT
  TO anon
  USING (true);
```

---

## ✅ ÉTAPE 2: Accéder au Manager dans l'Admin

1. **Connectez-vous** à `http://localhost:3000/admin/dashboard`
2. Cliquez sur la catégorie **"À Propos"** (orange/indigo)
3. Cliquez sur **"Notre Mission & Statistiques"** (premier item)

---

## 🎯 ÉTAPE 3: Modifier le Contenu

Une interface apparaît avec:

### **Champs Modifiables:**

| Champ | Exemple | Type |
|-------|---------|------|
| **Titre Principal** | Notre Mission | Texte simple |
| **Premier Paragraphe** | Nous croyons en une foi... | Texte long (textarea) |
| **Deuxième Paragraphe** | Avec des services modernes... | Texte long (textarea) |
| **URL de l'Image** | /images/img1.jpg | URL |
| **Label Stat 1** | Membres actifs | Texte |
| **Valeur Stat 1** | 500+ | Texte |
| **Label Stat 2** | Années d'expérience | Texte |
| **Valeur Stat 2** | 15+ | Texte |

### **Actions Disponibles:**

- ✏️ **Modifier**: Clique sur "Modifier le Contenu"
- 💾 **Enregistrer**: Clique sur "Enregistrer les Modifications"
- ❌ **Annuler**: Clique sur "Annuler"
- 👁️ **Aperçu**: Voir les changements en temps réel

---

## 🔄 FLUX DE MISE À JOUR AUTOMATIQUE

### Comment ça marche:

```
1. ADMIN MODIFIE
   └─> Clique "Enregistrer les Modifications"
       └─> Données envoyées à Supabase
           └─> Table mission_vision_content updated

2. SITE PUBLIC SE MET À JOUR AUTOMATIQUEMENT
   └─> About.tsx recharge les données
       └─> React re-render le composant
           └─> Les nouvelles données s'affichent
```

### Les données sont **chargées en direct** depuis:
- **Composant**: `components/About.tsx`
- **Fonction**: `fetchData()` (ligne 48-75)
- **Requête**: 
  ```typescript
  const { data: missionData } = await supabase
    .from('mission_vision_content')
    .select('*')
    .eq('section_name', 'mission')
    .single()
  ```

---

## 🧪 TEST COMPLET: Vérifier que tout fonctionne

### **Test 1: Modifier le Titre**

1. Admin: Ouvrez "Notre Mission & Statistiques"
2. Cliquez "Modifier le Contenu"
3. Changez le **Titre Principal** de `Notre Mission` à `✨ Notre Vision Sacrée`
4. Cliquez "Enregistrer les Modifications"
5. **Public**: Rafraîchissez la page d'accueil (F5)
6. ✅ Vérifiez que le titre a changé

### **Test 2: Modifier un Paragraphe**

1. Admin: Modifiez le **Premier Paragraphe**
2. Remplacez par: `Ceci est un TEST de mise à jour!`
3. Cliquez "Enregistrer"
4. **Public**: Rafraîchissez (F5)
5. ✅ Le texte sur le site doit avoir changé

### **Test 3: Modifier les Statistiques**

1. Admin: Changez **Label Stat 1** de `Membres actifs` à `Congregants`
2. Changez **Valeur Stat 1** de `500+` à `1000+`
3. Cliquez "Enregistrer"
4. **Public**: Rafraîchissez (F5)
5. ✅ Les statistiques affichées doivent être mises à jour

### **Test 4: Vérifier l'Aperçu**

1. Admin: Sans cliquer "Enregistrer", regardez l'**Aperçu**
2. Les changements y sont affichés en direct (après enregistrement)

---

## 🔗 Autres Sections Gérées de la Même Façon

Voici comment modifier d'autres sections du site:

### **Services & Horaires**
- Admin → "Services & Horaires" → "Services Religieux"
- Ajouter/modifier/supprimer services

### **À Propos - Features**
- Admin → "À Propos" → "Features (À Propos)"
- Ajouter/modifier/supprimer les 3 features

### **Équipe**
- Admin → "Équipe & Communauté" → "Membres de l'Équipe"
- Ajouter/modifier/supprimer les membres

### **Témoignages**
- Admin → "Témoignages" → "Témoignages"
- Ajouter/modifier/supprimer les témoignages

---

## 🐛 Dépannage

### **Le contenu n'apparaît pas dans l'admin?**
- Vérifiez que la table `mission_vision_content` existe
- Vérifiez que vous avez inséré les données par défaut
- Vérifiez les RLS policies

### **Les modifications ne s'affichent pas sur le site?**
- Vérifiez la connexion à Supabase (variables .env.local)
- Attendez 1-2 secondes (délai réseau)
- Rafraîchissez la page (F5 ou Ctrl+Shift+R)
- Vérifiez la console du navigateur (F12 > Console) pour les erreurs

### **Le message "Aucun contenu mission trouvé" s'affiche?**
- Créez d'abord les données via SQL (voir ÉTAPE 1)
- Assurez-vous que `section_name = 'mission'`

---

## 📚 Fichiers Importants

| Fichier | Fonction |
|---------|----------|
| `SQL_MISSION_VISION.sql` | Crée la table et les données |
| `components/admin/MissionVisionManager.tsx` | Interface d'édition |
| `components/About.tsx` | Affiche les données sur le site |
| `app/admin/dashboard/page.tsx` | Ajoute le manager à l'admin |

---

## ✨ Conclusion

Vous pouvez maintenant:
- ✅ Modifier le titre, les paragraphes et les stats de "Notre Mission"
- ✅ Voir les changements en **temps réel** sur le site
- ✅ Gérer complètement le contenu sans coder
- ✅ Utiliser le même pattern pour d'autres sections

**C'est automatique, intuitif et sécurisé!** 🎉
