// ============================================================
//  CHR-pack Store — Memeify Thumbnail Character Pack Store
//  Bun + Elysia + TypeScript + HajimariUI
// ============================================================

import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { loadManifests, enrichPacks } from "./manifests";
import { detectLocale } from "./i18n";
import { base } from "./components/layout";
import { homePage } from "./pages/home";
import { join, extname } from "path";
import { readFileSync, existsSync } from "fs";

// ─── Bootstrap ───
const packs = loadManifests();
enrichPacks(packs);
setInterval(() => enrichPacks(packs), 10 * 60 * 1000);

// ─── MIME map for static files ───
const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".css": "text/css",
  ".js": "application/javascript",
};

const PUBLIC_DIR = join(process.cwd(), "public");

/**
 * Try to serve a static file from the public directory.
 */
function serveStatic(filePath: string): Response | undefined {
  if (filePath.includes("..")) return;
  const safe = filePath.replace(/^\/+/, "");
  if (!safe) return;

  const fullPath = join(PUBLIC_DIR, safe);
  const ext = extname(safe).toLowerCase();
  const mime = MIME[ext];
  if (!mime) return;

  try {
    if (!existsSync(fullPath)) return;
    const buffer = readFileSync(fullPath);
    return new Response(buffer, {
      headers: {
        "Content-Type": mime,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return;
  }
}

// ─── App ───
// IMPORTANT: register routes in order — more specific first, catch-all last.
const app = new Elysia()
  .use(html())

  // Home page
  .get("/", ({ request }) => {
    const url = new URL(request.url);
    const queryLang = url.searchParams.get("lang");
    const locale = queryLang === "zh" || queryLang === "en"
      ? queryLang
      : detectLocale(request.headers.get("Accept-Language") || undefined);
    return base("Store", homePage(packs, locale), locale, packs.length);
  })

  // API
  .get("/api/health", () => {
    return new Response(
      JSON.stringify({
        status: "ok",
        packs: packs.length,
        versions: packs.map((p) => ({ id: p.id, version: p.version ?? "pending" })),
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  })

  .get("/api/packs", ({ request }) => {
    const url = new URL(request.url);
    const queryLang = url.searchParams.get("lang");
    const locale = queryLang === "zh" || queryLang === "en"
      ? queryLang
      : detectLocale(request.headers.get("Accept-Language") || undefined);

    const localized = packs.map((p) => ({
      ...p,
      localized_name: getLocalizedField(p, "character_name", locale),
      localized_description: getLocalizedField(p, "description", locale),
    }));

    return new Response(JSON.stringify(localized, null, 2), {
      headers: { "Content-Type": "application/json" },
    });
  })

  .get("/api/packs/:id", ({ params, request }) => {
    const pack = packs.find((p) => p.id === params.id);
    if (!pack) {
      return new Response(JSON.stringify({ error: "Pack not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    const url = new URL(request.url);
    const queryLang = url.searchParams.get("lang");
    const locale = queryLang === "zh" || queryLang === "en"
      ? queryLang
      : detectLocale(request.headers.get("Accept-Language") || undefined);

    return new Response(
      JSON.stringify(
        {
          ...pack,
          localized_name: getLocalizedField(pack, "character_name", locale),
          localized_description: getLocalizedField(pack, "description", locale),
        },
        null,
        2
      ),
      { headers: { "Content-Type": "application/json" } }
    );
  })

  // ─── Script integration routes (for Tampermonkey) ───
  // /dl/:id — 302 redirect to the actual download URL
  // Scripts intercept clicks on /dl/* links and handle installation.
  .get("/dl/:id", ({ params }) => {
    const pack = packs.find((p) => p.id === params.id);
    if (!pack || !pack.update_url) {
      return new Response(JSON.stringify({ error: "Pack or download URL not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(null, {
      status: 302,
      headers: { Location: pack.update_url },
    });
  })

  // /jump/:id — 302 to store, scrolls & wiggles the pack card
  .get("/jump/:id", ({ params }) => {
    const pack = packs.find((p) => p.id === params.id);
    if (!pack) {
      return new Response(JSON.stringify({ error: "Pack not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(null, {
      status: 302,
      headers: { Location: "/#pack-" + pack.id },
    });
  })

  // Static files
  .get("/icon*", ({ params }: any) => {
    const name = params["*"] as string | undefined;
    if (!name) return;
    return serveStatic(`icon${name}`);
  })
  .get("/styles/*", ({ params }: any) => {
    const name = params["*"] as string | undefined;
    if (!name) return;
    return serveStatic(`styles/${name}`);
  });

function getLocalizedField<T extends { localizations?: Record<string, Record<string, string>>; character_name: string; description: string }>(
  pack: T,
  field: "character_name" | "description",
  locale: "en" | "zh"
): string {
  if (locale === "zh" && pack.localizations?.zh?.[field]) return pack.localizations.zh[field]!;
  if (locale === "en" && pack.localizations?.en?.[field]) return pack.localizations.en[field]!;
  return pack[field];
}

export { app };
export default app;
