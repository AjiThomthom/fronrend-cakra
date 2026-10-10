"use client";

import { useMemo, useState } from "react";
import { useKotaKab } from "@/context/kota.context";
import { KATEGORI_LABEL } from "../resources/category.source";
import { FlatRow } from "@/@types/maps.type";
import { MapPin, Calendar, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

const ROWS_PER_PAGE = 10;

export default function DataHistorySection() {
  const { daerah } = useKotaKab();
  const [page, setPage] = useState(0);

  const rows: FlatRow[] = useMemo(() => {
    if (!daerah) return [];

    const flat: FlatRow[] = [];

    daerah.forEach((item) => {
      Object.keys(item.data)
        .sort()
        .forEach((tahun) => {
          const row = item.data[tahun as keyof typeof item.data] as Record<
            string,
            number
          >;

          Object.entries(row)
            .filter(([kategori]) => kategori !== "TOTAL")
            .forEach(([kategori, jumlah]) => {
              flat.push({
                kabupaten: item.kabupaten,
                kategori: KATEGORI_LABEL[kategori] ?? kategori,
                tahun,
                jumlah,
              });
            });
        });
    });

    return flat;
  }, [daerah]);

  const totalPages = Math.ceil(rows.length / ROWS_PER_PAGE) || 1;

  const paginatedRows = rows.slice(
    page * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE + ROWS_PER_PAGE
  );

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto my-2 w-full">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3.5">Kota / Kabupaten</th>
              <th className="px-4 py-3.5">Tempat Kejadian</th>
              <th className="px-4 py-3.5">Tahun</th>
              <th className="px-4 py-3.5">Jumlah Kekerasan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, index) => (
                <tr
                  key={`${row.kabupaten}-${row.tahun}-${row.kategori}-${index}`}
                  className="transition-colors hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                >
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{row.kabupaten}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-700 dark:text-slate-300">
                    {row.kategori}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      <span>{row.tahun}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-bold text-rose-600 dark:text-rose-400">
                    <span className="inline-flex items-center rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 text-xs">
                      {row.jumlah} Kasus
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                    <AlertCircle className="h-8 w-8 text-slate-400" />
                    <p className="text-xs font-semibold">Tidak ada data riwayat wilayah tersedia!</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINASI TAILWIND */}
      <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-slate-800">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Halaman <span className="font-bold text-slate-900 dark:text-white">{page + 1}</span> dari{" "}
          <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span> (Total {rows.length} data)
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={page <= 0}
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}