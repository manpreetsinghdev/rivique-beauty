/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // ─── Brand Palette ───────────────────────────────────────────────
      colors: {
        "rose-gold": {
          50:  "#FAF3EE",
          100: "#F4E2D5",
          200: "#E9C4AA",
          300: "#DFA880",
          400: "#D4A373",   // PRIMARY — Rose Gold
          500: "#C08B5A",
          600: "#A87043",
          700: "#8A5530",
          800: "#6B3D1F",
          900: "#4A2710",
          DEFAULT: "#D4A373",
        },
        "soft-pink": {
          50:  "#FEF9FA",
          100: "#FDF1F3",
          200: "#FAE1E5",
          300: "#F8D7DA",   // PRIMARY — Soft Pink
          400: "#F2B8BF",
          500: "#E8909A",
          600: "#D96473",
          DEFAULT: "#F8D7DA",
        },
        champagne: {
          50:  "#FEFBF0",
          100: "#FDF5D6",
          200: "#FAE9A3",
          300: "#F0D472",
          400: "#E9C46A",   // PRIMARY — Champagne
          500: "#D4A832",
          600: "#B08820",
          700: "#8A6510",
          DEFAULT: "#E9C46A",
        },
        ivory: {
          50:  "#FFFFFF",
          100: "#FFFCF9",
          200: "#FFF8F2",   // PRIMARY — Ivory
          300: "#FAEEDE",
          400: "#F5E4CB",
          DEFAULT: "#FFF8F2",
        },
        ink: {
          DEFAULT: "#111111", // PRIMARY — Black
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
      },

      // ─── Typography ──────────────────────────────────────────────────
      fontFamily: {
        serif:  ["var(--font-playfair)", "Georgia", "serif"],
        sans:   ["var(--font-poppins)", "system-ui", "sans-serif"],
        script: ["var(--font-great-vibes)", "cursive"],
      },
      fontSize: {
        "display-2xl": ["4.5rem",  { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-xl":  ["3.75rem", { lineHeight: "1.08", letterSpacing: "-0.02em",  fontWeight: "700" }],
        "display-lg":  ["3rem",    { lineHeight: "1.12", letterSpacing: "-0.015em", fontWeight: "600" }],
        "display-md":  ["2.25rem", { lineHeight: "1.2",  letterSpacing: "-0.01em",  fontWeight: "600" }],
        "display-sm":  ["1.875rem",{ lineHeight: "1.3",  letterSpacing: "-0.005em" }],
        "body-lg":     ["1.125rem",{ lineHeight: "1.75" }],
        "body-md":     ["1rem",    { lineHeight: "1.7"  }],
        "body-sm":     ["0.875rem",{ lineHeight: "1.65" }],
        "label":       ["0.75rem", { lineHeight: "1",    letterSpacing: "0.2em",   fontWeight: "500" }],
      },

      // ─── Spacing ─────────────────────────────────────────────────────
      spacing: {
        "4.5":  "1.125rem",
        "13":   "3.25rem",
        "18":   "4.5rem",
        "22":   "5.5rem",
        "26":   "6.5rem",
        "30":   "7.5rem",
        "34":   "8.5rem",
      },

      // ─── Border Radius System (16–24px core range) ───────────────────
      borderRadius: {
        "xs":   "4px",
        "sm":   "8px",
        "md":   "12px",
        "lg":   "16px",    // min of core range
        "xl":   "18px",
        "2xl":  "20px",
        "3xl":  "24px",    // max of core range
        "4xl":  "32px",
        "5xl":  "40px",
        "pill": "9999px",
      },

      // ─── Shadow System ────────────────────────────────────────────────
      boxShadow: {
        // Elevation tiers
        "xs":         "0 1px 3px rgba(17,17,17,0.06), 0 1px 2px rgba(17,17,17,0.04)",
        "sm":         "0 2px 8px rgba(17,17,17,0.08), 0 1px 3px rgba(17,17,17,0.06)",
        "md":         "0 4px 16px rgba(17,17,17,0.10), 0 2px 6px rgba(17,17,17,0.07)",
        "lg":         "0 8px 30px rgba(17,17,17,0.12), 0 4px 10px rgba(17,17,17,0.08)",
        "xl":         "0 16px 50px rgba(17,17,17,0.14), 0 6px 16px rgba(17,17,17,0.09)",
        // Brand-tinted luxury shadows
        "luxury":     "0 8px 40px -8px rgba(212,163,115,0.40), 0 2px 8px rgba(212,163,115,0.20)",
        "luxury-lg":  "0 20px 70px -16px rgba(212,163,115,0.50), 0 8px 24px rgba(212,163,115,0.25)",
        "luxury-xl":  "0 32px 100px -24px rgba(212,163,115,0.55), 0 12px 32px rgba(212,163,115,0.30)",
        // Glass / pink-tinted
        "glass":      "0 8px 32px rgba(248,215,218,0.30), 0 2px 8px rgba(212,163,115,0.15)",
        "glass-lg":   "0 20px 60px rgba(248,215,218,0.40), 0 8px 24px rgba(212,163,115,0.20)",
        // Inset for pressed states
        "inset-luxury": "inset 0 2px 6px rgba(212,163,115,0.25)",
        // Glow effects
        "glow-gold":  "0 0 20px rgba(233,196,106,0.45), 0 0 60px rgba(233,196,106,0.20)",
        "glow-pink":  "0 0 20px rgba(248,215,218,0.60), 0 0 60px rgba(248,215,218,0.30)",
      },

      // ─── Gradients ───────────────────────────────────────────────────
      backgroundImage: {
        "gradient-hero":        "linear-gradient(150deg, #FFF8F2 0%, #FDF5D6 35%, #FDF1F3 70%, #FFF8F2 100%)",
        "gradient-gold":        "linear-gradient(135deg, #FAE9A3 0%, #E9C46A 50%, #D4A373 100%)",
        "gradient-rose":        "linear-gradient(135deg, #FFF8F2 0%, #F8D7DA 50%, #D4A373 100%)",
        "gradient-dark":        "linear-gradient(135deg, #1F1F1F 0%, #111111 100%)",
        "gradient-glass":       "linear-gradient(135deg, rgba(255,248,242,0.80) 0%, rgba(253,245,214,0.60) 100%)",
        "gradient-card":        "linear-gradient(145deg, rgba(255,255,255,0.90) 0%, rgba(255,248,242,0.70) 100%)",
        "shimmer-gold":         "linear-gradient(90deg, transparent 0%, rgba(233,196,106,0.4) 50%, transparent 100%)",
      },

      // ─── Backdrop Blur ────────────────────────────────────────────────
      backdropBlur: {
        "xs": "2px",
        "sm": "4px",
        "md": "8px",
        "lg": "16px",
        "xl": "24px",
      },

      // ─── Keyframes & Animations ───────────────────────────────────────
      keyframes: {
        "fade-up":    { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "fade-in":    { from: { opacity: "0" },                               to: { opacity: "1" } },
        "scale-in":   { from: { opacity: "0", transform: "scale(0.95)" },     to: { opacity: "1", transform: "scale(1)" } },
        shimmer:      { "0%": { backgroundPosition: "-200% 0" },              "100%": { backgroundPosition: "200% 0" } },
        float:        { "0%,100%": { transform: "translateY(0)" },            "50%": { transform: "translateY(-8px)" } },
        "pulse-gold":  { "0%,100%": { boxShadow: "0 0 0 0 rgba(212,163,115,0)" }, "50%": { boxShadow: "0 0 0 8px rgba(212,163,115,0.25)" } },
      },
      animation: {
        "fade-up":   "fade-up 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in":   "fade-in 0.4s ease-out forwards",
        "scale-in":  "scale-in 0.35s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer:     "shimmer 2.2s infinite linear",
        float:       "float 4s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
      },

      // ─── Transitions ─────────────────────────────────────────────────
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.16, 1, 0.3, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
    },
  },
  plugins: [],
};
