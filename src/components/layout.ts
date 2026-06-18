// ============================================================
//  Base layout — HajimariUI HTML shell + sidebar + busuanzi
// ============================================================

import { site } from "../config";
import { EMBEDDED_CSS } from "../styles/embed";
import type { Locale } from "../i18n";
import { t } from "../i18n";
import { sidebar } from "./sidebar";

function accentCSS(): string {
  const h = site.accentHue;
  return `<style id="accent-css">
:root {
  --hue: ${h};
  --primary:    oklch(0.68 0.16 var(--hue));
  --primary-fg: oklch(0.99 0 0);
  --ring:       oklch(0.6 0.16 var(--hue));
  --blob:       oklch(0.65 0.16 var(--hue) / 0.3);
}
.dark {
  --primary:    oklch(0.72 0.14 var(--hue));
  --ring:       oklch(0.65 0.14 var(--hue));
  --blob:       oklch(0.6 0.14 var(--hue) / 0.25);
}
</style>`;
}

function themeScript(): string {
  return `(function(){
  var t=localStorage.getItem('theme')||'${site.defaultTheme}';
  if(t==='dark'||(t==='auto'&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
})();`;
}

const mainScript = `
// -- theme --
function setTheme(dark,ox,oy){
  var r=document.documentElement,isDark=r.classList.contains('dark');
  if(dark===isDark)return;
  function apply(){
    if(dark)r.classList.add('dark');else r.classList.remove('dark');
    localStorage.setItem('theme',dark?'dark':'light');
    updateIcons(dark);
  }
  r.classList.add('no-transitions');
  setTimeout(function(){r.classList.remove('no-transitions')},600);
  if(document.startViewTransition){
    if(ox!==undefined){r.style.setProperty('--vt-origin-x',ox+'px');r.style.setProperty('--vt-origin-y',oy+'px')}
    document.startViewTransition(function(){apply()});
  }else apply();
}
function updateIcons(dark){
  document.querySelectorAll('.theme-switch').forEach(function(b){
    var m=b.querySelector('.icon-dark'),s=b.querySelector('.icon-light');
    if(m)m.style.display=dark?'none':'block';
    if(s)s.style.display=dark?'block':'none';
  });
}
function toggleMobileSidebar(){
  var sb=document.getElementById('sidebar'),ov=document.getElementById('sidebar-overlay');
  if(!sb||!ov)return;
  sb.classList.toggle('open');ov.classList.toggle('open');
  document.body.style.overflow=sb.classList.contains('open')?'hidden':'';
}

// -- Search filter --
function initSearch(){
  var input=document.getElementById('search-input');
  if(!input)return;
  input.addEventListener('input',function(){
    var q=input.value.toLowerCase().trim();
    document.querySelectorAll('.pack-card').forEach(function(card){
      var name=(card.getAttribute('data-name')||'').toLowerCase();
      var desc=(card.getAttribute('data-desc')||'').toLowerCase();
      if(!q||name.includes(q)||desc.includes(q)){
        card.style.display='';
      }else{
        card.style.display='none';
      }
    });
    var visible=document.querySelectorAll('.pack-card:not([style*="display: none"])');
    var empty=document.getElementById('store-empty');
    if(empty) empty.style.display=visible.length===0?'':'none';
  });
}

// -- Init on DOMContentLoaded --
document.addEventListener('DOMContentLoaded',function(){
  var bar=document.getElementById('loading-bar');
  if(bar){bar.style.width='100%';bar.style.opacity='1';setTimeout(function(){bar.style.opacity='0'},400)}
  document.querySelectorAll('.theme-switch').forEach(function(b){
    b.addEventListener('click',function(e){setTheme(!document.documentElement.classList.contains('dark'),e.clientX,e.clientY)});
  });
  updateIcons(document.documentElement.classList.contains('dark'));
  var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.style.animationPlayState='running'})},{threshold:.1});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el)});
  initSearch();

  // Sidebar toggles
  var sbt=document.getElementById('sidebar-toggle-btn'),sbo=document.getElementById('sidebar-overlay'),sbc=document.getElementById('sidebar-close-btn');
  if(sbt)sbt.addEventListener('click',toggleMobileSidebar);
  if(sbo)sbo.addEventListener('click',toggleMobileSidebar);
  if(sbc)sbc.addEventListener('click',toggleMobileSidebar);

  // Show busuanzi container once script loaded
  setTimeout(function(){
    var c=document.getElementById('busuanzi_container_site_pv');
    if(c)c.style.display='';
  },3000);

  // Scroll to pack card if URL has #pack-{id} hash (for /jump/:id redirects)
  // Also elastic wiggle the card
  if(window.location.hash.startsWith('#pack-')){
    var target=document.getElementById(window.location.hash.slice(1));
    if(target){
      // Remove reveal so card is immediately visible (no 0.7s fade-in delay)
      target.classList.remove('reveal');
      target.style.opacity='1';
      target.style.transform='none';
      setTimeout(function(){
        target.scrollIntoView({behavior:'smooth',block:'center'});
        target.classList.add('wiggle');
        target.style.boxShadow='0 0 0 3px var(--primary)';
        setTimeout(function(){
          target.classList.remove('wiggle');
          target.style.boxShadow='';
        },3000);
      },100);
    }
  }
});`;

export function base(
  pageTitle: string,
  content: string,
  locale: Locale,
  packCount: number = 0,
  pageDesc?: string
) {
  const title = `${pageTitle} - ${site.title}`;
  const desc = pageDesc || t(locale, "site.description");

  return `<!DOCTYPE html>
<html lang="${locale === "zh" ? "zh-CN" : "en"}" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta name="keywords" content="Memeify Thumbnail,CHR-pack,character pack,YouTube thumbnail,角色包,缩略图">
  <meta name="author" content="${site.name}">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#1a1a2e">
  <link rel="canonical" href="${site.url}">
  <!-- Open Graph -->
  <meta property="og:site_name" content="${site.title}">
  <meta property="og:url" content="${site.url}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="${locale === "zh" ? "zh_CN" : "en_US"}">
  <meta property="og:image" content="${site.url}/icon.png">
  <meta property="og:image:width" content="512">
  <meta property="og:image:height" content="512">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${site.url}/icon.png">
  <!-- Icons -->
  <link rel="icon" type="image/svg+xml" href="/icon.svg">
  <link rel="icon" type="image/png" sizes="512x512" href="/icon.png">
  <link rel="apple-touch-icon" href="/icon.png">
  <!-- Structured Data -->
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","name":"${site.title}","url":"${site.url}","description":"${desc}","author":{"@type":"Organization","name":"${site.name}"}}</script>
  <style>${EMBEDDED_CSS}</style>
  ${accentCSS()}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300..700&family=JetBrains+Mono:wght@400..600&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet">
  <script>${themeScript()}</script>
</head>
<body class="body-layout">
  <div class="loading-bar" id="loading-bar" aria-hidden="true"></div>
  ${nav(locale)}
  <div class="home-layout">
    ${sidebar(locale, packCount)}
    <main class="home-main">
      <div id="content-area">${content}</div>
    </main>
  </div>
  ${footer(locale)}
  <script src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js" async defer></script>
  <script>${mainScript}</script>
</body>
</html>`;
}

function nav(locale: Locale) {
  const otherLocale = locale === "zh" ? "en" : "zh";
  const otherLabel = t(locale, "locale.switch");
  const otherTitle = t(locale, "locale.switch.title");

  return `<nav class="top-nav">
  <div class="flex items-center gap-3">
    <button id="sidebar-toggle-btn" class="sidebar-toggle-btn" aria-label="Sidebar">
      <span class="material-symbols-rounded">menu_open</span>
    </button>
    <a href="/" class="nav-brand">
      <img src="/icon.png" alt="" class="nav-avatar" width="30" height="30" loading="lazy">
      <span>CHR-pack Store</span>
    </a>
  </div>
  <div class="nav-right">
    <a href="/?lang=${otherLocale}" class="locale-switch" title="${otherTitle}">${otherLabel}</a>
    <button class="theme-switch" title="${t(locale, "theme.dark")}" aria-label="${t(locale, "theme.dark")}">
      <span class="material-symbols-rounded icon-dark">dark_mode</span>
      <span class="material-symbols-rounded icon-light">light_mode</span>
    </button>
  </div>
</nav>`;
}

function footer(locale: Locale) {
  return `<footer class="site-footer">
  ${t(locale, "footer.powered")}. &copy; ${new Date().getFullYear()} ${site.name}.
</footer>`;
}
