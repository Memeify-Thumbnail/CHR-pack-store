// ============================================================
//  Manifest loader — reads .json from manifests/ directory
//  Version is fetched live from GitHub releases API.
// ============================================================

import type { Locale } from "./i18n";
import { existsSync, readdirSync, readFileSync } from "fs";
import { join } from "path";

export interface CharacterPack {
  /** Filename (without .json), used as unique id */
  id: string;
  character_name: string;
  description: string;
  /** Version fetched from GitHub releases API; undefined until resolved */
  version?: string;
  icon?: string;
  author: string;
  version_check_url?: string;
  /** update_url from manifest, may be overridden by release asset from GitHub */
  update_url?: string;
  /** Localized descriptions and character names */
  localizations?: Record<string, {
    description?: string;
    character_name?: string;
  }>;
  imageCount?: number;
}

interface GitHubRelease {
  tag_name: string;
  zipball_url?: string;
  html_url?: string;
}

const MANIFESTS_DIR = join(import.meta.dirname, "..", "manifests");

// ─── In-memory version cache (Map<packId, { version, update_url }>) ───
const versionCache = new Map<string, { version: string; update_url?: string }>();

/** Time-to-live for cached version info: 10 minutes */
const CACHE_TTL = 10 * 60 * 1000;
const cacheTimestamps = new Map<string, number>();

/**
 * Load all manifests from the manifests/ directory.
 * mrbeast is always placed first (pinned).
 * Versions are NOT loaded here — call enrichPacks() separately.
 */
export function loadManifests(): CharacterPack[] {
  if (!existsSync(MANIFESTS_DIR)) return [];

  const files = readdirSync(MANIFESTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const packs: CharacterPack[] = [];

  for (const file of files) {
    try {
      const raw = readFileSync(join(MANIFESTS_DIR, file), "utf-8");
      const data = JSON.parse(raw) as CharacterPack;
      data.id = file.replace(/\.json$/, "");
      // Restore cached version if available
      const cached = versionCache.get(data.id);
      if (cached) {
        data.version = cached.version;
        if (cached.update_url) data.update_url = cached.update_url;
      }
      packs.push(data);
    } catch (e) {
      console.error(`Failed to load manifest ${file}:`, e);
    }
  }

  // Sort: mrbeast always first, rest alphabetical
  packs.sort((a, b) => {
    if (a.id === "mrbeast") return -1;
    if (b.id === "mrbeast") return 1;
    return a.id.localeCompare(b.id);
  });

  return packs;
}

/**
 * Fetch the latest version for a single pack from its version_check_url.
 * Caches the result to avoid hammering the GitHub API.
 */
async function fetchPackVersion(pack: CharacterPack): Promise<void> {
  if (!pack.version_check_url) return;

  const now = Date.now();
  const lastFetch = cacheTimestamps.get(pack.id) ?? 0;
  if (now - lastFetch < CACHE_TTL && versionCache.has(pack.id)) {
    // Use cached value (already restored in loadManifests)
    return;
  }

  try {
    const res = await fetch(pack.version_check_url, {
      headers: {
        // Minimal UA to avoid 403; no token needed for public repos
        "User-Agent": "CHR-pack-store/1.0",
        Accept: "application/vnd.github.v3+json",
      },
      // Timeout after 5 seconds
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      console.warn(`[${pack.id}] version check returned ${res.status}`);
      return;
    }

    const release = (await res.json()) as GitHubRelease;
    const version = release.tag_name?.replace(/^v/, "") ?? "";
    const updateUrl = release.zipball_url || pack.update_url;

    versionCache.set(pack.id, { version, update_url: updateUrl });
    cacheTimestamps.set(pack.id, now);

    pack.version = version;
    if (updateUrl) pack.update_url = updateUrl;

    console.log(`[${pack.id}] version → ${version}`);
  } catch (err) {
    console.warn(`[${pack.id}] failed to fetch version:`, (err as Error).message ?? err);
  }
}

/**
 * Enrich all packs with version info from GitHub releases.
 * Call this once at startup; it runs in parallel.
 */
export async function enrichPacks(packs: CharacterPack[]): Promise<void> {
  await Promise.allSettled(packs.map((p) => fetchPackVersion(p)));
}

/**
 * Get localized description for a pack.
 * Shows English description as fallback. For Chinese locale,
 * falls back to zh localization, then English description.
 */
export function getLocalizedDescription(pack: CharacterPack, locale: Locale): string {
  if (locale === "zh" && pack.localizations?.zh?.description) {
    return pack.localizations.zh.description;
  }
  if (locale === "en" && pack.localizations?.en?.description) {
    return pack.localizations.en.description;
  }
  return pack.description;
}

/**
 * Get localized character name.
 */
export function getLocalizedName(pack: CharacterPack, locale: Locale): string {
  if (locale === "zh" && pack.localizations?.zh?.character_name) {
    return pack.localizations.zh.character_name;
  }
  return pack.character_name;
}
