-- ============================================
-- MISE À JOUR DE LA TABLE PODCASTS
-- ============================================

-- Ajouter les colonnes manquantes à la table podcasts
ALTER TABLE podcasts 
ADD COLUMN IF NOT EXISTS episode VARCHAR(100),
ADD COLUMN IF NOT EXISTS speaker VARCHAR(255),
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS duration_seconds INTEGER,
ADD COLUMN IF NOT EXISTS date TEXT;

-- Mettre à jour les politiques RLS si nécessaire
-- (Elles sont déjà désactivées pour le développement dans SQL_COMPLETE.sql)

-- Insertion de données de test si la table est vide
INSERT INTO podcasts (title, episode, speaker, description, image_url, audio_url, duration_seconds, date)
SELECT 'La Foi en Action', 'Épisode 12', 'Pasteur Jean', 'Découvrez comment vivre sa foi au quotidien avec des exemples concrets et des enseignements pratiques.', '/images/img1.jpg', '/audio/sample.mp3', 1965, '15 Déc 2024'
WHERE NOT EXISTS (SELECT 1 FROM podcasts LIMIT 1);

INSERT INTO podcasts (title, episode, speaker, description, image_url, audio_url, duration_seconds, date)
SELECT 'Paroles de Vie', 'Épisode 8', 'Marie Dupont', 'Méditations inspirantes pour votre journée, basées sur les Écritures et la prière.', '/images/img2.jpg', '/audio/sample.mp3', 1692, '10 Déc 2024'
WHERE NOT EXISTS (SELECT 1 FROM podcasts WHERE title = 'Paroles de Vie');

INSERT INTO podcasts (title, episode, speaker, description, image_url, audio_url, duration_seconds, date)
SELECT 'Questions de Jeunesse', 'Épisode 15', 'Sophie Bernard', 'Réponses aux questions spirituelles des jeunes dans un format accessible et moderne.', '/images/img3.jpg', '/audio/sample.mp3', 2130, '5 Déc 2024'
WHERE NOT EXISTS (SELECT 1 FROM podcasts WHERE title = 'Questions de Jeunesse');
