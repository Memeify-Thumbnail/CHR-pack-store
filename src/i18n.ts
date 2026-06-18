// ============================================================
//  i18n — Chinese (zh) / English (en), auto-detect
// ============================================================

export type Locale = "en" | "zh";

const messages: Record<Locale, Record<string, string>> = {
  en: {
    "site.title": "CHR-pack Store For Memeify Thumbnail",
    "site.description":
      "Browse and download character packs for Memeify Thumbnail",
    "nav.home": "Home",
    "nav.store": "Store",
    "hero.title": "CHR-pack Store",
    "hero.subtitle":
      "Browse and download character packs for Memeify Thumbnail. Each pack brings iconic expressions and poses into video thumbnails.",
    "search.placeholder": "Search character packs...",
    "pack.download": "Download",
    "pack.version": "Version",
    "pack.author": "By",
    "pack.images": "expressions",
    "pack.releases": "Releases",
    "pack.no_description": "No description available.",
    "footer.powered": "Powered by Bun + ElysiaJS",
    "theme.dark": "Dark mode",
    "theme.light": "Light mode",
    "sort.pinned": "Pinned",
    "store.empty": "No character packs found.",
    "locale.switch": "中文",
    "locale.switch.title": "Switch to Chinese",
    "sidebar.packs": "Packs",
    "sidebar.visits": "Visits",
    "sidebar.bio": "Character packs for Memeify Thumbnail",
    "sidebar.title": "CHR-pack Store",
  },
  zh: {
    "site.title": "CHR-pack 商店",
    "site.description": "浏览并下载 Memeify Thumbnail 的角色包",
    "nav.home": "首页",
    "nav.store": "商店",
    "hero.title": "CHR-pack 商店",
    "hero.subtitle":
      "浏览并下载 Memeify Thumbnail 的角色包。每个角色包都将标志性的表情与姿态带入你看到的视频缩略图。",
    "search.placeholder": "搜索角色包...",
    "pack.download": "下载",
    "pack.version": "版本",
    "pack.author": "作者",
    "pack.images": "个表情",
    "pack.releases": "发行版",
    "pack.no_description": "暂无描述。",
    "footer.powered": "由 Bun + ElysiaJS 驱动",
    "theme.dark": "深色模式",
    "theme.light": "浅色模式",
    "sort.pinned": "置顶",
    "store.empty": "暂无角色包。",
    "locale.switch": "English",
    "locale.switch.title": "切换到英文",
    "sidebar.packs": "角色包",
    "sidebar.visits": "访问",
    "sidebar.bio": "Memeify Thumbnail 的角色包商店",
    "sidebar.title": "CHR-pack 商店",
  },
};

/**
 * Detect preferred locale from Accept-Language header.
 * Falls back to "en".
 */
export function detectLocale(acceptLanguage?: string): Locale {
  if (!acceptLanguage) return "en";
  // Check if Chinese is preferred
  const langs = acceptLanguage
    .split(",")
    .map((l) => l.split(";")[0]?.trim().toLowerCase() ?? "");
  for (const lang of langs) {
    if (lang.startsWith("zh")) return "zh";
  }
  return "en";
}

export function t(locale: Locale, key: string): string {
  return messages[locale]?.[key] ?? messages["en"]?.[key] ?? key;
}
