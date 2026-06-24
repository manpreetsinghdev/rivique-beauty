/**
 * Rivique Beauty — Design Tokens
 * Single source of truth for brand values.
 * Use these in JS/TS wherever Tailwind classes aren't available
 * (e.g. Chart.js, canvas, SVG, inline styles, Storybook).
 */

// ── Palette ────────────────────────────────────────────────────────────────
export const colors = {
  roseGold: {
    50:  "#FAF3EE",
    100: "#F4E2D5",
    200: "#E9C4AA",
    300: "#DFA880",
    400: "#D4A373",  // primary
    500: "#C08B5A",
    600: "#A87043",
    700: "#8A5530",
    800: "#6B3D1F",
    900: "#4A2710",
  },
  softPink: {
    50:  "#FEF9FA",
    100: "#FDF1F3",
    200: "#FAE1E5",
    300: "#F8D7DA",  // primary
    400: "#F2B8BF",
    500: "#E8909A",
    600: "#D96473",
  },
  champagne: {
    50:  "#FEFBF0",
    100: "#FDF5D6",
    200: "#FAE9A3",
    300: "#F0D472",
    400: "#E9C46A",  // primary
    500: "#D4A832",
    600: "#B08820",
    700: "#8A6510",
  },
  ivory: {
    50:  "#FFFFFF",
    100: "#FFFCF9",
    200: "#FFF8F2",  // primary
    300: "#FAEEDE",
    400: "#F5E4CB",
  },
  ink: {
    DEFAULT: "#111111",  // primary
    800: "#1F1F1F",
    700: "#2C2C2C",
    600: "#3A3A3A",
    500: "#555555",
    400: "#777777",
    300: "#999999",
    200: "#BBBBBB",
    100: "#DDDDDD",
    50:  "#F5F5F5",
  },
} as const;

// ── Typography ──────────────────────────────────────────────────────────────
export const typography = {
  fontFamily: {
    serif:  "\"Playfair Display\", Georgia, serif",
    sans:   "\"Poppins\", system-ui, sans-serif",
    script: "\"Great Vibes\", cursive",
  },
  fontSize: {
    "display-2xl": "4.5rem",
    "display-xl":  "3.75rem",
    "display-lg":  "3rem",
    "display-md":  "2.25rem",
    "display-sm":  "1.875rem",
    "body-lg":     "1.125rem",
    "body-md":     "1rem",
    "body-sm":     "0.875rem",
    label:         "0.75rem",
  },
} as const;

// ── Shadows ─────────────────────────────────────────────────────────────────
export const shadows = {
  xs:          "0 1px 3px rgba(17,17,17,0.06), 0 1px 2px rgba(17,17,17,0.04)",
  sm:          "0 2px 8px rgba(17,17,17,0.08), 0 1px 3px rgba(17,17,17,0.06)",
  md:          "0 4px 16px rgba(17,17,17,0.10), 0 2px 6px rgba(17,17,17,0.07)",
  lg:          "0 8px 30px rgba(17,17,17,0.12), 0 4px 10px rgba(17,17,17,0.08)",
  xl:          "0 16px 50px rgba(17,17,17,0.14), 0 6px 16px rgba(17,17,17,0.09)",
  luxury:      "0 8px 40px -8px rgba(212,163,115,0.40), 0 2px 8px rgba(212,163,115,0.20)",
  luxuryLg:    "0 20px 70px -16px rgba(212,163,115,0.50), 0 8px 24px rgba(212,163,115,0.25)",
  luxuryXl:    "0 32px 100px -24px rgba(212,163,115,0.55), 0 12px 32px rgba(212,163,115,0.30)",
  glass:       "0 8px 32px rgba(248,215,218,0.30), 0 2px 8px rgba(212,163,115,0.15)",
  glassLg:     "0 20px 60px rgba(248,215,218,0.40), 0 8px 24px rgba(212,163,115,0.20)",
  glowGold:    "0 0 20px rgba(233,196,106,0.45), 0 0 60px rgba(233,196,106,0.20)",
  glowPink:    "0 0 20px rgba(248,215,218,0.60), 0 0 60px rgba(248,215,218,0.30)",
} as const;

// ── Border Radius ───────────────────────────────────────────────────────────
export const radii = {
  xs:   "4px",
  sm:   "8px",
  md:   "12px",
  lg:   "16px",
  xl:   "18px",
  "2xl":"20px",
  "3xl":"24px",
  "4xl":"32px",
  "5xl":"40px",
  pill: "9999px",
} as const;

// ── Gradients ───────────────────────────────────────────────────────────────
export const gradients = {
  hero:   "linear-gradient(150deg, #FFF8F2 0%, #FDF5D6 35%, #FDF1F3 70%, #FFF8F2 100%)",
  gold:   "linear-gradient(135deg, #FAE9A3 0%, #E9C46A 50%, #D4A373 100%)",
  rose:   "linear-gradient(135deg, #FFF8F2 0%, #F8D7DA 50%, #D4A373 100%)",
  dark:   "linear-gradient(135deg, #1F1F1F 0%, #111111 100%)",
  glass:  "linear-gradient(135deg, rgba(255,248,242,0.80) 0%, rgba(253,245,214,0.60) 100%)",
} as const;
