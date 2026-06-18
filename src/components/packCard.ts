// ============================================================
//  Character Pack Card Component
// ============================================================

import type { CharacterPack } from "../manifests";
import type { Locale } from "../i18n";
import { t } from "../i18n";
import { getLocalizedDescription, getLocalizedName } from "../manifests";
import { icon } from "../utils/helpers";

/**
 * Render version if resolved, otherwise nothing.
 * If the API 404s, version stays undefined — we just skip it.
 */
function renderVersion(version: string | undefined, locale: Locale): string {
  if (version) {
    return `<span>${icon("tag", 14)} ${t(locale, "pack.version")} ${version}</span>`;
  }
  return "";
}

/**
 * Render a single character pack card.
 */
export function packCard(pack: CharacterPack, locale: Locale): string {
  const isPinned = pack.id === "mrbeast";
  const name = getLocalizedName(pack, locale);
  const desc = getLocalizedDescription(pack, locale);
  const iconUrl = pack.icon || "";
  const version = pack.version;

  return `<div class="pack-card reveal d${Math.min((parseInt(pack.id, 36) % 5) + 1, 5)} ${isPinned ? "pinned" : ""}"
       id="pack-${pack.id}"
       data-name="${name.toLowerCase()}"
       data-desc="${desc.toLowerCase()}">
  <div class="pack-card-header">
    <img class="pack-icon" src="${iconUrl}" alt="${name}" width="64" height="64" loading="lazy"
      onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22><rect fill=%22var(--secondary)%22 width=%2264%22 height=%2264%22 rx=%2212%22/><text x=%2232%22 y=%2236%22 text-anchor=%22middle%22 fill=%22var(--muted-fg)%22 font-size=%2230%22>🎭</text></svg>'">
    <div class="pack-info">
      <div class="pack-name">
        ${name}
        ${isPinned ? `<span class="pack-pin-badge">${t(locale, "sort.pinned")}</span>` : ""}
      </div>
      <div class="pack-meta">
        ${renderVersion(version, locale)}
        <span>${icon("person", 14)} ${t(locale, "pack.author")}: ${pack.author}</span>
      </div>
    </div>
  </div>
  <div class="pack-desc">${desc || t(locale, "pack.no_description")}</div>
  <div class="pack-actions">
    ${pack.update_url
      ? `<a href="/dl/${pack.id}" class="btn-primary" target="_blank" rel="noopener">${icon("download", 18)} ${t(locale, "pack.download")}</a>`
      : ""}
    ${pack.version_check_url
      ? `<a href="${pack.version_check_url}" class="btn-outline" target="_blank" rel="noopener">${icon("open_in_new", 18)} ${t(locale, "pack.releases")}</a>`
      : ""}
  </div>
</div>`;
}

/**
 * Render a grid of character pack cards.
 */
export function packGrid(packs: CharacterPack[], locale: Locale): string {
  if (packs.length === 0) {
    return `<div class="store-empty" id="store-empty">
      ${icon("inventory_2", 48)}
      <h3>${t(locale, "store.empty")}</h3>
    </div>`;
  }

  const cards = packs.map((p) => packCard(p, locale)).join("\n");

  return `<div class="pack-grid">
    ${cards}
  </div>
  <div class="store-empty" id="store-empty" style="display:none">
    ${icon("search_off", 48)}
    <h3>${t(locale, "store.empty")}</h3>
  </div>`;
}
