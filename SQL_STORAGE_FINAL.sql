-- ============================================
-- CONFIGURATION FINALE DU STORAGE SUPABASE
-- ============================================

-- 1. Création des buckets s'ils n'existent pas
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('podcasts', 'podcasts', true, 104857600, ARRAY['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/x-m4a', 'audio/m4a', 'audio/mp4', 'audio/aac']), -- 100MB
  ('images', 'images', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']), -- 10MB
  ('short-videos', 'short-videos', true, 524288000, ARRAY['video/mp4', 'video/quicktime', 'video/webm']) -- 500MB
ON CONFLICT (id) DO UPDATE SET 
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Suppression des anciennes politiques pour éviter les doublons
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public podcast uploads" ON storage.objects;
DROP POLICY IF EXISTS "Public image uploads" ON storage.objects;
DROP POLICY IF EXISTS "Public video uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow All Access" ON storage.objects;

-- 3. Création des nouvelles politiques RLS pour le storage

-- Politique pour la lecture publique (TOUS les buckets)
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( true );

-- Politique pour l'upload (TOUS les buckets pour le développement)
CREATE POLICY "Allow All Access" 
ON storage.objects FOR ALL 
TO public
USING (true)
WITH CHECK (true);

-- Note: Si vous avez des erreurs de permission, assurez-vous que RLS est bien configuré 
-- sur la table storage.objects (elle l'est par défaut dans Supabase)
