-- ============================================
-- TABLE POUR MISSION & VISION
-- ============================================

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

-- Insert default mission content
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

-- Enable RLS
ALTER TABLE mission_vision_content ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users
CREATE POLICY "Allow authenticated users to read mission_vision_content"
  ON mission_vision_content FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update mission_vision_content"
  ON mission_vision_content FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert mission_vision_content"
  ON mission_vision_content FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Public access policy
CREATE POLICY "Allow public to read mission_vision_content"
  ON mission_vision_content FOR SELECT
  TO anon
  USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_mission_vision_content_updated_at BEFORE UPDATE ON mission_vision_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
