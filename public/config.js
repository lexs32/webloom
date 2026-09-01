/**
 * ==============================================================================
 *  ⚡ MASTER STOREFRONT CLIENT CONFIGURATION ENGINE
 * ==============================================================================
 *  Adjust all branding, color palettes, products, and links in THIS SINGLE FILE
 *  to customize the entire website for any client in under 60 seconds!
 * ==============================================================================
 */

window.STORE_CONFIG = {
  // 1. BRAND IDENTITY
  brand: {
    name: "Optic Cheats",
    shortName: "Optic",
    tagline: "Your trusted marketplace for premium, undetectable gaming cheats.",
    logoImage: "assets/optic_banner_logo.png",
    logoIcon: "assets/optic_icon.png",
    favicon: "assets/optic_icon.png",
    supportEmail: "support@opticcheats.xyz",
    discordUrl: "https://discord.gg/nanocheats",
    telegramUrl: "https://t.me/opticcheats",
    youtubeUrl: "https://youtube.com/@opticcheats",
    copyrightYear: "2026"
  },

  // 2. ACTIVE THEME PALETTE PRESETS (Switch activePreset or use Live Customizer)
  theme: {
    activePreset: "cyber-indigo", // 'cyber-indigo' | 'electric-cyan' | 'matrix-emerald' | 'crimson-red' | 'solar-amber' | 'hyper-violet'
    presets: {
      "cyber-indigo": {
        id: "cyber-indigo",
        name: "Cyber Indigo (Optic)",
        primary: "#7182FF",
        secondary: "#5D6EFF",
        accentGlow: "rgba(113, 130, 255, 0.35)",
        surface: "#090D15",
        surfaceCard: "#12161F",
        bg: "#040608",
        border: "rgba(255, 255, 255, 0.08)"
      },
      "electric-cyan": {
        id: "electric-cyan",
        name: "Electric Cyan (Division)",
        primary: "#2DC6FF",
        secondary: "#00A3FF",
        accentGlow: "rgba(45, 198, 255, 0.35)",
        surface: "#0A1016",
        surfaceCard: "#111A24",
        bg: "#03070A",
        border: "rgba(255, 255, 255, 0.08)"
      },
      "matrix-emerald": {
        id: "matrix-emerald",
        name: "Matrix Emerald",
        primary: "#00F298",
        secondary: "#00C875",
        accentGlow: "rgba(0, 242, 152, 0.35)",
        surface: "#09120F",
        surfaceCard: "#101D18",
        bg: "#030806",
        border: "rgba(255, 255, 255, 0.08)"
      },
      "crimson-red": {
        id: "crimson-red",
        name: "Crimson Bloodline",
        primary: "#FF3366",
        secondary: "#E6004C",
        accentGlow: "rgba(255, 51, 102, 0.35)",
        surface: "#140A0D",
        surfaceCard: "#1F1116",
        bg: "#080305",
        border: "rgba(255, 255, 255, 0.08)"
      },
      "solar-amber": {
        id: "solar-amber",
        name: "Solar Gold",
        primary: "#FFB800",
        secondary: "#E5A500",
        accentGlow: "rgba(255, 184, 0, 0.35)",
        surface: "#14110A",
        surfaceCard: "#1F1A10",
        bg: "#080703",
        border: "rgba(255, 255, 255, 0.08)"
      },
      "hyper-violet": {
        id: "hyper-violet",
        name: "Hyper Violet",
        primary: "#B35BFF",
        secondary: "#9A3BF5",
        accentGlow: "rgba(179, 91, 255, 0.35)",
        surface: "#110A17",
        surfaceCard: "#1A1024",
        bg: "#06030A",
        border: "rgba(255, 255, 255, 0.08)"
      }
    }
  },

  // 3. STATS BANNER
  stats: [
    { label: "Active Customers", value: "48,500+" },
    { label: "Undetected Rate", value: "99.9%" },
    { label: "Instant Delivery", value: "< 30s" },
    { label: "Customer Rating", value: "4.95 / 5.0" }
  ],

  // 4. LIVE SOCIAL PROOF TOASTS
  socialProof: [
    { country: "us", loc: "United States", game: "Rust (30 Days)", time: "Just now" },
    { country: "de", loc: "Germany", game: "Arc Raiders (7 Days)", time: "2m ago" },
    { country: "gb", loc: "United Kingdom", game: "Fortnite (30 Days)", time: "3m ago" },
    { country: "ca", loc: "Canada", game: "Apex Legends (Lifetime)", time: "5m ago" },
    { country: "fr", loc: "France", game: "Delta Force (30 Days)", time: "7m ago" },
    { country: "au", loc: "Australia", game: "Marvel Rivals (7 Days)", time: "10m ago" },
    { country: "nl", loc: "Netherlands", game: "Rainbow Six (30 Days)", time: "12m ago" }
  ]
};

// Auto-apply theme variables
window.applyStoreTheme = function(presetKey) {
  const cfg = window.STORE_CONFIG;
  if (!cfg || !cfg.theme) return;
  const targetKey = presetKey || localStorage.getItem('store_active_preset') || cfg.theme.activePreset;
  const p = cfg.theme.presets[targetKey] || cfg.theme.presets["cyber-indigo"];
  localStorage.setItem('store_active_preset', targetKey);

  const root = document.documentElement;
  root.style.setProperty('--color-primary', p.primary);
  root.style.setProperty('--color-secondary', p.secondary);
  root.style.setProperty('--color-glow', p.accentGlow);
  root.style.setProperty('--color-surface', p.surface);
  root.style.setProperty('--color-card', p.surfaceCard);
  root.style.setProperty('--color-bg', p.bg);
  root.style.setProperty('--color-border', p.border);

  // Update dynamic elements with accent classes if present
  document.querySelectorAll('.theme-accent-text').forEach(el => el.style.color = p.primary);
  document.querySelectorAll('.theme-accent-bg').forEach(el => el.style.backgroundColor = p.primary);
  document.querySelectorAll('.theme-accent-border').forEach(el => el.style.borderColor = p.primary);
};

window.applyStoreTheme();
