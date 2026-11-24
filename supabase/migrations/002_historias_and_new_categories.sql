-- Add new categories
INSERT INTO categorias (nombre, icono, orden) VALUES
    ('Animales', 'bug', 7),
    ('Saludos', 'hand-metal', 8),
    ('Numeros', 'hash', 9),
    ('Objetos', 'box', 10),
    ('Adjetivos', 'sparkles', 11);

-- ============================================
-- HISTORIAS (stories/folklore)
-- ============================================
CREATE TABLE historias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(200) NOT NULL,
    resumen TEXT NOT NULL,
    contenido TEXT NOT NULL,
    fuente TEXT,
    icono VARCHAR(50),
    orden INT DEFAULT 0,
    publicada BOOLEAN DEFAULT true,
    creado_en TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE historias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read historias" ON historias FOR SELECT USING (publicada = true);
