import { KabupatenEntry, RawEntry } from "@/@types/maps.type";
import {
  CATEGORY_LABELS,
  KABUPATEN_COORDS,
} from "../resources/category.source";

export function buildPopupHtml(entry: KabupatenEntry): string {
  const years = Object.keys(entry.data).sort();
  const latestYear = years[years.length - 1];
  const latest = entry.data[latestYear] || {};

  const categoryRows = Object.entries(latest)
    .filter(([key]) => key !== "TOTAL")
    .sort((a, b) => b[1] - a[1])
    .map(
      ([cat, val]) =>
        `<tr style="border-bottom: 1px solid rgba(226, 232, 240, 0.5);">
          <td style="padding: 4px 8px 4px 0; color: #64748b; font-size: 11px;">${
            CATEGORY_LABELS[cat] || cat
          }</td>
          <td style="padding: 4px 0; text-align: right; font-weight: 700; color: #0f172a; font-size: 11px;">${val}</td>
        </tr>`
    )
    .join("");

  const yearTrend = years
    .map((y) => `<span style="font-size:11px;">${y}: <b style="color:#059669;">${entry.data[y].TOTAL ?? 0}</b></span>`)
    .join(' <span style="color:#cbd5e1;">|</span> ');

  return `
    <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 220px; padding: 2px;">
      <div style="font-weight: 800; font-size: 14px; color: #0f172a; margin-bottom: 2px; line-height: 1.2;">
        ${entry.kabupaten}
      </div>
      <div style="font-size: 11px; font-weight: 600; color: #64748b; margin-bottom: 8px;">
        Total Kasus (${latestYear}): <b style="color: #e11d48; font-weight: 800;">${
          latest.TOTAL ?? 0
        }</b>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
        ${categoryRows}
      </table>
      <div style="font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 6px; line-height: 1.4;">
        <span style="font-weight: 700; text-transform: uppercase; tracking: 0.5px; font-size: 9px; color: #94a3b8; display: block; margin-bottom: 2px;">Tren Per Tahun:</span>
        ${yearTrend}
      </div>
    </div>
  `;
}

export function groupByKabupaten(raw: RawEntry[]): KabupatenEntry[] {
  const map = new Map<string, KabupatenEntry>();

  for (const row of raw) {
    const coords = KABUPATEN_COORDS[row.nama_kabupaten_kota];
    if (!coords) continue;

    if (!map.has(row.nama_kabupaten_kota)) {
      map.set(row.nama_kabupaten_kota, {
        kabupaten: row.nama_kabupaten_kota,
        lat: coords[0],
        lng: coords[1],
        data: {},
      });
    }

    const entry = map.get(row.nama_kabupaten_kota)!;
    const yearData = (entry.data[row.tahun] ??= { TOTAL: 0 });
    yearData[row.tempat_kejadian] = row.jumlah_kekerasan;
    yearData.TOTAL += row.jumlah_kekerasan;
  }

  return Array.from(map.values());
}