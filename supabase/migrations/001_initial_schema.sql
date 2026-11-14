-- KanaimoWiki initial schema
-- Tables follow the data model from CLAUDE.md and 1CLAUDE.md
-- Field names in Spanish (reviewed by non-technical people)

-- ============================================
-- CATEGORIES
-- ============================================
CREATE TABLE categorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(50) NOT NULL,
    icono VARCHAR(50),
    orden INT DEFAULT 0,
    creado_en TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- WORDS (dictionary entries)
-- ============================================
CREATE TABLE palabras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    es VARCHAR(200) NOT NULL,
    pemon VARCHAR(200) NOT NULL DEFAULT '',
    variante VARCHAR(200),
    categoria_id UUID REFERENCES categorias(id),
    nota_cultural TEXT,
    fuente VARCHAR(20) DEFAULT 'libro'
        CHECK (fuente IN ('libro', 'comunidad', 'ai_sugerida')),
    pagina_libro VARCHAR(20),
    audio_archivo TEXT,
    estado VARCHAR(20) DEFAULT 'pendiente'
        CHECK (estado IN ('pendiente', 'propuesta', 'confirmada')),
    revisado_por UUID,
    fecha_revision TIMESTAMPTZ,
    contribuido_por UUID,
    nombre_contribuyente VARCHAR(100),
    creado_en TIMESTAMPTZ DEFAULT now(),
    actualizado_en TIMESTAMPTZ DEFAULT now(),

    -- Rule: confirmed words MUST have a reviewer
    CONSTRAINT confirmada_requiere_revisor
        CHECK (estado != 'confirmada' OR (revisado_por IS NOT NULL AND fecha_revision IS NOT NULL))
);

-- Index for text search (accent-insensitive via pg_trgm)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_palabras_pemon_trgm ON palabras USING gin (pemon gin_trgm_ops);
CREATE INDEX idx_palabras_es_trgm ON palabras USING gin (es gin_trgm_ops);
CREATE INDEX idx_palabras_estado ON palabras (estado);
CREATE INDEX idx_palabras_categoria ON palabras (categoria_id);

-- ============================================
-- PHRASES (parallel phrases)
-- ============================================
CREATE TABLE frases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    es TEXT NOT NULL,
    pemon TEXT NOT NULL DEFAULT '',
    en TEXT,
    fr TEXT,
    pt TEXT,
    ru TEXT,
    zh TEXT,
    situacion VARCHAR(100),
    categoria_id UUID REFERENCES categorias(id),
    estado_pemon VARCHAR(20) DEFAULT 'propuesta'
        CHECK (estado_pemon IN ('propuesta', 'confirmada')),
    estado_otros VARCHAR(20) DEFAULT 'automatica'
        CHECK (estado_otros IN ('automatica', 'revisada')),
    audio_archivo TEXT,
    componentes JSONB,
    creado_en TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- PHRASE PARTS (building blocks for phrase builder)
-- ============================================
CREATE TABLE partes_frase (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rol VARCHAR(20) NOT NULL
        CHECK (rol IN ('accion', 'lugar', 'objeto', 'sujeto')),
    pemon VARCHAR(200) NOT NULL,
    es VARCHAR(200) NOT NULL,
    palabra_id UUID REFERENCES palabras(id),
    orden INT DEFAULT 0
);

-- ============================================
-- PROPOSALS (community contributions, before review)
-- ============================================
CREATE TABLE propuestas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo VARCHAR(20) DEFAULT 'palabra'
        CHECK (tipo IN ('palabra', 'foto', 'palabra_y_foto')),
    es VARCHAR(200) NOT NULL,
    pemon VARCHAR(200),
    categoria_id UUID REFERENCES categorias(id),
    nota TEXT,
    audio_archivo TEXT,
    foto_archivo TEXT,
    nombre_contribuyente VARCHAR(100),
    contacto_contribuyente VARCHAR(200),
    estado VARCHAR(20) DEFAULT 'en_revision'
        CHECK (estado IN ('en_revision', 'aceptada', 'aceptada_con_cambios', 'rechazada')),
    nota_revisor TEXT,
    revisado_por UUID,
    fecha_revision TIMESTAMPTZ,
    creado_en TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- USER PROGRESS (anonymous, device-based)
-- ============================================
CREATE TABLE progreso_usuario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id VARCHAR(100) NOT NULL UNIQUE,
    palabras_vistas JSONB DEFAULT '[]',
    palabras_aprendidas JSONB DEFAULT '[]',
    frases_armadas JSONB DEFAULT '[]',
    traducciones JSONB DEFAULT '[]',
    dias_racha INT DEFAULT 0,
    ultimo_activo DATE,
    perfil JSONB DEFAULT '{}',
    creado_en TIMESTAMPTZ DEFAULT now(),
    actualizado_en TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_progreso_device ON progreso_usuario (device_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE palabras ENABLE ROW LEVEL SECURITY;
ALTER TABLE frases ENABLE ROW LEVEL SECURITY;
ALTER TABLE partes_frase ENABLE ROW LEVEL SECURITY;
ALTER TABLE propuestas ENABLE ROW LEVEL SECURITY;
ALTER TABLE progreso_usuario ENABLE ROW LEVEL SECURITY;

-- Public read access for dictionary data (no auth required to browse)
CREATE POLICY "Public read categorias" ON categorias FOR SELECT USING (true);
CREATE POLICY "Public read palabras" ON palabras FOR SELECT USING (true);
CREATE POLICY "Public read frases" ON frases FOR SELECT USING (true);
CREATE POLICY "Public read partes_frase" ON partes_frase FOR SELECT USING (true);

-- Anyone can submit proposals (low friction)
CREATE POLICY "Public insert propuestas" ON propuestas FOR INSERT WITH CHECK (true);

-- Progress: scoped by device_id, no auth
CREATE POLICY "Public upsert progreso" ON progreso_usuario
    FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- SEED CATEGORIES
-- ============================================
INSERT INTO categorias (nombre, icono, orden) VALUES
    ('Naturaleza', 'leaf', 1),
    ('Familia', 'users', 2),
    ('Comida', 'utensils', 3),
    ('Lugares', 'map-pin', 4),
    ('Cuerpo', 'heart', 5),
    ('Acciones', 'zap', 6);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.actualizado_en = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_palabras_updated
    BEFORE UPDATE ON palabras
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_progreso_updated
    BEFORE UPDATE ON progreso_usuario
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
