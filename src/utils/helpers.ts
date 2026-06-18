// ============================================================
//  Utility helpers
// ============================================================

export function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function icon(name: string, size = 24): string {
  return `<span class="material-symbols-rounded" style="font-size:${size}px;font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' ${size};">${name}</span>`;
}
