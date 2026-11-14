# CLAUDE.md — KanaimoWiki

## What This Is

**KanaimoWiki** is a mobile-first web app for preserving and teaching the Pemón language (Kamarakoto dialect). Born from a physical dictionary by Professor Roger at the Canaima school in Gran Sabana, Venezuela. The app turns that book into a living, community-driven language learning platform powered by AI-assisted translation.

## Stack

```
Frontend:  React 19 + React Router v7 + Capacitor 8 (Android/iOS)
Styling:   Tailwind CSS 4 + custom design tokens
Backend:   Supabase (PostgreSQL, Auth, Storage, Edge Functions)
AI:        Gemini 2.5 Flash via edge functions (translation assist, pattern detection)
Audio:     Supabase Storage (pronunciation files, community recordings)
Build:     Vite (not CRA)
```

## Design System

### Brand Identity

- **Name:** KanaimoWiki
- **Tagline:** "El pemón vive en su gente"
- **Spirit:** Warm, organic, rooted in Gran Sabana — not corporate, not gamified

### Colors

```css
/* Earth tones inspired by Gran Sabana */
--color-primary:      #B8522E;  /* Tepuy terracotta — warm red-brown */
--color-primary-dark:  #8C3D22;
--color-primary-light: #D4845E;
--color-secondary:    #2A6B4A;  /* Selva green — deep jungle */
--color-secondary-light: #3D9B6A;
--color-accent:       #D4A843;  /* Gold — sun on savanna */
--color-bg:           #FDF8F3;  /* Warm parchment */
--color-bg-dark:      #1A1612;  /* Night in Canaima */
--color-surface:      #FFFFFF;
--color-surface-warm: #FAF3EB;  /* Slightly warm cards */
--color-text:         #2C1810;  /* Dark brown, not black */
--color-text-secondary: #6B5744;
--color-text-muted:   #A89480;

/* Status */
--color-confirmed:    #2A6B4A;  /* Word confirmed by elders */
--color-pending:      #D4A843;  /* Word pending review */
--color-community:    #5B8AB5;  /* Community-contributed */
```

### Typography

```css
/* Two fonts only */
--font-display: 'Playfair Display', serif;  /* Pemón words, headings */
--font-body:    'Inter', sans-serif;         /* UI text, Spanish */

/* Scale */
--text-xs:   0.75rem;   /* 12px — badges, captions */
--text-sm:   0.875rem;  /* 14px — secondary text */
--text-base: 1rem;      /* 16px — body */
--text-lg:   1.125rem;  /* 18px — card titles */
--text-xl:   1.25rem;   /* 20px — section headers */
--text-2xl:  1.5rem;    /* 24px — page titles */
--text-3xl:  2rem;      /* 32px — hero word */
--text-4xl:  2.5rem;    /* 40px — word of the day */
```

### Spacing & Layout

```css
/* Mobile-first: 390px reference (iPhone 14) */
--safe-top:    env(safe-area-inset-top);
--safe-bottom: env(safe-area-inset-bottom);
--nav-height:  64px;
--header-height: 56px;
--content-padding: 16px;
--card-radius: 16px;
--card-radius-sm: 12px;
--input-radius: 12px;
```

### Iconography

Lucide React icons. Supplement with custom SVG for cultural elements:
- Tepuy silhouette (app icon, empty states)
- Woven pattern borders (section dividers — inspired by Pemón basketry)
- Audio wave (pronunciation button)

---

## Screens & Components

### Navigation

**Bottom Tab Bar** — 4 tabs, always visible:

| Tab | Icon | Label | Route |
|-----|------|-------|-------|
| Inicio | `Home` | Inicio | `/` |
| Diccionario | `BookOpen` | Palabras | `/diccionario` |
| Traductor | `Languages` | Traducir | `/traductor` |
| Frases | `MessageSquare` | Frases | `/frases` |

Styling: warm parchment background, terracotta active indicator (pill shape behind icon+label), icons 24px, labels 11px. No shadow — use top border `1px solid rgba(0,0,0,0.06)`.

---

### Screen 1: Inicio (`/`)

The home screen is a daily touchpoint — inviting, not overwhelming.

```
┌─────────────────────────────┐
│  ☀ Buenos días              │  ← greeting by time of day
│                             │
│  ┌─────────────────────┐    │
│  │  PALABRA DEL DÍA    │    │
│  │                      │    │
│  │  W Ö I              │    │  ← Pemón word, large, Playfair
│  │  /wɤi/         🔊   │    │  ← IPA + audio button
│  │                      │    │
│  │  Sol                 │    │  ← Spanish translation
│  │  "Wöi da pöröda"    │    │  ← Example phrase, italic
│  │  El sol sale         │    │  ← Phrase translation
│  └─────────────────────┘    │
│                             │
│  Tu progreso                │
│  ┌──────┐ ┌──────┐ ┌─────┐ │
│  │ 23   │ │  5   │ │ 3   │ │
│  │ pal. │ │ días │ │fras.│ │  ← words learned, streak, phrases built
│  │apren.│ │racha │ │     │ │
│  └──────┘ └──────┘ └─────┘ │
│                             │
│  Categorías                 │
│  ┌─────────┐ ┌─────────┐   │
│  │ 🌿      │ │ 🏔️      │   │
│  │Naturaleza│ │ Lugares │   │
│  │  47 pal. │ │  23 pal.│   │
│  └─────────┘ └─────────┘   │
│  ┌─────────┐ ┌─────────┐   │
│  │ 👨‍👩‍👧‍👦      │ │ 🍽️      │   │
│  │ Familia │ │ Comida  │   │
│  │  31 pal. │ │  19 pal.│   │
│  └─────────┘ └─────────┘   │
│                             │
│  Recientes                  │
│  ┌──────────────────────┐   │
│  │ tepuy → montaña      │   │
│  │ tuna  → agua    🔊   │   │
│  │ wei   → sol          │   │
│  └──────────────────────┘   │
│                             │
│  [  ─  Palabras  ─  ─  ]   │  ← bottom nav
└─────────────────────────────┘
```

**Components:**
- `WordOfTheDay` — card with Pemón word, IPA, audio, translation, example phrase. Terracotta left accent bar. Tap to expand full entry.
- `ProgressStrip` — 3 metric cards (words learned, streak days, phrases built). Horizontal scroll if more added later.
- `CategoryGrid` — 2-column grid of topic categories. Each card: emoji, name, word count. Tap → filtered dictionary.
- `RecentWords` — last 5 words viewed. Simple list with audio button.

---

### Screen 2: Diccionario (`/diccionario`)

```
┌─────────────────────────────┐
│  Palabras                   │
│  ┌─────────────────────┐    │
│  │ 🔍 Buscar palabra...│    │  ← search bar, filters below
│  └─────────────────────┘    │
│  [Todas] [Confirmadas]      │
│  [Pendientes] [Mis aportes] │  ← pill filters
│                             │
│  Naturaleza (47)        ▾   │  ← collapsible category header
│  ┌─────────────────────┐    │
│  │ ● tepuy             │    │
│  │   montaña       🔊  │    │  ← green dot = confirmed
│  ├─────────────────────┤    │
│  │ ● tuna              │    │
│  │   agua          🔊  │    │
│  ├─────────────────────┤    │
│  │ ○ kaiwak            │    │
│  │   rayo              │    │  ← yellow dot = pending, no audio
│  └─────────────────────┘    │
│                             │
│  Familia (31)           ▾   │
│  ┌─────────────────────┐    │
│  │ ● yum               │    │
│  │   madre         🔊  │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │  + Proponer palabra  │    │  ← FAB or inline CTA
│  └─────────────────────┘    │
│                             │
│  [  ─  Palabras  ─  ─  ]   │
└─────────────────────────────┘
```

**Tap on a word → Word Detail Bottom Sheet:**

```
┌─────────────────────────────┐
│  ━━━  (drag handle)         │
│                             │
│  T E P U Y                  │  ← Pemón, large Playfair
│  /tepui/              🔊    │  ← IPA + audio
│                             │
│  montaña, cerro             │  ← Spanish translations
│                             │
│  Estado: ● Confirmada       │  ← green badge
│  Categoría: Naturaleza      │
│                             │
│  ── Nota ──                 │
│  "Formación rocosa típica   │
│   de la Gran Sabana.        │
│   Palabra de uso cotidiano."│
│                             │
│  ── Frases de ejemplo ──    │
│  "Tepuy entá pata"          │
│  El tepuy es grande         │
│                             │
│  ── Relacionadas ──         │
│  tuna (agua) · wöi (sol)    │
│                             │
│  [Marcar como aprendida ✓]  │
│                             │
└─────────────────────────────┘
```

**Components:**
- `SearchBar` — instant filter, debounced 200ms
- `FilterPills` — horizontal scroll: Todas, Confirmadas, Pendientes, Mis aportes
- `CategorySection` — collapsible, shows count, lazy-loads entries
- `WordCard` — status dot (green/yellow/blue), Pemón word, Spanish, audio button
- `WordDetailSheet` — bottom sheet (Framer Motion, drag-to-close), full word info
- `ProposeWordCTA` — opens contribution form

---

### Screen 3: Traductor (`/traductor`)

```
┌─────────────────────────────┐
│  Traducir                   │
│                             │
│  ┌─────────────────────┐    │
│  │ Español  ⇄  Pemón   │    │  ← toggle direction
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │                     │    │
│  │ montaña             │    │  ← input textarea
│  │                     │    │
│  └─────────────────────┘    │
│         ↓                   │
│  ┌─────────────────────┐    │
│  │                     │    │
│  │ tepuy          🔊   │    │  ← result, Playfair font
│  │                     │    │
│  │ ● Confirmada        │    │  ← status badge
│  │                     │    │
│  └─────────────────────┘    │
│                             │
│  ── o prueba con ──         │
│  [agua] [sol] [madre]       │  ← quick-try chips
│  [grande] [casa] [río]      │
│                             │
│  ── Historial ──            │
│  sol → wöi                  │
│  agua → tuna                │
│  casa → tapuy               │
│                             │
│  ┌─────────────────────┐    │
│  │ ⚠ Palabra no        │    │  ← shown when word not found
│  │   disponible aún.   │    │
│  │   ¿Quieres          │    │
│  │   proponerla?       │    │
│  └─────────────────────┘    │
│                             │
│  [  ─  ─  Traducir  ─  ]   │
└─────────────────────────────┘
```

**Components:**
- `DirectionToggle` — pill toggle español↔pemón with slide animation
- `TranslateInput` — textarea with auto-grow, max 200 chars
- `TranslateResult` — result card with audio, status badge. Shows "not found" state with proposal CTA
- `QuickChips` — horizontal scroll of common words to try
- `TranslateHistory` — last 10 translations, persisted in localStorage

---

### Screen 4: Frases (`/frases`)

```
┌─────────────────────────────┐
│  Constructor de Frases      │
│                             │
│  Arma una oración paso      │
│  a paso en pemón            │
│                             │
│  1. ¿Qué acción?            │
│  ┌──────┐ ┌──────┐ ┌─────┐ │
│  │[ir]  │ │ ver  │ │comer│ │  ← action chips
│  │      │ │      │ │     │ │
│  └──────┘ └──────┘ └─────┘ │
│  ┌──────┐ ┌──────┐         │
│  │beber │ │nadar │         │
│  └──────┘ └──────┘         │
│                             │
│  2. ¿Dónde?                 │
│  ┌──────┐ ┌──────┐ ┌─────┐ │
│  │[río] │ │monte │ │casa │ │
│  └──────┘ └──────┘ └─────┘ │
│                             │
│  ── Tu frase ──             │
│  ┌─────────────────────┐    │
│  │  Ir al río           │    │  ← Spanish
│  │                      │    │
│  │  Tuna pök arö        │    │  ← Pemón, large Playfair
│  │  /tuna pɤk arɤ/ 🔊  │    │
│  │                      │    │
│  │  ● Traducción        │    │
│  │    confirmada         │    │
│  └─────────────────────┘    │
│                             │
│  ── Frases guardadas ──     │
│  Ir al monte → Wö pök arö  │
│  Ver el sol → Wöi enato     │
│                             │
│  [  ─  ─  ─  Frases  ]     │
└─────────────────────────────┘
```

**Components:**
- `StepSelector` — numbered steps with chip selection. Step unlocks after previous selection.
- `PhraseResult` — constructed phrase in both languages. Only shows Pemón if all parts are available. Audio button if full phrase has recording.
- `SavedPhrases` — list of phrases the user has built and saved.

---

### Screen 5: Proponer Palabra (modal/page)

```
┌─────────────────────────────┐
│  ← Proponer palabra         │
│                             │
│  Palabra en pemón           │
│  ┌─────────────────────┐    │
│  │                     │    │
│  └─────────────────────┘    │
│                             │
│  Traducción en español      │
│  ┌─────────────────────┐    │
│  │                     │    │
│  └─────────────────────┘    │
│                             │
│  Categoría                  │
│  [Naturaleza ▾]             │
│                             │
│  Nota (opcional)            │
│  ┌─────────────────────┐    │
│  │ Contexto, uso,      │    │
│  │ variantes...        │    │
│  └─────────────────────┘    │
│                             │
│  Grabar pronunciación 🎙    │
│  ┌─────────────────────┐    │
│  │   ○ Toca para grabar│    │  ← Web Audio API
│  └─────────────────────┘    │
│                             │
│  Tu nombre (opcional)       │
│  ┌─────────────────────┐    │
│  │                     │    │
│  └─────────────────────┘    │
│                             │
│  [    Enviar propuesta    ] │
│                             │
│  Las palabras propuestas    │
│  son revisadas por el       │
│  profesor Roger y líderes   │
│  de la comunidad antes de   │
│  publicarse.                │
│                             │
└─────────────────────────────┘
```

---

## Data Model

### Core Tables

```sql
-- Categories for organizing words
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,            -- "Naturaleza", "Familia", "Comida"
    emoji VARCHAR(10),                     -- category icon
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- The dictionary: one row per word
CREATE TABLE words (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pemon VARCHAR(200) NOT NULL,           -- word in Pemón Kamarakoto
    spanish VARCHAR(200) NOT NULL,         -- Spanish translation(s)
    ipa VARCHAR(200),                      -- IPA pronunciation
    category_id UUID REFERENCES categories(id),
    note TEXT,                             -- contextual note, usage
    status VARCHAR(20) DEFAULT 'pending',  -- 'confirmed' | 'pending' | 'rejected'
    source VARCHAR(20) DEFAULT 'book',     -- 'book' | 'community' | 'ai_suggested'
    reviewed_by UUID,                      -- professor/elder who confirmed
    reviewed_at TIMESTAMPTZ,
    audio_url TEXT,                        -- Supabase Storage path
    contributed_by UUID,                   -- null if from book
    contributor_name VARCHAR(100),         -- optional display name
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Phrases: pre-built or user-constructed
CREATE TABLE phrases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pemon TEXT NOT NULL,
    spanish TEXT NOT NULL,
    ipa TEXT,
    category_id UUID REFERENCES categories(id),
    status VARCHAR(20) DEFAULT 'pending',
    audio_url TEXT,
    components JSONB,                      -- [{word_id, role: "action"|"place"|"object"}]
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Phrase building blocks (actions, places, objects)
CREATE TABLE phrase_parts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(20) NOT NULL,             -- 'action' | 'place' | 'object' | 'subject'
    pemon VARCHAR(200) NOT NULL,
    spanish VARCHAR(200) NOT NULL,
    word_id UUID REFERENCES words(id),     -- link to dictionary entry
    sort_order INT DEFAULT 0
);

-- Community word proposals (before review)
CREATE TABLE proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pemon VARCHAR(200) NOT NULL,
    spanish VARCHAR(200) NOT NULL,
    ipa VARCHAR(200),
    category_id UUID REFERENCES categories(id),
    note TEXT,
    audio_url TEXT,                         -- community-recorded pronunciation
    contributor_name VARCHAR(100),
    contributor_contact VARCHAR(200),       -- optional, for follow-up
    status VARCHAR(20) DEFAULT 'pending',   -- 'pending' | 'approved' | 'rejected'
    reviewer_note TEXT,                     -- feedback from reviewer
    reviewed_by UUID,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- User learning progress (anonymous, localStorage-first, optional sync)
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id VARCHAR(100) NOT NULL,       -- fingerprint, no auth required
    words_seen JSONB DEFAULT '[]',         -- [word_id, ...]
    words_learned JSONB DEFAULT '[]',      -- marked as learned
    phrases_built JSONB DEFAULT '[]',      -- phrase_id list
    translations JSONB DEFAULT '[]',       -- recent translations
    streak_days INT DEFAULT 0,
    last_active DATE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
```

### Storage Buckets

```
pronunciation/          -- confirmed audio by native speakers
  {word_id}.webm
community-audio/        -- community-submitted recordings (pre-review)
  {proposal_id}.webm
```

### RLS Policies

- `words`, `phrases`, `phrase_parts`, `categories`: public SELECT (no auth required to browse)
- `proposals`: public INSERT (anyone can propose), SELECT own proposals only, admin manages
- `user_progress`: scoped by `device_id` (no auth, localStorage fallback)
- Admin/reviewer role for Roger + elders: UPDATE on `words.status`, `proposals.status`

---

## AI Integration

### 1. Translation Assist (Edge Function: `translate-pemon`)

When a user searches a word not in the dictionary:
- Check if a similar word exists (fuzzy match via `pg_trgm`)
- If no match, call Gemini with the existing corpus as few-shot examples
- Return suggestion marked clearly as **AI-generated, not confirmed**
- Log the search as a signal (high-demand words get prioritized for review)

```
User searches "lluvia"
  → DB: no match
  → Gemini: "Based on the Kamarakoto corpus, 'konok' may mean lluvia.
             Confidence: low. This has NOT been verified."
  → UI: shows result with ⚠ AI badge, option to propose for review
```

### 2. Pattern Detection (Edge Function: `detect-patterns`)

As the corpus grows, Gemini analyzes confirmed entries to suggest:
- Grammatical patterns (word order, suffixes, prefixes)
- Semantic clusters (words that share roots)
- Missing translations in a category (e.g., "you have 8 animals but no word for 'fish'")

Runs as a batch job, results stored in `ai_insights` table for admin review.

### 3. Learning Path (client-side + edge)

Adaptive word ordering based on user progress:
- Spaced repetition for reviewed words
- Category-based learning paths (start with nature, expand to family, etc.)
- Difficulty estimation based on phonetic complexity and cognate similarity

### 4. Audio Transcription (future)

When community members submit audio:
- Whisper or Gemini transcribes to approximate IPA
- Reviewer validates transcription
- Multiple recordings per word allow dialect comparison

---

## Digitalization Strategy

### Phase 1: Book → Database

1. **Scan the physical dictionary** — high-res photos of each page
2. **OCR + manual correction** — Gemini Vision to extract text, human review for Pemón orthography
3. **Structured entry** — each word becomes a row: pemón, spanish, category, note
4. **Initial load** — bulk INSERT with `status: 'pending'`, `source: 'book'`
5. **Review session with Roger** — sit with the professor, go page by page, confirm entries
6. **Audio recording session** — Roger or native speakers record pronunciation per word

### Phase 2: Community Pipeline

1. Anyone can propose a word (no auth required, low friction)
2. Proposal enters `proposals` table with `status: 'pending'`
3. Roger + designated elders review via admin panel
4. Approved → moves to `words` table with `status: 'confirmed'`, `source: 'community'`
5. Rejected → gets reviewer note explaining why (dialect variant, incorrect, etc.)

### Phase 3: AI-Assisted Expansion

1. Gemini suggests missing words based on category gaps
2. Suggestions presented to Roger as candidates, never auto-published
3. Community votes on priority words to add next
4. High-search-volume words without results get flagged for attention

---

## Offline Strategy

Critical: Gran Sabana has limited/no connectivity. The app must work offline.

- **Service Worker** — cache dictionary data on first load
- **localStorage** — user progress, recent translations, search history
- **IndexedDB** — full word database cached locally (< 5MB for 5000 words)
- **Sync on connect** — when connection available, push proposals and sync new words
- **Audio pre-download** — option to download all pronunciation files for offline use (~50MB for 2000 words)

---

## Project Structure

```
kanaimowiki/
├── CLAUDE.md                      # This file
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css                  # Tailwind + custom tokens
│   ├── pages/
│   │   ├── HomePage.jsx           # Word of the day, progress, categories
│   │   ├── DictionaryPage.jsx     # Search, filter, browse
│   │   ├── TranslatePage.jsx      # Bidirectional translation
│   │   ├── PhrasesPage.jsx        # Phrase builder
│   │   └── ProposePage.jsx        # Word contribution form
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BottomNav.jsx      # 4-tab navigation
│   │   │   └── Header.jsx         # Page title, back button
│   │   ├── words/
│   │   │   ├── WordCard.jsx       # List item: status dot, word, translation, audio
│   │   │   ├── WordDetail.jsx     # Bottom sheet with full word info
│   │   │   ├── WordOfTheDay.jsx   # Hero card on home
│   │   │   └── AudioButton.jsx   # Play pronunciation
│   │   ├── translate/
│   │   │   ├── DirectionToggle.jsx
│   │   │   ├── TranslateInput.jsx
│   │   │   └── TranslateResult.jsx
│   │   ├── phrases/
│   │   │   ├── StepSelector.jsx   # Action/place/object chips
│   │   │   └── PhraseResult.jsx   # Constructed phrase display
│   │   ├── shared/
│   │   │   ├── FilterPills.jsx
│   │   │   ├── CategoryGrid.jsx
│   │   │   ├── ProgressStrip.jsx
│   │   │   ├── StatusBadge.jsx    # Confirmed/Pending/AI badge
│   │   │   └── SearchBar.jsx
│   │   └── proposal/
│   │       ├── ProposalForm.jsx
│   │       └── AudioRecorder.jsx  # Web Audio API recording
│   ├── hooks/
│   │   ├── useWords.js            # Supabase queries + cache
│   │   ├── useTranslate.js        # Translation logic + AI fallback
│   │   ├── useProgress.js         # localStorage progress tracking
│   │   └── useAudio.js            # Audio playback + recording
│   ├── services/
│   │   ├── supabaseClient.js
│   │   └── aiService.js           # Edge function calls
│   ├── utils/
│   │   ├── offlineStore.js        # IndexedDB + localStorage
│   │   └── fuzzyMatch.js          # Client-side search
│   └── data/
│       └── mockData.js            # Preview data (50+ words, categories, phrases)
├── supabase/
│   ├── migrations/
│   └── functions/
│       ├── translate-pemon/
│       └── detect-patterns/
├── public/
│   ├── index.html
│   └── assets/
│       ├── tepuy-silhouette.svg
│       └── woven-pattern.svg
├── android/                       # Capacitor
├── package.json
├── vite.config.js
├── tailwind.config.js
└── capacitor.config.ts
```

---

## Preview Build Instructions

For the first preview, build a **single interactive HTML file** (`preview.html`) that demonstrates the complete mobile UI with mock data. No backend needed yet.

### Requirements for preview.html

1. **Mobile viewport** — 390×844, centered on desktop with device frame
2. **All 4 screens functional** — tab navigation between Inicio, Diccionario, Traductor, Frases
3. **50+ mock dictionary entries** across 6 categories (Naturaleza, Familia, Comida, Lugares, Cuerpo, Acciones)
4. **Word of the Day** — random selection with example phrase
5. **Search** — instant filter on dictionary, works in both languages
6. **Translation** — bidirectional, resolves from mock data, shows "not found" for missing words
7. **Phrase builder** — functional step selection with result display
8. **Word detail** — bottom sheet on word tap with full info
9. **Status indicators** — green (confirmed), yellow (pending), blue (community)
10. **Audio buttons** — visual only (no real audio in preview), show play animation
11. **Animations** — smooth tab transitions, bottom sheet drag, chip selection
12. **Dark mode** — toggle in header, uses `--color-bg-dark` palette
13. **Proposal form** — functional UI with audio recorder placeholder
14. **Progress tracking** — mock counters that update when user interacts

### Mock Data Guidelines

Use real Pemón Kamarakoto words where possible. Known examples:
- tepuy (montaña), tuna (agua), wöi (sol), wei (sol variant), kaiwak (rayo)
- yum (madre), papa (padre), mure (hijo)
- kasiri (bebida de yuca), tukupi (salsa de yuca)
- parai (río), wëy (sabana), pata (grande), ichi (pequeño)
- arö (ir), enato (ver), ata (venir)

For words you're unsure about, mark them as `status: 'pending'` in the mock data. Never fabricate confirmed Pemón words.

---

## Commands

```bash
npm create vite@latest kanaimowiki -- --template react    # Init project
npm install                                                # Dependencies
npm run dev                                                # Dev server
npm run build                                              # Production build
npx cap sync                                               # Sync to Android
```

## Environment Variables

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GOOGLE_MAPS_API_KEY=        # Only if map features added later
```
