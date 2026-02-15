import { useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500&family=Outfit:wght@200;300;400;500;600&family=Urbanist:wght@300;400;500;600;700;800&display=swap');

:root {
  --bg: #ffffff;
  --black: #000000;
  --gray1: #333333;
  --gray2: #666666;
  --gray3: #999999;
  --gray4: #cccccc;
  --gray5: #e5e5e5;
  --bg2: #f5f5f5;
  --bg3: #ebebeb;
  --white: #ffffff;
  --display: 'Urbanist', sans-serif;
  --logo: 'Cormorant Garamond', Georgia, serif;
  --body: 'Outfit', sans-serif;
  --ease: cubic-bezier(0.23, 1, 0.32, 1);
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #fff; font-family: 'Outfit', sans-serif; -webkit-font-smoothing: antialiased; }
::selection { background: #000; color: #fff; }
`;

const Section = ({ title, children, id }) => (
  <section id={id} style={{ marginBottom: 72, scrollMarginTop: 80 }}>
    <div style={{
      display: "flex", alignItems: "center", gap: 16, marginBottom: 32,
    }}>
      <h2 style={{
        fontFamily: "var(--display)", fontSize: 20, fontWeight: 600,
        letterSpacing: "-0.01em",
      }}>
        {title}
      </h2>
      <div style={{ flex: 1, height: 1, background: "#e5e5e5" }} />
    </div>
    {children}
  </section>
);

const Token = ({ label, value, detail }) => (
  <div style={{
    display: "grid", gridTemplateColumns: "180px 1fr 1fr",
    padding: "10px 0", borderBottom: "1px solid #f0f0f0",
    fontSize: 13, fontFamily: "var(--body)",
    alignItems: "center",
  }}>
    <span style={{ fontWeight: 500, color: "#333" }}>{label}</span>
    <code style={{
      fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 12,
      color: "#666", background: "#f5f5f5", padding: "3px 8px",
      borderRadius: 3, width: "fit-content",
    }}>{value}</code>
    {detail && <span style={{ color: "#999", fontSize: 12 }}>{detail}</span>}
  </div>
);

export default function DesignSystem() {
  const [copied, setCopied] = useState(null);

  const copy = (text, label) => {
    navigator.clipboard?.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  const colors = [
    { name: "Black", var: "--black", hex: "#000000", usage: "Primary text, buttons, borders" },
    { name: "Dark", var: "--dark", hex: "#111111", usage: "Alternate dark" },
    { name: "Gray 1", var: "--gray1", hex: "#333333", usage: "Headings, strong text" },
    { name: "Gray 2", var: "--gray2", hex: "#666666", usage: "Body text, descriptions" },
    { name: "Gray 3", var: "--gray3", hex: "#999999", usage: "Labels, captions, dimmed nav" },
    { name: "Gray 4", var: "--gray4", hex: "#cccccc", usage: "Scrollbar, disabled states" },
    { name: "Gray 5", var: "--gray5", hex: "#e5e5e5", usage: "Borders, dividers, service grid gaps" },
    { name: "BG 2", var: "--bg2", hex: "#f5f5f5", usage: "Elevated backgrounds, hover cards" },
    { name: "BG 3", var: "--bg3", hex: "#ebebeb", usage: "Tertiary background" },
    { name: "White", var: "--white", hex: "#ffffff", usage: "Page background, inverted text" },
  ];

  const nav = [
    { label: "Logo", id: "logo" },
    { label: "Colors", id: "colors" },
    { label: "Typography", id: "typography" },
    { label: "Spacing", id: "spacing" },
    { label: "Components", id: "components" },
    { label: "Animation", id: "animation" },
    { label: "Imagery", id: "imagery" },
    { label: "CSS Variables", id: "variables" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <style>{CSS}</style>

      {/* Sidebar */}
      <nav style={{
        width: 220, minHeight: "100vh", position: "sticky", top: 0,
        borderRight: "1px solid #e5e5e5", padding: "32px 24px",
        background: "#fafafa", flexShrink: 0,
      }}>
        <div style={{ marginBottom: 32 }}>
          <p style={{
            fontFamily: "var(--logo)", fontSize: 22, fontWeight: 500,
            letterSpacing: "0.04em", textTransform: "lowercase",
          }}>
            stellar
          </p>
          <p style={{
            fontFamily: "var(--body)", fontSize: 7.5, fontWeight: 400,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "#999", marginTop: 2,
          }}>
            Architecture
          </p>
        </div>
        <p style={{
          fontFamily: "var(--body)", fontSize: 10, fontWeight: 500,
          letterSpacing: "0.15em", textTransform: "uppercase",
          color: "#999", marginBottom: 16,
        }}>
          Design System
        </p>
        {nav.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            style={{
              display: "block", padding: "8px 0",
              fontFamily: "var(--body)", fontSize: 13, fontWeight: 400,
              color: "#666", textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = "#000"}
            onMouseLeave={e => e.target.style.color = "#666"}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Content */}
      <main style={{
        flex: 1, padding: "48px clamp(32px, 4vw, 64px)",
        maxWidth: 960,
      }}>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <p style={{
            fontFamily: "var(--body)", fontSize: 11, fontWeight: 500,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#999", marginBottom: 12,
          }}>
            Brand Guidelines
          </p>
          <h1 style={{
            fontFamily: "var(--display)", fontSize: 36, fontWeight: 700,
            letterSpacing: "-0.02em", marginBottom: 12,
          }}>
            Stellar Design System
          </h1>
          <p style={{
            fontFamily: "var(--body)", fontSize: 15, fontWeight: 300,
            color: "#666", lineHeight: 1.7, maxWidth: 560,
          }}>
            Core branding, color palette, typography, spacing, component patterns,
            and motion guidelines for the Stellar Architecture Studio website.
          </p>
        </div>

        {/* ─── LOGO ─── */}
        <Section title="Logo" id="logo">
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32,
          }}>
            {/* Light version */}
            <div style={{
              background: "#fff", border: "1px solid #e5e5e5",
              padding: 48, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              borderRadius: 4,
            }}>
              <p style={{
                fontFamily: "var(--logo)", fontSize: 36, fontWeight: 500,
                letterSpacing: "0.04em", textTransform: "lowercase",
                color: "#000",
              }}>stellar</p>
              <p style={{
                fontFamily: "var(--body)", fontSize: 10, fontWeight: 400,
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "#999", marginTop: 3,
              }}>Architecture</p>
              <p style={{ fontSize: 10, color: "#ccc", marginTop: 16 }}>Light background</p>
            </div>
            {/* Dark version */}
            <div style={{
              background: "#000", border: "1px solid #e5e5e5",
              padding: 48, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              borderRadius: 4,
            }}>
              <p style={{
                fontFamily: "var(--logo)", fontSize: 36, fontWeight: 500,
                letterSpacing: "0.04em", textTransform: "lowercase",
                color: "#fff",
              }}>stellar</p>
              <p style={{
                fontFamily: "var(--body)", fontSize: 10, fontWeight: 400,
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)", marginTop: 3,
              }}>Architecture</p>
              <p style={{ fontSize: 10, color: "#555", marginTop: 16 }}>Dark background</p>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: "var(--body)", fontSize: 14, fontWeight: 400, color: "#333", marginBottom: 8 }}>
              Logo Construction
            </p>
            <Token label="Wordmark font" value="Cormorant Garamond" detail="Google Fonts — Serif, transitional" />
            <Token label="Wordmark weight" value="500 (Medium)" detail="Refined, not too light" />
            <Token label="Wordmark case" value="lowercase" detail="Always lowercase" />
            <Token label="Wordmark tracking" value="0.04em" />
            <Token label="Subtitle font" value="Outfit" detail="Matches body font" />
            <Token label="Subtitle weight" value="400 (Regular)" />
            <Token label="Subtitle case" value="UPPERCASE" />
            <Token label="Subtitle tracking" value="0.3em" detail="Wide spacing" />
            <Token label="Subtitle size ratio" value="~32% of wordmark" detail="e.g. 10px when wordmark is 30px" />
          </div>

          <div style={{
            background: "#f5f5f5", padding: 20, borderRadius: 4,
            fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 12,
            lineHeight: 1.8, color: "#333",
          }}>
            <p style={{ color: "#999", marginBottom: 4 }}>/* Header logo */</p>
            <p>font-family: 'Cormorant Garamond', Georgia, serif;</p>
            <p>font-size: 30px;</p>
            <p>font-weight: 500;</p>
            <p>letter-spacing: 0.04em;</p>
            <p>text-transform: lowercase;</p>
          </div>
        </Section>

        {/* ─── COLORS ─── */}
        <Section title="Color Palette" id="colors">
          <p style={{
            fontFamily: "var(--body)", fontSize: 14, fontWeight: 300,
            color: "#666", lineHeight: 1.7, marginBottom: 28,
          }}>
            Strictly black and white with a 10-step grayscale. No accent colors.
            Hierarchy is created through weight, size, and opacity rather than color.
          </p>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
            gap: 8, marginBottom: 32,
          }}>
            {colors.map(c => (
              <div
                key={c.var}
                onClick={() => copy(c.hex, c.name)}
                style={{ cursor: "pointer", textAlign: "center" }}
              >
                <div style={{
                  aspectRatio: "1", background: c.hex,
                  borderRadius: 4, marginBottom: 8,
                  border: c.hex === "#ffffff" ? "1px solid #e5e5e5" : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "transform 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  {copied === c.name && (
                    <span style={{
                      fontSize: 10, color: c.hex === "#ffffff" || c.hex === "#f5f5f5" || c.hex === "#ebebeb" || c.hex === "#e5e5e5" || c.hex === "#cccccc" ? "#000" : "#fff",
                      fontWeight: 500,
                    }}>Copied!</span>
                  )}
                </div>
                <p style={{ fontSize: 11, fontWeight: 500, color: "#333" }}>{c.name}</p>
                <p style={{ fontSize: 10, color: "#999", fontFamily: "'SF Mono', monospace" }}>{c.hex}</p>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 500, color: "#333", marginBottom: 12 }}>
            Usage Guide
          </p>
          {colors.map(c => (
            <Token key={c.var} label={c.name} value={`var(${c.var})`} detail={c.usage} />
          ))}
        </Section>

        {/* ─── TYPOGRAPHY ─── */}
        <Section title="Typography" id="typography">
          {/* Font families */}
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 500, color: "#333", marginBottom: 16 }}>
              Font Families
            </p>
            {[
              { name: "Logo", family: "Cormorant Garamond", var: "--logo", type: "Serif — transitional, elegant", sample: "stellar architecture" },
              { name: "Display", family: "Urbanist", var: "--display", type: "Sans-serif — geometric, modern", sample: "Lakeside Pavilion" },
              { name: "Body", family: "Outfit", var: "--body", type: "Sans-serif — clean, readable", sample: "Designing spaces that inspire everyday life." },
            ].map((f, i) => (
              <div key={i} style={{
                padding: "20px 0",
                borderBottom: "1px solid #f0f0f0",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#999" }}>
                    {f.name}
                  </span>
                  <code style={{
                    fontFamily: "'SF Mono', monospace", fontSize: 11,
                    color: "#666", background: "#f5f5f5",
                    padding: "2px 8px", borderRadius: 3,
                  }}>var({f.var})</code>
                </div>
                <p style={{
                  fontFamily: `'${f.family}', sans-serif`,
                  fontSize: f.name === "Logo" ? 28 : f.name === "Display" ? 24 : 16,
                  fontWeight: f.name === "Logo" ? 500 : f.name === "Display" ? 600 : 300,
                  color: "#000", marginBottom: 6,
                  textTransform: f.name === "Logo" ? "lowercase" : "none",
                }}>
                  {f.sample}
                </p>
                <p style={{ fontSize: 12, color: "#999" }}>{f.family} · {f.type}</p>
              </div>
            ))}
          </div>

          {/* Type scale */}
          <p style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 500, color: "#333", marginBottom: 16 }}>
            Type Scale
          </p>
          {[
            { el: "Hero Title", font: "Urbanist", size: "clamp(28px, 5vw, 60px)", weight: 500, tracking: "-0.02em", sample: "Lakeside Pavilion" },
            { el: "Section Title", font: "Urbanist", size: "clamp(28px, 4.2vw, 56px)", weight: 700, tracking: "-0.02em", sample: "Recent Projects" },
            { el: "Card Title", font: "Urbanist", size: "clamp(16px, 2vw, 26px)", weight: 500, tracking: "-0.01em", sample: "Stone Garden Villa" },
            { el: "Section Label", font: "Outfit", size: "11px", weight: 500, tracking: "0.18em", sample: "SELECTED WORK", transform: "uppercase" },
            { el: "Nav Link", font: "Outfit", size: "13px", weight: 400, tracking: "0.04em", sample: "Projects" },
            { el: "Body", font: "Outfit", size: "15px", weight: 300, tracking: "normal", sample: "Founded in Skopje, Stellar is a multidisciplinary studio." },
            { el: "Caption", font: "Outfit", size: "12px", weight: 300, tracking: "normal", sample: "Ohrid, Macedonia — 2025" },
            { el: "Micro Label", font: "Outfit", size: "10px", weight: 500, tracking: "0.15em", sample: "LOCATION", transform: "uppercase" },
          ].map((t, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "140px 1fr",
              gap: 16, padding: "14px 0",
              borderBottom: "1px solid #f0f0f0",
              alignItems: "baseline",
            }}>
              <span style={{ fontSize: 12, color: "#999" }}>{t.el}</span>
              <div>
                <p style={{
                  fontFamily: `'${t.font}', sans-serif`,
                  fontSize: typeof t.size === "string" && t.size.includes("clamp") ? 24 : parseInt(t.size),
                  fontWeight: t.weight,
                  letterSpacing: t.tracking,
                  textTransform: t.transform || "none",
                  color: "#000", marginBottom: 4,
                }}>
                  {t.sample}
                </p>
                <p style={{ fontSize: 10, color: "#ccc", fontFamily: "'SF Mono', monospace" }}>
                  {t.font} · {t.size} · {t.weight} · {t.tracking}
                </p>
              </div>
            </div>
          ))}
        </Section>

        {/* ─── SPACING ─── */}
        <Section title="Spacing & Layout" id="spacing">
          <p style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 500, color: "#333", marginBottom: 16 }}>
            Layout Tokens
          </p>
          <Token label="Page padding" value="clamp(20px, 5vw, 72px)" detail="Responsive horizontal padding" />
          <Token label="Header height" value="64px" detail="Fixed" />
          <Token label="Section top padding" value="80px" />
          <Token label="Section bottom padding" value="48px – 80px" />
          <Token label="Grid gap (projects)" value="8px" detail="Tight, image-forward" />
          <Token label="Grid gap (team)" value="24px" />
          <Token label="Grid gap (categories)" value="8px" />
          <Token label="Grid gap (services)" value="1px" detail="Hairline gap with gray5 bg" />
          <Token label="Nav link gap" value="32px" />
          <Token label="Max content width" value="None" detail="Full-bleed layout" />

          <p style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 500, color: "#333", marginBottom: 16, marginTop: 32 }}>
            Grid Systems
          </p>
          <Token label="Project grid" value="12-column" detail="Alternating span-4, span-6, span-8, span-12" />
          <Token label="Category grid" value="5-column" detail="Equal width, 3/4 aspect ratio" />
          <Token label="Services grid" value="3-column" detail="Equal width, 1px gap" />
          <Token label="Team grid" value="4-column" />
          <Token label="Footer grid" value="2fr 1fr 1fr 1fr" />
          <Token label="Detail layout" value="Full-width hero + mixed gallery" />

          <p style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 500, color: "#333", marginBottom: 16, marginTop: 32 }}>
            Aspect Ratios
          </p>
          <Token label="Hero / slider" value="100vh" detail="Full viewport" />
          <Token label="Project detail hero" value="75vh" />
          <Token label="Wide project cards" value="16/10 or 21/9" />
          <Token label="Tall project cards" value="4/5 or 3/4" />
          <Token label="Square cards" value="1/1" />
          <Token label="Category cards" value="3/4" />
          <Token label="Team portraits" value="3/4" />
          <Token label="Gallery wide" value="21/9" />
          <Token label="Gallery standard" value="16/9" />
          <Token label="Gallery portrait" value="3/4" />
        </Section>

        {/* ─── COMPONENTS ─── */}
        <Section title="Component Patterns" id="components">
          {/* Buttons */}
          <p style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 500, color: "#333", marginBottom: 16 }}>
            Buttons
          </p>
          <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
            <button style={{
              background: "#000", color: "#fff", border: "none",
              padding: "15px 48px", fontFamily: "var(--body)",
              fontSize: 12, fontWeight: 500, letterSpacing: "0.1em",
              textTransform: "uppercase", cursor: "pointer",
            }}>
              Primary
            </button>
            <button style={{
              background: "none", color: "#000",
              border: "1px solid #000", padding: "13px 36px",
              fontFamily: "var(--body)", fontSize: 12, fontWeight: 500,
              letterSpacing: "0.08em", textTransform: "uppercase",
              cursor: "pointer",
            }}>
              Secondary
            </button>
            <button style={{
              background: "#fff", color: "#000", border: "none",
              padding: "15px 40px", fontFamily: "var(--body)",
              fontSize: 12, fontWeight: 500, letterSpacing: "0.1em",
              textTransform: "uppercase", cursor: "pointer",
            }}>
              Inverted
            </button>
          </div>

          <Token label="Button font" value="Outfit · 12px · 500" />
          <Token label="Button tracking" value="0.08em – 0.1em" />
          <Token label="Button case" value="UPPERCASE" />
          <Token label="Primary padding" value="15px 48px" />
          <Token label="Secondary padding" value="13px 36px" />
          <Token label="Hover (primary)" value="background: #333" />
          <Token label="Hover (secondary)" value="Fill black, invert text" />

          {/* Inputs */}
          <p style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 500, color: "#333", marginBottom: 16, marginTop: 32 }}>
            Form Inputs
          </p>
          <div style={{ maxWidth: 400, marginBottom: 24 }}>
            <input
              type="text" placeholder="Your Name"
              style={{
                width: "100%", background: "transparent",
                border: "none", borderBottom: "1px solid #e5e5e5",
                padding: "14px 0", fontFamily: "var(--body)",
                fontSize: 15, fontWeight: 300, color: "#000", outline: "none",
              }}
            />
          </div>
          <Token label="Input font" value="Outfit · 15px · 300" />
          <Token label="Input border" value="1px solid gray5" />
          <Token label="Focus border" value="1px solid black" />
          <Token label="Padding" value="14px 0" />

          {/* Dividers */}
          <p style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 500, color: "#333", marginBottom: 16, marginTop: 32 }}>
            Dividers & Accents
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
            <div>
              <div style={{ width: 40, height: 1.5, background: "#000", marginBottom: 8 }} />
              <p style={{ fontSize: 11, color: "#999" }}>Section accent line — 40px × 1.5px black</p>
            </div>
            <div>
              <div style={{ width: "100%", height: 1, background: "#e5e5e5", marginBottom: 8 }} />
              <p style={{ fontSize: 11, color: "#999" }}>Divider — 1px solid gray5</p>
            </div>
            <div>
              <div style={{ width: "100%", height: 1, background: "#f0f0f0", marginBottom: 8 }} />
              <p style={{ fontSize: 11, color: "#999" }}>List separator — 1px solid #f0f0f0</p>
            </div>
          </div>

          {/* Image Overlay */}
          <p style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 500, color: "#333", marginBottom: 16, marginTop: 32 }}>
            Image Overlays
          </p>
          <Token label="Project card hover" value="linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)" />
          <Token label="Hero image filter" value="brightness(0.65)" />
          <Token label="Next project overlay" value="brightness(0.5)" />
          <Token label="Category card default" value="brightness(0.55) grayscale(0.3)" />
          <Token label="Category card hover" value="brightness(0.4) grayscale(0)" />
          <Token label="Team photos" value="grayscale(1) → grayscale(0) on hover" />
        </Section>

        {/* ─── ANIMATION ─── */}
        <Section title="Animation & Motion" id="animation">
          <p style={{
            fontFamily: "var(--body)", fontSize: 14, fontWeight: 300,
            color: "#666", lineHeight: 1.7, marginBottom: 24,
          }}>
            All transitions use a single easing curve for consistency.
            Animations are subtle and purposeful — no decorative motion.
          </p>
          <Token label="Easing curve" value="cubic-bezier(0.23, 1, 0.32, 1)" detail="Smooth ease-out" />
          <Token label="fadeUp" value="opacity 0→1, translateY 24px→0" detail="0.5–0.8s — content reveal" />
          <Token label="fadeIn" value="opacity 0→1" detail="0.25–0.3s — overlays, menus" />
          <Token label="scaleIn" value="opacity 0→1, scale 0.97→1" detail="0.7s — detail page hero" />
          <Token label="heroSlow" value="scale 1.06→1" detail="10s — Ken Burns on hero slides" />
          <Token label="Image hover scale" value="scale(1.03–1.04)" detail="0.7s ease — project cards" />
          <Token label="Stagger delay" value="i × 0.06s – 0.08s" detail="Grid items, list items" />
          <Token label="Hero slide interval" value="6000ms" detail="Auto-advance" />
          <Token label="Hero crossfade" value="opacity · 1.4s ease" />
          <Token label="Transition default" value="0.3s – 0.4s" detail="Hover states, color changes" />
        </Section>

        {/* ─── IMAGERY ─── */}
        <Section title="Imagery Guidelines" id="imagery">
          <p style={{
            fontFamily: "var(--body)", fontSize: 14, fontWeight: 300,
            color: "#666", lineHeight: 1.7, marginBottom: 24,
          }}>
            Photography is the centerpiece of the design. Images should be high-resolution,
            architecturally focused, and emphasize materiality, light, and spatial quality.
          </p>
          <Token label="Aspect ratios" value="16/10, 21/9, 4/5, 3/4, 1/1, 16/9" />
          <Token label="Grid gap" value="8px" detail="Tight gaps keep focus on images" />
          <Token label="Object fit" value="cover" detail="Always — no letterboxing" />
          <Token label="Hero filter" value="brightness(0.65)" detail="Ensures text readability" />
          <Token label="Hover effect" value="scale(1.03–1.04)" detail="Subtle zoom on cards" />
          <Token label="Team photos" value="Grayscale by default, color on hover" />
          <Token label="Loading" value="Background: var(--bg2)" detail="Gray placeholder" />
          <Token label="Gallery pattern" value="Full-width → 2-column → Full-width" detail="Project detail rhythm" />
        </Section>

        {/* ─── VARIABLES ─── */}
        <Section title="CSS Variables Reference" id="variables">
          <div style={{
            background: "#111", color: "#e5e5e5", padding: 28,
            borderRadius: 6, fontFamily: "'SF Mono', 'Fira Code', monospace",
            fontSize: 12.5, lineHeight: 2.1, overflow: "auto",
          }}>
            <p style={{ color: "#666" }}>:root {"{"}</p>
            <p>&nbsp;&nbsp;<span style={{ color: "#999" }}>/* Colors */</span></p>
            <p>&nbsp;&nbsp;--bg: <span style={{ color: "#fff" }}>#ffffff</span>;</p>
            <p>&nbsp;&nbsp;--bg2: <span style={{ color: "#fff" }}>#f5f5f5</span>;</p>
            <p>&nbsp;&nbsp;--bg3: <span style={{ color: "#fff" }}>#ebebeb</span>;</p>
            <p>&nbsp;&nbsp;--black: <span style={{ color: "#fff" }}>#000000</span>;</p>
            <p>&nbsp;&nbsp;--dark: <span style={{ color: "#fff" }}>#111111</span>;</p>
            <p>&nbsp;&nbsp;--gray1: <span style={{ color: "#fff" }}>#333333</span>;</p>
            <p>&nbsp;&nbsp;--gray2: <span style={{ color: "#fff" }}>#666666</span>;</p>
            <p>&nbsp;&nbsp;--gray3: <span style={{ color: "#fff" }}>#999999</span>;</p>
            <p>&nbsp;&nbsp;--gray4: <span style={{ color: "#fff" }}>#cccccc</span>;</p>
            <p>&nbsp;&nbsp;--gray5: <span style={{ color: "#fff" }}>#e5e5e5</span>;</p>
            <p>&nbsp;&nbsp;--white: <span style={{ color: "#fff" }}>#ffffff</span>;</p>
            <p></p>
            <p>&nbsp;&nbsp;<span style={{ color: "#999" }}>/* Typography */</span></p>
            <p>&nbsp;&nbsp;--logo: <span style={{ color: "#fff" }}>'Cormorant Garamond', Georgia, serif</span>;</p>
            <p>&nbsp;&nbsp;--display: <span style={{ color: "#fff" }}>'Urbanist', sans-serif</span>;</p>
            <p>&nbsp;&nbsp;--body: <span style={{ color: "#fff" }}>'Outfit', sans-serif</span>;</p>
            <p></p>
            <p>&nbsp;&nbsp;<span style={{ color: "#999" }}>/* Motion */</span></p>
            <p>&nbsp;&nbsp;--ease: <span style={{ color: "#fff" }}>cubic-bezier(0.23, 1, 0.32, 1)</span>;</p>
            <p style={{ color: "#666" }}>{"}"}</p>
          </div>
        </Section>

        {/* Footer */}
        <div style={{
          marginTop: 64, paddingTop: 24,
          borderTop: "1px solid #e5e5e5",
          display: "flex", justifyContent: "space-between",
        }}>
          <p style={{ fontSize: 12, color: "#999" }}>Stellar Architecture Studio — Design System v1.0</p>
          <p style={{ fontSize: 12, color: "#ccc" }}>February 2025</p>
        </div>
      </main>
    </div>
  );
}
