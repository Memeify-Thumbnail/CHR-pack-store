/// <reference lib="dom" />

export const EMBEDDED_CSS = `/*! tailwindcss v4.3.0 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, monospace;
    --spacing: 0.25rem;
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: var(--font-sans);
    --default-mono-font-family: var(--font-mono);
    --radius: 0.625rem;
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr { height: 0; color: inherit; border-top-width: 1px; }
  abbr:where([title]) { -webkit-text-decoration: underline dotted; text-decoration: underline dotted; }
  h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; }
  a { color: inherit; -webkit-text-decoration: inherit; text-decoration: inherit; }
  b, strong { font-weight: bolder; }
  code, kbd, samp, pre { font-family: var(--default-mono-font-family); font-size: 1em; }
  small { font-size: 80%; }
  sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; }
  sub { bottom: -0.25em; }
  sup { top: -0.5em; }
  table { text-indent: 0; border-color: inherit; border-collapse: collapse; }
  :-moz-focusring { outline: auto; }
  progress { vertical-align: baseline; }
  summary { list-style: none; }
  ol, ul, menu { list-style: none; }
  img, svg, video, canvas, audio, iframe, embed, object { display: block; vertical-align: middle; }
  img, video { max-width: 100%; height: auto; }
  button, input, select, optgroup, textarea, ::file-selector-button { font: inherit; font-feature-settings: inherit; font-variation-settings: inherit; letter-spacing: inherit; color: inherit; border-radius: 0; background-color: transparent; opacity: 1; }
  ::file-selector-button { margin-inline-end: 4px; }
  ::placeholder { opacity: 1; }
  textarea { resize: vertical; }
  [hidden]:where(:not([hidden="until-found"])) { display: none !important; }
}
@layer utilities {
  .flex { display: flex; }
  .hidden { display: none; }
  .items-center { align-items: center; }
  .gap-3 { gap: calc(var(--spacing) * 3); }
  .border { border-style: var(--tw-border-style); border-width: 1px; }
  .text-center { text-align: center; }
  .text-muted-foreground { color: var(--muted-fg); }
  .text-primary { color: var(--primary); }
  .filter { filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,); }
  .backdrop-filter { -webkit-backdrop-filter: var(--tw-backdrop-blur,); backdrop-filter: var(--tw-backdrop-blur,); }
  .transition { transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter; transition-timing-function: var(--tw-ease, var(--default-transition-timing-function)); transition-duration: var(--tw-duration, var(--default-transition-duration)); }
  .ease-in-out { --tw-ease: var(--ease-in-out); transition-timing-function: var(--ease-in-out); }
}
:root {
  --bg: hsl(0, 0%, 100%);
  --fg: hsl(0, 0%, 10%);
  --card-bg: hsl(0, 0%, 100%);
  --card-fg: hsl(0, 0%, 10%);
  --popover: hsl(0, 0%, 100%);
  --popover-fg: hsl(0, 0%, 10%);
  --secondary: hsl(0, 0%, 95%);
  --secondary-fg: hsl(0, 0%, 15%);
  --muted: hsl(0, 0%, 91%);
  --muted-fg: hsl(0, 0%, 40%);
  --accent: hsl(0, 0%, 94%);
  --accent-fg: hsl(0, 0%, 15%);
  --destructive: hsl(0, 72%, 51%);
  --destructive-fg: hsl(0, 0%, 98%);
  --border: hsl(0, 0%, 87%);
  --input: hsl(0, 0%, 87%);
  --nav-bg: hsla(0, 0%, 98%, 0.88);
  --shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.04);
}
.dark {
  --bg: hsl(240, 4%, 8%);
  --fg: hsl(0, 0%, 95%);
  --card-bg: hsl(240, 5%, 12%);
  --card-fg: hsl(0, 0%, 95%);
  --popover: hsl(240, 5%, 12%);
  --popover-fg: hsl(0, 0%, 95%);
  --secondary: hsl(240, 5%, 16%);
  --secondary-fg: hsl(0, 0%, 95%);
  --muted: hsl(240, 5%, 16%);
  --muted-fg: hsl(240, 2%, 70%);
  --accent: hsl(240, 5%, 16%);
  --accent-fg: hsl(0, 0%, 95%);
  --destructive: hsl(0, 62%, 40%);
  --destructive-fg: hsl(0, 0%, 98%);
  --border: hsl(240, 5%, 16%);
  --input: hsl(240, 5%, 16%);
  --nav-bg: hsla(240, 5%, 8%, 0.88);
  --shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.25);
}
:root {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
@layer base {
  *, *::before, *::after { border-color: var(--border); }
  html, body {
    margin: 0; padding: 0;
    background-color: var(--bg); color: var(--fg);
    font-family: var(--font-sans);
    min-height: 100vh; overflow-x: hidden;
    transition: background-color 0.3s, color 0.3s;
  }
  body::before, body::after {
    content: ""; position: fixed; border-radius: 50%;
    filter: blur(80px); z-index: 0; pointer-events: none;
    transition: opacity 0.5s;
  }
  body::before {
    width: 500px; height: 500px; top: -150px; left: -120px;
    background: radial-gradient(circle, var(--blob), transparent 70%);
  }
  body::after {
    width: 550px; height: 550px; bottom: -180px; right: -130px;
    background: radial-gradient(circle, var(--blob), transparent 70%);
    opacity: 0.6;
  }
  .material-symbols-rounded { line-height: 1; display: inline-flex; vertical-align: middle; }
}
@keyframes vt-circle-in {
  from { clip-path: circle(0% at var(--vt-origin-x, 50%) var(--vt-origin-y, 50%)); }
  to { clip-path: circle(150% at var(--vt-origin-x, 50%) var(--vt-origin-y, 50%)); }
}
@keyframes vt-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
::view-transition-old(root) { animation: vt-fade-out 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
::view-transition-new(root) { animation: vt-circle-in 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
.loading-bar {
  position: fixed; top: 0; left: 0; width: 0; height: 2px;
  background: var(--primary); z-index: 9999; pointer-events: none; opacity: 0;
}
.reveal {
  opacity: 0; transform: translateY(18px);
  animation: revealUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards paused;
}
.reveal.d1 { animation-delay: 80ms; }
.reveal.d2 { animation-delay: 0.2s; }
.reveal.d3 { animation-delay: 0.31s; }
.reveal.d4 { animation-delay: 0.43s; }
.reveal.d5 { animation-delay: 0.54s; }
@keyframes revealUp { to { opacity: 1; transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) { .reveal { animation: none; opacity: 1; transform: none; } }
.top-nav {
  position: sticky; top: 0; z-index: 50;
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 16px; gap: 12px;
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border); background: var(--nav-bg);
}
.nav-brand {
  display: inline-flex; align-items: center; gap: 8px;
  text-decoration: none; color: var(--fg); font-weight: 700; font-size: 0.88rem;
}
.nav-avatar { border-radius: 8px; width: 30px; height: 30px; object-fit: cover; }
.nav-links { display: flex; gap: 2px; }
.nav-link {
  padding: 5px 12px; border-radius: 7px;
  font-size: 0.78rem; font-weight: 500;
  color: var(--muted-fg); text-decoration: none;
  transition: color 0.15s, background 0.15s;
}
.nav-link:hover { color: var(--fg); background: var(--accent); }
.nav-link.active { color: var(--primary); background: var(--accent); }
.nav-right { display: flex; align-items: center; gap: 4px; }
.theme-switch {
  display: flex; align-items: center; justify-content: center;
  width: 34px; height: 34px; border-radius: 8px;
  border: 1px solid var(--border); background: var(--card-bg);
  cursor: pointer; color: var(--muted-fg);
}
.theme-switch:hover { border-color: var(--ring); color: var(--fg); }
.icon-light, .icon-dark { font-size: 18px; }
.icon-light { display: none; }
.icon-dark { display: block; }
.dark .icon-light { display: block; }
.dark .icon-dark { display: none; }
.locale-switch {
  display: flex; align-items: center; justify-content: center;
  width: 34px; height: 34px; border-radius: 8px;
  border: 1px solid var(--border); background: var(--card-bg);
  cursor: pointer; color: var(--muted-fg);
  font-size: 0.7rem; font-weight: 600; text-decoration: none;
}
.locale-switch:hover { border-color: var(--ring); color: var(--fg); }
@media (max-width: 768px) { .nav-links { display: none; } }
.home-layout { position: relative; z-index: 10; display: grid; grid-template-columns: 240px 1fr; gap: 20px; max-width: 1240px; margin: 0 auto; padding: 16px 12px 56px; align-items: start; }
.home-main { min-width: 0; }
@media (max-width: 1024px) { .home-layout { grid-template-columns: 1fr; gap: 16px; padding: 12px 8px 36px; } }
.flex { display: flex; }
.items-center { align-items: center; }
.gap-3 { gap: 0.75rem; }
.hidden { display: none; }
.store-hero { padding: 32px 0 24px; text-align: center; }
.store-hero h1 { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; line-height: 1.15; margin-bottom: 8px; letter-spacing: -0.02em; }
.store-hero p { font-size: clamp(0.85rem, 1.8vw, 1rem); color: var(--muted-fg); line-height: 1.5; max-width: 600px; margin-left: auto; margin-right: auto; }
.search-bar {
  display: flex; align-items: center; gap: 8px;
  max-width: 480px; margin: 0 auto 24px;
  padding: 10px 14px; border-radius: 12px;
  border: 1px solid var(--border); background: var(--card-bg);
  transition: border-color 0.2s;
}
.search-bar:focus-within { border-color: var(--ring); }
.search-bar input {
  flex: 1; border: none; background: transparent;
  color: var(--fg); font-size: 0.85rem; outline: none;
}
.search-bar input::placeholder { color: var(--muted-fg); }
.pack-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 14px; }
@media (max-width: 480px) { .pack-grid { grid-template-columns: 1fr; } }
.sidebar-wrap { position: relative; }
.sidebar { display: flex; flex-direction: column; gap: 10px; }
.sidebar-overlay { display: none; }
.sidebar-card { background: var(--card-bg); color: var(--card-fg); border: 1px solid var(--border); border-radius: 14px; padding: 14px; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); box-shadow: var(--shadow); }
.sidebar-avatar-wrap { width: 100%; border-radius: 10px; overflow: hidden; margin-bottom: 10px; }
.sidebar-avatar { width: 100%; height: auto; display: block; }
.sidebar-name { font-size: 1.05rem; font-weight: 700; text-align: center; margin-bottom: 4px; }
.sidebar-divider { height: 3px; width: 28px; background: var(--primary); margin: 0 auto 6px; border-radius: 999px; }
.sidebar-bio { text-align: center; color: var(--muted-fg); font-size: 0.8rem; margin-bottom: 0; }
.sidebar-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.sidebar-stat { text-align: center; padding: 8px 4px; background: var(--secondary); border-radius: 8px; }
.sidebar-stat strong { display: block; font-size: 0.95rem; font-weight: 700; color: var(--primary); font-family: var(--font-mono); }
.sidebar-stat span { display: block; font-size: 0.62rem; color: var(--muted-fg); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px; }
.sidebar-close-btn { display: none; position: absolute; top: 12px; right: 12px; width: 34px; height: 34px; border-radius: 8px; align-items: center; justify-content: center; border: 1px solid var(--border); background: var(--card-bg); cursor: pointer; color: var(--muted-fg); z-index: 101; }
.sidebar-toggle-btn { display: none; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 8px; border: 1px solid var(--border); background: var(--card-bg); cursor: pointer; color: var(--muted-fg); }
.sidebar-toggle-btn:hover { border-color: var(--ring); color: var(--fg); }
@media (max-width: 1024px) {
  .sidebar { position: fixed; top: 0; left: 0; bottom: 0; width: 280px; max-width: 85vw; z-index: 101; padding: 16px; padding-top: 64px; background: var(--bg); border-right: 1px solid var(--border); overflow-y: auto; box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3); transform: translateX(-100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .sidebar.open { transform: translateX(0); }
  .sidebar-close-btn { display: flex; }
  .sidebar-overlay { display: block; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.45); z-index: 100; backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px); opacity: 0; pointer-events: none; transition: opacity 0.3s; }
  .sidebar-overlay.open { opacity: 1; pointer-events: auto; }
  .sidebar-toggle-btn { display: flex; }
}
.pack-card {
  background: var(--card-bg); color: var(--card-fg);
  border: 1px solid var(--border); border-radius: 12px; overflow: hidden;
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  box-shadow: var(--shadow);
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  display: flex; flex-direction: column;
}
.pack-card:hover { border-color: var(--ring); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12); }
.pack-card.pinned { border-color: var(--primary); position: relative; }
.pack-card.pinned::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--primary); border-radius: 12px 12px 0 0; }
.pack-card-header { display: flex; gap: 10px; padding: 12px 12px 0; }
.pack-icon { width: 48px; height: 48px; border-radius: 10px; object-fit: cover; flex-shrink: 0; border: 1px solid var(--border); background: var(--secondary); }
.pack-info { flex: 1; min-width: 0; }
.pack-name { font-size: 0.88rem; font-weight: 700; margin-bottom: 1px; display: flex; align-items: center; gap: 5px; }
.pack-pin-badge { font-size: 0.55rem; background: var(--primary); color: var(--primary-fg); padding: 1px 6px; border-radius: 999px; font-weight: 600; letter-spacing: 0.03em; }
.pack-meta { display: flex; flex-wrap: wrap; gap: 6px; font-size: 0.65rem; color: var(--muted-fg); font-family: var(--font-mono); }
.pack-meta span { display: inline-flex; align-items: center; gap: 3px; }
.pack-desc { font-size: 0.72rem; color: var(--muted-fg); line-height: 1.45; padding: 8px 12px; flex: 1; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.pack-actions { padding: 8px 12px; border-top: 1px solid var(--border); display: flex; gap: 6px; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 6px 14px; border-radius: 8px; border: none;
  background: var(--primary); color: var(--primary-fg);
  font-size: 0.75rem; font-weight: 600;
  text-decoration: none; cursor: pointer;
  transition: filter 0.2s, transform 0.2s, box-shadow 0.2s;
}
.btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 6px 20px oklch(0.68 0.16 var(--hue) / 0.3); }
.btn-outline {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 6px 14px; border-radius: 8px;
  border: 1.5px solid var(--border); background: var(--card-bg); color: var(--card-fg);
  font-size: 0.75rem; font-weight: 600;
  text-decoration: none; cursor: pointer;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}
.btn-outline:hover { border-color: var(--ring); transform: translateY(-1px); box-shadow: var(--shadow); }
.store-empty { text-align: center; padding: 48px 16px; color: var(--muted-fg); }
.store-empty .material-symbols-rounded { font-size: 48px; margin-bottom: 12px; opacity: 0.4; }
.store-empty h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 4px; }
.store-empty p { font-size: 0.82rem; }
.body-layout { display: flex; flex-direction: column; min-height: 100vh; }
.body-layout .home-layout { flex: 1; }
.site-footer {
  position: relative; z-index: 10;
  border-top: 1px solid var(--border);
  padding: 20px 16px; text-align: center;
  color: var(--muted-fg); font-size: 0.74rem;
}
.site-footer a { color: var(--primary); text-decoration: none; }
.site-footer a:hover { text-decoration: underline; }
::selection { background: var(--primary); color: var(--primary-fg); border-radius: 4px; }
::-moz-selection { background: var(--primary); color: var(--primary-fg); border-radius: 4px; }
body::before { animation: blobSway1 14s ease-in-out infinite; }
body::after { animation: blobSway2 18s ease-in-out infinite; }
@keyframes blobSway1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(45px, -35px) scale(1.08); }
  50% { transform: translate(-20px, 28px) scale(0.92); }
  75% { transform: translate(-40px, -15px) scale(1.05); }
}
@keyframes blobSway2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(-40px, 35px) scale(1.09); }
  50% { transform: translate(28px, -25px) scale(0.91); }
  75% { transform: translate(35px, 15px) scale(1.07); }
}
@keyframes wiggle {
  0%   { transform: translateX(0); }
  12%  { transform: translateX(-10px); }
  24%  { transform: translateX(10px); }
  36%  { transform: translateX(-7px); }
  48%  { transform: translateX(7px); }
  60%  { transform: translateX(-4px); }
  72%  { transform: translateX(4px); }
  84%  { transform: translateX(-2px); }
  100% { transform: translateX(0); }
}
.wiggle { animation: wiggle 0.7s cubic-bezier(0.22, 1.5, 0.36, 1); }`;
