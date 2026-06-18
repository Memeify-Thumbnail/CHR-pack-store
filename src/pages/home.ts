// ============================================================
//  Home page — Store front
// ============================================================

import type { CharacterPack } from "../manifests";
import type { Locale } from "../i18n";
import { t } from "../i18n";
import { packGrid } from "../components/packCard";
import { icon } from "../utils/helpers";

export function homePage(packs: CharacterPack[], locale: Locale): string {
  return `
<div class="store-hero">
  <h1 class="reveal d1">${t(locale, "hero.title")}</h1>
  <p class="reveal d2">${t(locale, "hero.subtitle")}</p>
</div>

<div class="search-bar reveal d3">
  ${icon("search", 20)}
  <input type="text" id="search-input" placeholder="${t(locale, "search.placeholder")}" autocomplete="off">
</div>

<div class="reveal d4">
  ${packGrid(packs, locale)}
</div>
  `.trim();
}
