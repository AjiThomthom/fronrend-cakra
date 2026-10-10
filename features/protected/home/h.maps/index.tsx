"use client";

import { SummaryType } from "@/@types/home.type";
import { ArrowRight, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const MapShortcut = dynamic(
  () => import("../../../../components/map-shortcut"),
  { ssr: false }
);

export default function HomeMaps(data: { data: SummaryType }) {
  if (!data?.data) return null;
  const count = data.data.count;
  const params = useParams();

  return (
    <div className="relative z-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Peta Wilayah
            </h2>
          </div>
          <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            {count.total} titik CCTV terdeteksi aktif
          </p>
        </div>

        <button
          onClick={() => (window.location.href = `/${params.slugs}/map`)}
          className="flex items-center gap-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2 text-xs font-bold text-emerald-600 transition-colors hover:bg-emerald-500 hover:text-white dark:bg-emerald-500/20 dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-slate-950 cursor-pointer"
        >
          <span>Peta Lengkap</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Container Leaflet terisolasi */}
      <div className="relative z-0 h-80 w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800">
        <MapShortcut data={data.data.camera} />
      </div>
    </div>
  );
}