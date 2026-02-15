import { useState, useEffect, useRef, useCallback } from "react";

// ─── Unsplash Stock Images ────────────────────────────────────────
const U = (id, w = 1200, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;

const STOCK = {
  // Hero / Featured
  hero1: U("1487958449943-2429e8be8625", 1920, 1080), // dramatic modern building
  hero2: U("1545093149-618ce3bcf49d", 1920, 1080), // curved white architecture
  hero3: U("1511818966892-d7d671e672a2", 1920, 1080), // glass facade
  hero4: U("1518005020951-eccb494ad742", 1920, 1080), // concrete modern

  // Projects
  p1: U("1600585154340-be6161a56a0c", 1200, 800), // modern house exterior
  p2: U("1600607687939-ce8a6c25118c", 1200, 800), // gallery interior
  p3: U("1486325212027-8a9f06fcc23a", 1200, 800), // glass tower
  p4: U("1600566753086-00f18fb6b3ea", 1200, 800), // villa with pool
  p5: U("1618221195710-dd6b41faaea6", 1200, 800), // modern workspace
  p6: U("1506905925346-21bda4d32df4", 1200, 800), // public space / park
  p7: U("1512917774080-9991f1c4c750", 1200, 800), // mountain house
  p8: U("1574958269340-fa927503f3dd", 1200, 800), // museum interior
  p9: U("1497366216548-37526070297c", 1200, 800), // office building
  p10: U("1600210492486-724fe5c67fb0", 1200, 800), // loft interior

  // Project detail gallery extras
  d1: U("1600573472592-401b489a3cdc", 1600, 900),
  d2: U("1600585154526-990dced4db0d", 1600, 900),
  d3: U("1600607687644-aac4c3eac7f4", 1600, 900),
  d4: U("1600566753190-17f0baa2a6c0", 1600, 900),
  d5: U("1600210491892-ed2b03e2f6e0", 1600, 900),

  // Categories
  catResidential: U("1600585154340-be6161a56a0c", 800, 1000),
  catCultural: U("1574958269340-fa927503f3dd", 800, 1000),
  catCommercial: U("1486325212027-8a9f06fcc23a", 800, 1000),
  catInterior: U("1618221195710-dd6b41faaea6", 800, 1000),
  catPublic: U("1506905925346-21bda4d32df4", 800, 1000),

  // Studio / Team
  studio1: U("1497366811353-6870744d04b2", 1200, 800), // people working in studio
  studio2: U("1497366216548-37526070297c", 800, 1000),
  team1: U("1560250097-0b93528c311a", 400, 500), // portrait placeholder
  team2: U("1472099645785-5658abf4ff4e", 400, 500),
  team3: U("1580489944761-15a19d654956", 400, 500),
  team4: U("1507003211169-0a1dd7228f2d", 400, 500),
};

// ─── Data ──────────────────────────────────────────────────────────
const CATEGORIES = [
  { key: "All", label: "All Projects", img: STOCK.hero1, count: 10 },
  {
    key: "Residential",
    label: "Residential",
    img: STOCK.catResidential,
    count: 3,
  },
  { key: "Cultural", label: "Cultural", img: STOCK.catCultural, count: 2 },
  {
    key: "Commercial",
    label: "Commercial",
    img: STOCK.catCommercial,
    count: 2,
  },
  { key: "Interior", label: "Interior", img: STOCK.catInterior, count: 2 },
  { key: "Public", label: "Public", img: STOCK.catPublic, count: 1 },
];

const PROJECTS = [
  {
    id: 1,
    title: "Lakeside Pavilion",
    location: "Ohrid, Macedonia",
    category: "Residential",
    year: "2025",
    area: "480 m²",
    client: "Private",
    img: STOCK.p1,
    gallery: [STOCK.p1, STOCK.d1, STOCK.d2, STOCK.d5, STOCK.hero1],
    description:
      "A serene waterfront residence that blurs the boundary between interior and landscape. Floor-to-ceiling glazing frames panoramic lake views while deep overhangs provide natural shading. The material palette of local stone, white oak, and blackened steel creates a dialogue between tradition and modernity.",
  },
  {
    id: 2,
    title: "Mosaic Arts Center",
    location: "Skopje, Macedonia",
    category: "Cultural",
    year: "2024",
    area: "3,200 m²",
    client: "Municipality of Skopje",
    img: STOCK.p2,
    gallery: [STOCK.p2, STOCK.d3, STOCK.d1, STOCK.p8, STOCK.hero2],
    description:
      "An undulating roofline of perforated copper panels creates ever-changing light patterns across the gallery floors. The building is organized around a central atrium that serves as both circulation spine and exhibition space, encouraging spontaneous encounters between visitors and art.",
  },
  {
    id: 3,
    title: "Vertex Tower",
    location: "Skopje, Macedonia",
    category: "Commercial",
    year: "2025",
    area: "12,800 m²",
    client: "Vertex Group",
    img: STOCK.p3,
    gallery: [STOCK.p3, STOCK.hero3, STOCK.d4, STOCK.d1, STOCK.p9],
    description:
      "A 16-story commercial tower with a distinctive twisted geometry that optimizes daylight penetration and reduces wind load. The façade system of ceramic louvers responds to solar orientation, creating a dynamic skin that shifts in appearance throughout the day.",
  },
  {
    id: 4,
    title: "Stone Garden Villa",
    location: "Bitola, Macedonia",
    category: "Residential",
    year: "2024",
    area: "620 m²",
    client: "Private",
    img: STOCK.p4,
    gallery: [STOCK.p4, STOCK.d5, STOCK.d2, STOCK.d4, STOCK.hero4],
    description:
      "Nestled into a hillside, this residence is composed of three interlocking stone volumes connected by glass bridges. Each volume frames a specific landscape view — the mountain, the garden, and the sky — creating a sequence of curated natural experiences.",
  },
  {
    id: 5,
    title: "The Workshop",
    location: "Tetovo, Macedonia",
    category: "Interior",
    year: "2025",
    area: "340 m²",
    client: "CreativeLab",
    img: STOCK.p5,
    gallery: [STOCK.p5, STOCK.d3, STOCK.d1, STOCK.d5, STOCK.studio1],
    description:
      "A former textile warehouse transformed into a co-working space that celebrates its industrial heritage. Exposed brick walls and steel trusses contrast with refined insertions of white oak and brass. A double-height library anchors the social heart of the space.",
  },
  {
    id: 6,
    title: "Riverbank Promenade",
    location: "Skopje, Macedonia",
    category: "Public",
    year: "2024",
    area: "8,500 m²",
    client: "City of Skopje",
    img: STOCK.p6,
    gallery: [STOCK.p6, STOCK.d2, STOCK.d4, STOCK.d5, STOCK.hero1],
    description:
      "A 1.2km urban intervention that reconnects the city with its river. Stepped terraces of local travertine descend to the waterline, creating flexible social spaces that accommodate everything from morning joggers to evening concerts.",
  },
  {
    id: 7,
    title: "Horizon House",
    location: "Mavrovo, Macedonia",
    category: "Residential",
    year: "2023",
    area: "380 m²",
    client: "Private",
    img: STOCK.p7,
    gallery: [STOCK.p7, STOCK.d1, STOCK.d3, STOCK.d5, STOCK.hero4],
    description:
      "A mountain retreat designed as a single horizontal gesture in the landscape. The elongated plan maximizes views across the valley while a green roof seamlessly merges the building with the alpine meadow above. Rammed earth walls provide thermal mass and a connection to the terrain.",
  },
  {
    id: 8,
    title: "Gallery M",
    location: "Skopje, Macedonia",
    category: "Cultural",
    year: "2025",
    area: "1,800 m²",
    client: "Foundation M",
    img: STOCK.p8,
    gallery: [STOCK.p8, STOCK.d3, STOCK.d2, STOCK.p2, STOCK.hero2],
    description:
      "A private art gallery conceived as a sequence of rooms with precisely calibrated proportions and light conditions. Each gallery is tailored to a specific medium — painting, sculpture, photography — while a rooftop terrace offers views across the old bazaar.",
  },
  {
    id: 9,
    title: "Cedar Office Park",
    location: "Skopje, Macedonia",
    category: "Commercial",
    year: "2024",
    area: "6,400 m²",
    client: "Cedar Investments",
    img: STOCK.p9,
    gallery: [STOCK.p9, STOCK.d4, STOCK.d1, STOCK.d5, STOCK.hero3],
    description:
      "Three low-rise office buildings organized around a shared courtyard garden. The complex prioritizes biophilic design with planted façades, natural ventilation, and daylit interiors. An underground parking structure preserves the green campus above.",
  },
  {
    id: 10,
    title: "Loft Residence",
    location: "Skopje, Macedonia",
    category: "Interior",
    year: "2025",
    area: "220 m²",
    client: "Private",
    img: STOCK.p10,
    gallery: [STOCK.p10, STOCK.d5, STOCK.d3, STOCK.d2, STOCK.studio1],
    description:
      "A penthouse apartment where raw concrete ceilings and polished terrazzo floors create a refined industrial canvas. Custom walnut joinery defines living zones without partitions. A sculptural steel staircase connects to a private rooftop garden.",
  },
];

const SERVICES = [
  {
    title: "Architecture",
    desc: "From concept to completion — residential, commercial, and public buildings designed with meticulous attention to context, materiality, and light.",
  },
  {
    title: "Interior Design",
    desc: "Spatial experiences that balance function and atmosphere. We craft interiors that feel both inevitable and surprising.",
  },
  {
    title: "Urban Planning",
    desc: "Masterplans and urban interventions that create vibrant, walkable neighborhoods and reclaim underused public spaces.",
  },
  {
    title: "Renovation",
    desc: "Sensitive transformations of existing structures that honor their history while meeting contemporary needs.",
  },
  {
    title: "Landscape",
    desc: "Outdoor spaces designed as extensions of architecture — gardens, courtyards, and public landscapes that evolve with the seasons.",
  },
  {
    title: "Consultation",
    desc: "Expert guidance on feasibility, regulations, materials, and sustainability for projects at any stage of development.",
  },
];

const TEAM = [
  { name: "Ana Petrović", role: "Founding Partner", img: STOCK.team1 },
  { name: "Marko Dimitrov", role: "Design Director", img: STOCK.team2 },
  { name: "Elena Stojanova", role: "Lead Architect", img: STOCK.team3 },
  { name: "Stefan Iliev", role: "Project Manager", img: STOCK.team4 },
];

// ─── CSS ───────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500&family=Outfit:wght@200;300;400;500;600&family=Urbanist:wght@300;400;500;600;700;800&display=swap');

:root {
  --bg: #ffffff;
  --bg2: #f5f5f5;
  --bg3: #ebebeb;
  --black: #000000;
  --dark: #111111;
  --gray1: #333333;
  --gray2: #666666;
  --gray3: #999999;
  --gray4: #cccccc;
  --gray5: #e5e5e5;
  --white: #ffffff;
  --display: 'Urbanist', sans-serif;
  --logo: 'Cormorant Garamond', Georgia, serif;
  --body: 'Outfit', sans-serif;
  --ease: cubic-bezier(0.23, 1, 0.32, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--black); font-family: var(--body); -webkit-font-smoothing: antialiased; }

::selection { background: var(--black); color: var(--white); }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--gray4); border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: var(--gray3); }

img { user-select: none; -webkit-user-drag: none; }

@keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
@keyframes heroSlow { from { transform: scale(1.06); } to { transform: scale(1); } }
@keyframes lineGrow { from { width: 0; } to { width: 100%; } }
@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
`;

// ─── Shared ────────────────────────────────────────────────────────
const pad = "clamp(20px, 5vw, 72px)";

function SectionLabel({ children }) {
  return (
    <p
      style={{
        fontFamily: "var(--body)",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--gray3)",
        marginBottom: 12,
      }}
    >
      {children}
    </p>
  );
}

function SectionTitle({ label, title, sub, align = "left", style: sx = {} }) {
  return (
    <div style={{ textAlign: align, padding: `80px ${pad} 48px`, ...sx }}>
      <SectionLabel>{label}</SectionLabel>
      <h2
        style={{
          fontFamily: "var(--display)",
          fontSize: "clamp(28px, 4.2vw, 56px)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          style={{
            fontFamily: "var(--body)",
            fontSize: 16,
            fontWeight: 300,
            color: "var(--gray2)",
            marginTop: 16,
            maxWidth: 520,
            ...(align === "center" ? { margin: "16px auto 0" } : {}),
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

// ─── Header ────────────────────────────────────────────────────────
function Header({ currentPage, onNavigate, scrolled, dark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = [
    { key: "home", label: "Home" },
    { key: "projects", label: "Projects" },
    { key: "studio", label: "Studio" },
    { key: "services", label: "Services" },
    { key: "contact", label: "Contact" },
  ];

  const textColor =
    dark && !scrolled && !menuOpen ? "var(--white)" : "var(--black)";
  const dimColor =
    dark && !scrolled && !menuOpen ? "rgba(255,255,255,0.6)" : "var(--gray3)";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: `0 ${pad}`,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--gray5)"
            : "1px solid transparent",
          transition: "all 0.4s var(--ease)",
        }}
      >
        <div
          onClick={() => onNavigate("home")}
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            lineHeight: 1,
          }}
        >
          <span
            style={{
              fontFamily: "var(--logo)",
              fontSize: 30,
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: scrolled ? "var(--black)" : textColor,
              textTransform: "lowercase",
              transition: "color 0.3s",
            }}
          >
            stellar
          </span>
          <span
            style={{
              fontFamily: "var(--body)",
              fontSize: 9.5,
              fontWeight: 400,
              letterSpacing: "0.3em",
              color: scrolled ? "var(--gray3)" : dimColor,
              textTransform: "uppercase",
              transition: "color 0.3s",
              marginTop: 2,
            }}
          >
            Architecture
          </span>
        </div>

        <nav
          style={{ display: "flex", gap: 32, alignItems: "center" }}
          className="desktop-nav"
        >
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--body)",
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: "0.04em",
                color:
                  currentPage === item.key
                    ? scrolled
                      ? "var(--black)"
                      : textColor
                    : scrolled
                      ? "var(--gray3)"
                      : dimColor,
                transition: "color 0.3s",
                position: "relative",
                padding: "4px 0",
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = scrolled ? "var(--black)" : textColor)
              }
              onMouseLeave={(e) => {
                if (currentPage !== item.key)
                  e.target.style.color = scrolled ? "var(--gray3)" : dimColor;
              }}
            >
              {item.label}
              {currentPage === item.key && (
                <span
                  style={{
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: 1.5,
                    background: scrolled ? "var(--black)" : textColor,
                    borderRadius: 1,
                    transition: "background 0.3s",
                  }}
                />
              )}
            </button>
          ))}
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            fontFamily: "var(--body)",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: scrolled ? "var(--black)" : textColor,
            transition: "color 0.3s",
          }}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "var(--white)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            animation: "fadeIn 0.25s ease",
          }}
        >
          {items.map((item, i) => (
            <button
              key={item.key}
              onClick={() => {
                onNavigate(item.key);
                setMenuOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--display)",
                fontSize: 32,
                fontWeight: 700,
                color:
                  currentPage === item.key ? "var(--black)" : "var(--gray3)",
                animation: `fadeUp 0.4s var(--ease) ${i * 0.06}s both`,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────
function Hero({ onNavigate }) {
  const [idx, setIdx] = useState(0);
  const heroes = [
    { img: STOCK.hero1, project: PROJECTS[0] },
    { img: STOCK.hero2, project: PROJECTS[1] },
    { img: STOCK.hero3, project: PROJECTS[2] },
    { img: STOCK.hero4, project: PROJECTS[3] },
  ];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % heroes.length), 6000);
    return () => clearInterval(t);
  }, []);

  const { img: heroImg, project } = heroes[idx];

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "var(--black)",
      }}
    >
      {heroes.map((h, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === idx ? 1 : 0,
            transition: "opacity 1.4s ease",
          }}
        >
          <img
            src={h.img}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              animation: i === idx ? "heroSlow 10s ease-out forwards" : "none",
              filter: "brightness(0.65)",
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(48px, 10vh, 140px)",
          left: pad,
          right: pad,
          color: "var(--white)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--body)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.5,
            marginBottom: 20,
          }}
        >
          {String(idx + 1).padStart(2, "0")} /{" "}
          {String(heroes.length).padStart(2, "0")}
        </p>
        <h1
          key={idx}
          style={{
            fontFamily: "var(--display)",
            fontSize: "clamp(28px, 5vw, 60px)",
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            animation: "fadeUp 0.7s var(--ease) both",
            maxWidth: 750,
          }}
        >
          {project.title}
        </h1>
        <p
          key={idx + "l"}
          style={{
            fontFamily: "var(--body)",
            fontSize: 14,
            fontWeight: 300,
            letterSpacing: "0.03em",
            opacity: 0.5,
            marginTop: 14,
            marginBottom: 36,
            animation: "fadeUp 0.7s var(--ease) 0.08s both",
          }}
        >
          {project.location} — {project.category}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <button
            onClick={() => onNavigate("project", project.id)}
            style={{
              background: "var(--white)",
              color: "var(--black)",
              border: "none",
              padding: "15px 40px",
              fontFamily: "var(--body)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s var(--ease)",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "var(--gray5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "var(--white)";
            }}
          >
            View Project
          </button>

          {/* Dots */}
          <div style={{ display: "flex", gap: 8 }}>
            {heroes.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                style={{
                  width: i === idx ? 28 : 8,
                  height: 3,
                  border: "none",
                  background:
                    i === idx ? "var(--white)" : "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  borderRadius: 2,
                  transition: "all 0.5s var(--ease)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Category Cards ────────────────────────────────────────────────
function CategoryNav({ activeCategory, onSelect }) {
  const cats = CATEGORIES.filter((c) => c.key !== "All");
  const scrollRef = useRef(null);

  return (
    <section style={{ padding: `0 ${pad}` }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div />
        {activeCategory !== "All" && (
          <button
            onClick={() => onSelect("All")}
            style={{
              background: "none",
              border: "1px solid var(--gray5)",
              padding: "8px 20px",
              fontFamily: "var(--body)",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.06em",
              cursor: "pointer",
              color: "var(--gray2)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "var(--black)";
              e.target.style.color = "var(--black)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "var(--gray5)";
              e.target.style.color = "var(--gray2)";
            }}
          >
            ← Show All
          </button>
        )}
      </div>
      <div
        ref={scrollRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 8,
          marginBottom: 56,
        }}
        className="category-grid"
      >
        {cats.map((cat) => {
          const active = activeCategory === cat.key;
          return (
            <div
              key={cat.key}
              onClick={() => onSelect(active ? "All" : cat.key)}
              style={{
                position: "relative",
                cursor: "pointer",
                overflow: "hidden",
                aspectRatio: "3/4",
                outline: active ? "2px solid var(--black)" : "none",
                outlineOffset: -2,
              }}
              className="cat-card"
            >
              <img
                src={cat.img}
                alt={cat.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: active
                    ? "brightness(0.45)"
                    : "brightness(0.55) grayscale(0.3)",
                  transition: "all 0.5s var(--ease)",
                }}
                className="cat-card-img"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "clamp(12px, 2vw, 24px)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: "clamp(14px, 1.6vw, 20px)",
                    fontWeight: 700,
                    color: "var(--white)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {cat.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--body)",
                    fontSize: 11,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.5)",
                    marginTop: 4,
                  }}
                >
                  {cat.count} project{cat.count !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .cat-card:hover .cat-card-img { filter: brightness(0.4) grayscale(0) !important; transform: scale(1.04); }
        @media (max-width: 768px) {
          .category-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Project Grid ──────────────────────────────────────────────────
function ProjectGrid({ onNavigate, filter = "All", limit }) {
  const filtered = PROJECTS.filter(
    (p) => filter === "All" || p.category === filter,
  );
  const displayed = limit ? filtered.slice(0, limit) : filtered;

  // alternating large/small layout pattern
  const patterns = [
    { col: "span 8", ratio: "16/10" },
    { col: "span 4", ratio: "4/5" },
    { col: "span 4", ratio: "4/5" },
    { col: "span 8", ratio: "16/10" },
    { col: "span 6", ratio: "4/3" },
    { col: "span 6", ratio: "4/3" },
    { col: "span 4", ratio: "4/5" },
    { col: "span 4", ratio: "1/1" },
    { col: "span 4", ratio: "4/5" },
    { col: "span 12", ratio: "21/9" },
  ];

  return (
    <section style={{ padding: `0 ${pad}` }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 8,
        }}
        className="proj-grid"
      >
        {displayed.map((project, i) => {
          const p = patterns[i % patterns.length];
          return (
            <div
              key={project.id}
              onClick={() => onNavigate("project", project.id)}
              style={{
                gridColumn: p.col,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                animation: `fadeUp 0.5s var(--ease) ${Math.min(i * 0.06, 0.4)}s both`,
              }}
              className="proj-card"
            >
              <div
                style={{
                  aspectRatio: p.ratio,
                  overflow: "hidden",
                  background: "var(--bg2)",
                }}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition:
                      "transform 0.7s var(--ease), filter 0.7s var(--ease)",
                  }}
                  className="proj-card-img"
                />
              </div>
              <div
                className="proj-card-info"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 50%)",
                  opacity: 0,
                  transition: "opacity 0.4s var(--ease)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "clamp(16px, 2.5vw, 36px)",
                  color: "var(--white)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--body)",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    opacity: 0.5,
                    marginBottom: 6,
                  }}
                >
                  {project.category} — {project.year}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: "clamp(16px, 2vw, 26px)",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    marginBottom: 4,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--body)",
                    fontSize: 13,
                    fontWeight: 300,
                    opacity: 0.6,
                  }}
                >
                  {project.location}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .proj-card:hover .proj-card-img { transform: scale(1.04); }
        .proj-card:hover .proj-card-info { opacity: 1 !important; }
        @media (max-width: 900px) {
          .proj-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .proj-grid > * { grid-column: span 1 !important; }
        }
        @media (max-width: 520px) {
          .proj-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Marquee ───────────────────────────────────────────────────────
function Marquee() {
  const t = "STELLAR — ARCHITECTURE — DESIGN — SPACE — FORM — LIGHT — ";
  return (
    <div
      style={{
        overflow: "hidden",
        padding: "36px 0",
        borderTop: "1px solid var(--gray5)",
        borderBottom: "1px solid var(--gray5)",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "marquee 20s linear infinite",
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(24px, 4vw, 48px)",
              fontWeight: 700,
              color: "var(--gray5)",
              letterSpacing: "0.04em",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════ PAGES ═══════════════════════════════════════

function HomePage({ onNavigate }) {
  return (
    <div>
      <Hero onNavigate={onNavigate} />

      <SectionTitle
        label="Selected Work"
        title="Recent Projects"
        sub="A curated selection of our latest residential, cultural, and commercial work."
      />
      <ProjectGrid onNavigate={onNavigate} limit={6} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "48px 0 80px",
        }}
      >
        <button
          onClick={() => onNavigate("projects")}
          style={{
            background: "var(--black)",
            color: "var(--white)",
            border: "none",
            padding: "15px 48px",
            fontFamily: "var(--body)",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "var(--gray1)")}
          onMouseLeave={(e) => (e.target.style.background = "var(--black)")}
        >
          All Projects
        </button>
      </div>

      {/* Studio Teaser */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
        className="about-split"
      >
        <div
          style={{
            padding: `clamp(48px, 8vw, 120px) ${pad}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <SectionLabel>About Us</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(26px, 3.5vw, 44px)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            Architecture should serve the people who inhabit it
          </h2>
          <p
            style={{
              fontFamily: "var(--body)",
              fontSize: 15,
              fontWeight: 300,
              lineHeight: 1.8,
              color: "var(--gray2)",
              maxWidth: 440,
              marginBottom: 36,
            }}
          >
            Founded in Skopje, Stellar is a multidisciplinary studio driven by a
            commitment to thoughtful design, material honesty, and lasting
            relationships with our clients and communities.
          </p>
          <button
            onClick={() => onNavigate("studio")}
            style={{
              alignSelf: "flex-start",
              background: "none",
              border: "1px solid var(--black)",
              color: "var(--black)",
              padding: "13px 36px",
              fontFamily: "var(--body)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s var(--ease)",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "var(--black)";
              e.target.style.color = "var(--white)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "none";
              e.target.style.color = "var(--black)";
            }}
          >
            The Studio
          </button>
        </div>
        <div style={{ overflow: "hidden", minHeight: 400 }}>
          <img
            src={STOCK.studio1}
            alt="Studio"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <style>{`
          @media (max-width: 768px) {
            .about-split { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* Services Preview */}
      <SectionTitle label="Expertise" title="Services" align="center" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          padding: `0 ${pad} 80px`,
          gap: 1,
          background: "var(--gray5)",
          border: "1px solid var(--gray5)",
        }}
        className="svc-home"
      >
        {SERVICES.slice(0, 3).map((s, i) => (
          <div
            key={i}
            style={{
              padding: "clamp(24px, 3vw, 48px)",
              background: "var(--bg)",
              transition: "background 0.4s",
              cursor: "default",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--bg2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--bg)")
            }
          >
            <span
              style={{
                fontFamily: "var(--display)",
                fontSize: 48,
                fontWeight: 700,
                color: "var(--gray5)",
                display: "block",
                marginBottom: 16,
                lineHeight: 1,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              style={{
                fontFamily: "var(--display)",
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 10,
                letterSpacing: "-0.01em",
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--body)",
                fontSize: 14,
                fontWeight: 300,
                lineHeight: 1.7,
                color: "var(--gray2)",
              }}
            >
              {s.desc}
            </p>
          </div>
        ))}
        <style>{`@media(max-width:768px){.svc-home{grid-template-columns:1fr!important}}`}</style>
      </div>
    </div>
  );
}

function ProjectsPage({ onNavigate }) {
  const [filter, setFilter] = useState("All");

  return (
    <div style={{ paddingTop: 64 }}>
      <SectionTitle
        label="Portfolio"
        title="All Projects"
        sub="Browse our complete body of work by category."
      />
      <CategoryNav activeCategory={filter} onSelect={setFilter} />
      <ProjectGrid onNavigate={onNavigate} filter={filter} />
      <div style={{ height: 80 }} />
    </div>
  );
}

function ProjectDetail({ projectId, onNavigate }) {
  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return null;

  const meta = [
    { label: "Location", value: project.location },
    { label: "Year", value: project.year },
    { label: "Area", value: project.area },
    { label: "Category", value: project.category },
    { label: "Client", value: project.client },
  ];

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Hero */}
      <div
        style={{
          width: "100%",
          height: "75vh",
          overflow: "hidden",
          animation: "scaleIn 0.7s var(--ease) both",
        }}
      >
        <img
          src={project.gallery[0]}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Title + Meta */}
      <div
        style={{
          padding: `48px ${pad} 32px`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        <div style={{ flex: "1 1 400px" }}>
          <button
            onClick={() => onNavigate("projects")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--body)",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--gray3)",
              marginBottom: 20,
              display: "block",
            }}
          >
            ← All Projects
          </button>
          <h1
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(32px, 5vw, 60px)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {project.title}
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            gap: 40,
            flexWrap: "wrap",
            paddingTop: 48,
          }}
        >
          {meta.map((m, i) => (
            <div key={i}>
              <p
                style={{
                  fontFamily: "var(--body)",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--gray3)",
                  marginBottom: 4,
                }}
              >
                {m.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--body)",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "var(--gray1)",
                }}
              >
                {m.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          padding: `0 ${pad} 64px`,
          maxWidth: 780,
        }}
      >
        <div
          style={{
            width: 40,
            height: 1.5,
            background: "var(--black)",
            marginBottom: 24,
          }}
        />
        <p
          style={{
            fontFamily: "var(--body)",
            fontSize: 17,
            fontWeight: 300,
            lineHeight: 1.85,
            color: "var(--gray2)",
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Gallery */}
      <div
        style={{
          padding: `0 ${pad} 64px`,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <img
            src={project.gallery[1]}
            alt=""
            style={{
              width: "100%",
              display: "block",
              aspectRatio: "21/9",
              objectFit: "cover",
            }}
          />
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          className="det-2col"
        >
          <img
            src={project.gallery[2]}
            alt=""
            style={{
              width: "100%",
              display: "block",
              aspectRatio: "3/4",
              objectFit: "cover",
            }}
          />
          <img
            src={project.gallery[3]}
            alt=""
            style={{
              width: "100%",
              display: "block",
              aspectRatio: "3/4",
              objectFit: "cover",
            }}
          />
        </div>
        <div style={{ overflow: "hidden" }}>
          <img
            src={project.gallery[4]}
            alt=""
            style={{
              width: "100%",
              display: "block",
              aspectRatio: "16/9",
              objectFit: "cover",
            }}
          />
        </div>
        <style>{`@media(max-width:520px){.det-2col{grid-template-columns:1fr!important}}`}</style>
      </div>

      {/* Next Project */}
      {(() => {
        const i = PROJECTS.findIndex((p) => p.id === projectId);
        const next = PROJECTS[(i + 1) % PROJECTS.length];
        return (
          <div
            onClick={() => {
              onNavigate("project", next.id);
            }}
            style={{
              position: "relative",
              height: "50vh",
              overflow: "hidden",
              cursor: "pointer",
            }}
            className="next-proj"
          >
            <img
              src={next.img}
              alt={next.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.5)",
                transition: "transform 0.7s var(--ease)",
              }}
              className="next-proj-img"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "var(--white)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--body)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  opacity: 0.4,
                  marginBottom: 16,
                }}
              >
                Next Project
              </p>
              <h2
                style={{
                  fontFamily: "var(--display)",
                  fontSize: "clamp(28px, 5vw, 52px)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                {next.title}
              </h2>
              <p
                style={{
                  fontFamily: "var(--body)",
                  fontSize: 14,
                  fontWeight: 300,
                  opacity: 0.5,
                  marginTop: 8,
                }}
              >
                {next.location}
              </p>
            </div>
          </div>
        );
      })()}

      <style>{`
        .next-proj:hover .next-proj-img { transform: scale(1.03); }
      `}</style>
    </div>
  );
}

function StudioPage() {
  return (
    <div style={{ paddingTop: 64 }}>
      <SectionTitle label="About" title="The Studio" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          padding: `0 ${pad} 80px`,
          alignItems: "center",
        }}
        className="studio-about-grid"
      >
        <div>
          <div
            style={{
              width: 40,
              height: 1.5,
              background: "var(--black)",
              marginBottom: 28,
            }}
          />
          <p
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(20px, 2.5vw, 30px)",
              fontWeight: 600,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              marginBottom: 28,
            }}
          >
            Great architecture is born from listening — to the site, to the
            light, and above all, to the people.
          </p>
          <p
            style={{
              fontFamily: "var(--body)",
              fontSize: 15,
              fontWeight: 300,
              lineHeight: 1.85,
              color: "var(--gray2)",
              marginBottom: 20,
            }}
          >
            Stellar was founded with a simple conviction: every project,
            regardless of scale, deserves the same depth of thought and care.
            From private residences to public institutions, we approach each
            commission as an opportunity to create spaces that elevate everyday
            life.
          </p>
          <p
            style={{
              fontFamily: "var(--body)",
              fontSize: 15,
              fontWeight: 300,
              lineHeight: 1.85,
              color: "var(--gray2)",
            }}
          >
            Our studio combines rigorous technical expertise with a deep
            sensitivity to context, materiality, and human experience. We work
            collaboratively with clients, engineers, and craftspeople to realize
            designs that are both ambitious and enduring.
          </p>
        </div>
        <div style={{ overflow: "hidden" }}>
          <img
            src={STOCK.studio1}
            alt="Studio"
            style={{
              width: "100%",
              display: "block",
              aspectRatio: "4/3",
              objectFit: "cover",
            }}
          />
        </div>
        <style>{`@media(max-width:768px){.studio-about-grid{grid-template-columns:1fr!important}}`}</style>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: "1px solid var(--gray5)",
          borderBottom: "1px solid var(--gray5)",
        }}
        className="stats"
      >
        {[
          { n: "45+", l: "Projects" },
          { n: "12", l: "Years" },
          { n: "8", l: "Team Members" },
          { n: "6", l: "Countries" },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              padding: "48px 24px",
              textAlign: "center",
              borderRight: i < 3 ? "1px solid var(--gray5)" : "none",
            }}
          >
            <p
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                marginBottom: 6,
              }}
            >
              {s.n}
            </p>
            <p
              style={{
                fontFamily: "var(--body)",
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--gray3)",
              }}
            >
              {s.l}
            </p>
          </div>
        ))}
        <style>{`@media(max-width:768px){.stats{grid-template-columns:repeat(2,1fr)!important}.stats>div{border-bottom:1px solid var(--gray5)}}`}</style>
      </div>

      {/* Team */}
      <SectionTitle label="People" title="Our Team" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
          padding: `0 ${pad} 100px`,
        }}
        className="team"
      >
        {TEAM.map((m, i) => (
          <div
            key={i}
            style={{ animation: `fadeUp 0.5s var(--ease) ${i * 0.08}s both` }}
          >
            <div
              style={{
                aspectRatio: "3/4",
                overflow: "hidden",
                marginBottom: 14,
                background: "var(--bg2)",
              }}
            >
              <img
                src={m.img}
                alt={m.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(1)",
                  transition: "filter 0.5s var(--ease)",
                }}
                className="team-img"
                onMouseEnter={(e) => (e.target.style.filter = "grayscale(0)")}
                onMouseLeave={(e) => (e.target.style.filter = "grayscale(1)")}
              />
            </div>
            <h3
              style={{
                fontFamily: "var(--display)",
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 2,
              }}
            >
              {m.name}
            </h3>
            <p
              style={{
                fontFamily: "var(--body)",
                fontSize: 13,
                fontWeight: 300,
                color: "var(--gray3)",
              }}
            >
              {m.role}
            </p>
          </div>
        ))}
        <style>{`
          @media(max-width:768px){.team{grid-template-columns:repeat(2,1fr)!important}}
          @media(max-width:480px){.team{grid-template-columns:1fr!important}}
        `}</style>
      </div>
    </div>
  );
}

function ServicesPage({ onNavigate }) {
  return (
    <div style={{ paddingTop: 64 }}>
      <SectionTitle
        label="Expertise"
        title="What We Do"
        sub="End-to-end architectural services, from concept to handover."
      />

      <div style={{ padding: `0 ${pad} 80px` }}>
        {SERVICES.map((s, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "48px 1fr 2fr",
              gap: 24,
              padding: "36px 0",
              borderBottom: "1px solid var(--gray5)",
              alignItems: "baseline",
              transition: "padding-left 0.4s var(--ease)",
              cursor: "default",
              animation: `fadeUp 0.5s var(--ease) ${i * 0.06}s both`,
            }}
            className="svc-row"
            onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = "12px")}
            onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = "0")}
          >
            <span
              style={{
                fontFamily: "var(--display)",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--gray4)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(20px, 2.5vw, 28px)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--body)",
                fontSize: 15,
                fontWeight: 300,
                lineHeight: 1.75,
                color: "var(--gray2)",
              }}
            >
              {s.desc}
            </p>
          </div>
        ))}
        <style>{`@media(max-width:768px){.svc-row{grid-template-columns:32px 1fr!important}.svc-row>p{grid-column:1/-1!important}}`}</style>
      </div>

      {/* CTA */}
      <div
        style={{
          textAlign: "center",
          padding: "80px 24px",
          background: "var(--black)",
          color: "var(--white)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--display)",
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          Have a project in mind?
        </h2>
        <p
          style={{
            fontFamily: "var(--body)",
            fontSize: 15,
            fontWeight: 300,
            color: "var(--gray3)",
            marginBottom: 36,
          }}
        >
          We'd love to hear about it.
        </p>
        <button
          onClick={() => onNavigate("contact")}
          style={{
            background: "var(--white)",
            color: "var(--black)",
            border: "none",
            padding: "15px 48px",
            fontFamily: "var(--body)",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "var(--gray4)")}
          onMouseLeave={(e) => (e.target.style.background = "var(--white)")}
        >
          Get in Touch
        </button>
      </div>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const inp = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--gray5)",
    padding: "14px 0",
    fontFamily: "var(--body)",
    fontSize: 15,
    fontWeight: 300,
    color: "var(--black)",
    outline: "none",
    transition: "border-color 0.3s",
  };

  return (
    <div style={{ paddingTop: 64 }}>
      <SectionTitle label="Get in Touch" title="Contact" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 80,
          padding: `0 ${pad} 100px`,
        }}
        className="contact-g"
      >
        <div>
          {[
            {
              label: "Office",
              lines: [
                "Stellar Architecture Studio",
                "ul. Makedonija 12",
                "1000 Skopje, Macedonia",
              ],
            },
            { label: "Email", lines: ["hello@stellar-arch.com"] },
            { label: "Phone", lines: ["+389 2 XXX XXX"] },
          ].map((block, i) => (
            <div key={i} style={{ marginBottom: 36 }}>
              <p
                style={{
                  fontFamily: "var(--body)",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--gray3)",
                  marginBottom: 10,
                }}
              >
                {block.label}
              </p>
              {block.lines.map((l, j) => (
                <p
                  key={j}
                  style={{
                    fontFamily: "var(--body)",
                    fontSize: 15,
                    fontWeight: 300,
                    color: "var(--gray1)",
                    lineHeight: 1.6,
                  }}
                >
                  {l}
                </p>
              ))}
            </div>
          ))}

          <div style={{ marginBottom: 36 }}>
            <p
              style={{
                fontFamily: "var(--body)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gray3)",
                marginBottom: 10,
              }}
            >
              Follow
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Instagram", "LinkedIn", "Facebook"].map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "var(--body)",
                    fontSize: 14,
                    fontWeight: 400,
                    color: "var(--gray2)",
                    cursor: "pointer",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--black)")}
                  onMouseLeave={(e) => (e.target.style.color = "var(--gray2)")}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              aspectRatio: "16/9",
              overflow: "hidden",
              background: "var(--bg2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--body)",
                fontSize: 12,
                fontWeight: 400,
                color: "var(--gray3)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Map · Skopje, Macedonia
            </span>
          </div>
        </div>

        <div>
          {sent ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                animation: "fadeUp 0.5s var(--ease) both",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  border: "2px solid var(--black)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 20,
                }}
              >
                ✓
              </div>
              <h3
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                Message Sent
              </h3>
              <p
                style={{
                  fontFamily: "var(--body)",
                  fontSize: 15,
                  fontWeight: 300,
                  color: "var(--gray2)",
                }}
              >
                We'll respond within 48 hours.
              </p>
            </div>
          ) : (
            <div>
              <p
                style={{
                  fontFamily: "var(--body)",
                  fontSize: 15,
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: "var(--gray2)",
                  marginBottom: 40,
                }}
              >
                Whether you're planning a new build, a renovation, or just
                exploring ideas — tell us about your vision and we'll take it
                from there.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { k: "name", ph: "Your Name" },
                  { k: "email", ph: "Email Address" },
                  { k: "subject", ph: "Subject" },
                ].map((f) => (
                  <input
                    key={f.k}
                    type={f.k === "email" ? "email" : "text"}
                    placeholder={f.ph}
                    value={form[f.k]}
                    onChange={(e) => upd(f.k, e.target.value)}
                    style={inp}
                    onFocus={(e) =>
                      (e.target.style.borderBottomColor = "var(--black)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderBottomColor = "var(--gray5)")
                    }
                  />
                ))}
                <textarea
                  placeholder="Tell us about your project..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => upd("message", e.target.value)}
                  style={{
                    ...inp,
                    resize: "vertical",
                    minHeight: 100,
                    marginTop: 4,
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderBottomColor = "var(--black)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderBottomColor = "var(--gray5)")
                  }
                />
                <button
                  onClick={() => setSent(true)}
                  style={{
                    marginTop: 28,
                    alignSelf: "flex-start",
                    background: "var(--black)",
                    color: "var(--white)",
                    border: "none",
                    padding: "15px 48px",
                    fontFamily: "var(--body)",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "background 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.background = "var(--gray1)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background = "var(--black)")
                  }
                >
                  Send Message
                </button>
              </div>
            </div>
          )}
        </div>

        <style>{`@media(max-width:768px){.contact-g{grid-template-columns:1fr!important;gap:48px!important}}`}</style>
      </div>
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────
function Footer({ onNavigate }) {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--gray5)",
        padding: `48px ${pad} 32px`,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 40,
          marginBottom: 48,
        }}
        className="footer-g"
      >
        <div>
          <div style={{ marginBottom: 12 }}>
            <p
              style={{
                fontFamily: "var(--logo)",
                fontSize: 28,
                fontWeight: 500,
                letterSpacing: "0.04em",
                textTransform: "lowercase",
              }}
            >
              stellar
            </p>
            <p
              style={{
                fontFamily: "var(--body)",
                fontSize: 9,
                fontWeight: 400,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--gray3)",
                marginTop: 2,
              }}
            >
              Architecture
            </p>
          </div>
          <p
            style={{
              fontFamily: "var(--body)",
              fontSize: 14,
              fontWeight: 300,
              color: "var(--gray2)",
              lineHeight: 1.7,
              maxWidth: 280,
            }}
          >
            Architecture studio based in Skopje, Macedonia. Designing spaces
            that inspire.
          </p>
        </div>
        {[
          {
            title: "Pages",
            items: [
              ["Projects", "projects"],
              ["Studio", "studio"],
              ["Services", "services"],
              ["Contact", "contact"],
            ],
          },
          {
            title: "Social",
            items: [["Instagram"], ["LinkedIn"], ["Facebook"], ["Pinterest"]],
          },
        ].map((col, i) => (
          <div key={i}>
            <p
              style={{
                fontFamily: "var(--body)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gray3)",
                marginBottom: 16,
              }}
            >
              {col.title}
            </p>
            {col.items.map(([label, route], j) => (
              <p
                key={j}
                onClick={route ? () => onNavigate(route) : undefined}
                style={{
                  fontFamily: "var(--body)",
                  fontSize: 14,
                  fontWeight: 300,
                  color: "var(--gray2)",
                  marginBottom: 10,
                  cursor: route ? "pointer" : "default",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "var(--black)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--gray2)")}
              >
                {label}
              </p>
            ))}
          </div>
        ))}
        <div>
          <p
            style={{
              fontFamily: "var(--body)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gray3)",
              marginBottom: 16,
            }}
          >
            Contact
          </p>
          <p
            style={{
              fontFamily: "var(--body)",
              fontSize: 14,
              fontWeight: 300,
              color: "var(--gray2)",
              lineHeight: 1.7,
            }}
          >
            hello@stellar-arch.com
            <br />
            +389 2 XXX XXX
            <br />
            <br />
            ul. Makedonija 12
            <br />
            1000 Skopje, Macedonia
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 20,
          borderTop: "1px solid var(--gray5)",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <p
          style={{
            fontFamily: "var(--body)",
            fontSize: 12,
            fontWeight: 300,
            color: "var(--gray3)",
          }}
        >
          © 2025 Stellar Architecture Studio
        </p>
        <p
          style={{
            fontFamily: "var(--body)",
            fontSize: 12,
            fontWeight: 300,
            color: "var(--gray3)",
          }}
        >
          Privacy · Terms
        </p>
      </div>

      <style>{`
        @media(max-width:768px){.footer-g{grid-template-columns:1fr 1fr!important}}
        @media(max-width:480px){.footer-g{grid-template-columns:1fr!important}}
      `}</style>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [projectId, setProjectId] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useCallback((target, id) => {
    if (target === "project") {
      setPage("project");
      setProjectId(id);
    } else {
      setPage(target);
      setProjectId(null);
    }
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const isDarkHero = page === "home";

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <style>{CSS}</style>
      <Header
        currentPage={page}
        onNavigate={navigate}
        scrolled={scrolled}
        dark={isDarkHero}
      />

      {page === "home" && <HomePage onNavigate={navigate} />}
      {page === "projects" && <ProjectsPage onNavigate={navigate} />}
      {page === "project" && (
        <ProjectDetail projectId={projectId} onNavigate={navigate} />
      )}
      {page === "studio" && <StudioPage />}
      {page === "services" && <ServicesPage onNavigate={navigate} />}
      {page === "contact" && <ContactPage />}

      <Footer onNavigate={navigate} />
    </div>
  );
}
