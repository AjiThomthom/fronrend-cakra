import { KabupatenEntry, RawEntry } from "@/@types/maps.type";
import {
  CATEGORY_LABELS,
  KABUPATEN_COORDS,
} from "../resources/category.source";

export function buildPopupHtml(entry: KabupatenEntry): string {
  const years = Object.keys(entry.data).sort();
  const latestYear = years[years.length - 1];
  const latest = entry.data[latestYear] || {};

  // Baris breakdown kategori untuk tahun terbaru
  const categoryRows = Object.entries(latest)
    .filter(([key]) => key !== "TOTAL")
    .sort((a, b) => b[1] - a[1])
    .map(
      ([cat, val]) =>
        `<tr><td style="padding:2px 8px 2px 0;color:#555;">${
          CATEGORY_LABELS[cat] || cat
        }</td><td style="padding:2px 0;text-align:right;font-weight:600;">${val}</td></tr>`,
    )
    .join("");

  // Ringkasan total per tahun (tren)
  const yearTrend = years
    .map((y) => `${y}: <b>${entry.data[y].TOTAL ?? 0}</b>`)
    .join(" &nbsp;|&nbsp; ");

  return `
    <div style="font-family: sans-serif; min-width: 220px;">
      <div style="font-weight:700; font-size:14px; margin-bottom:4px;">
        ${entry.kabupaten}
      </div>
      <div style="font-size:12px; color:#666; margin-bottom:8px;">
        Total kasus ${latestYear}: <b style="color:#c0392b;">${
          latest.TOTAL ?? 0
        }</b>
      </div>
      <table style="width:100%; font-size:12px; border-collapse:collapse; margin-bottom:8px;">
        ${categoryRows}
      </table>
      <div style="font-size:11px; color:#888; border-top:1px solid #eee; padding-top:6px;">
        Tren per tahun:<br/>${yearTrend}
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
