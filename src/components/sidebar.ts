// ============================================================
//  HajimariUI 侧边栏 — 网站信息 + 不蒜子访问统计
// ============================================================

import type { Locale } from "../i18n";
import { t } from "../i18n";

export function sidebar(locale: Locale, packCount: number) {
  return `<div class="sidebar-wrap">
  <div class="sidebar-overlay" id="sidebar-overlay"></div>
  <aside class="sidebar" id="sidebar">
    <button class="sidebar-close-btn" id="sidebar-close-btn" aria-label="${t(locale, "locale.switch.title")}">
      <span class="material-symbols-rounded">close</span>
    </button>
    <div class="sidebar-card">
      <div class="sidebar-avatar-wrap">
        <img src="/icon.svg" alt="Memeify Thumbnail" class="sidebar-avatar" width="160" height="160" loading="lazy">
      </div>
      <div class="sidebar-name">${t(locale, "sidebar.title")}</div>
      <div class="sidebar-divider"></div>
      <div class="sidebar-bio">${t(locale, "sidebar.bio")}</div>
    </div>
    <div class="sidebar-card">
      <div class="sidebar-stats">
        <div class="sidebar-stat">
          <strong>${packCount}</strong>
          <span>${t(locale, "sidebar.packs")}</span>
        </div>
        <div class="sidebar-stat" id="busuanzi_container_site_pv" style="display:none">
          <strong id="busuanzi_value_site_pv">-</strong>
          <span>${t(locale, "sidebar.visits")}</span>
        </div>
      </div>
    </div>
  </aside>
</div>`;
}
