"use client";

import { SummaryType } from "@/@types/home.type";
import { convertDate, statusSelection } from "@/lib/common";
import { ArrowRight, History } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FaRobot } from "react-icons/fa";

export default function HomeTables(data: { data: SummaryType }) {
  const row = data?.data?.incident || [];
  const router = useRouter();
  const params = useParams();

  const getStatusBadgeClass = (status: string) => {
    switch (status?.toUpperCase()) {
      case "RESOLVED":
      case "SUCCESS":
        return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "PENDING":
        return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";
      default:
        return "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-emerald-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Riwayat Deteksi Terbaru
          </h2>
        </div>

        <button
          onClick={() => router.push(`/${params.slugs}/history?page=1`)}
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline dark:text-emerald-400 cursor-pointer"
        >
          <span>Lihat Semua</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto pr-1">
        {row.length > 0 ? (
          <div className="space-y-2.5">
            {row.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition-colors hover:border-emerald-500/30 dark:border-slate-800/80 dark:bg-slate-800/40"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <img
                      src={`${process.env.NEXT_PUBLIC_AI_MEDIA}/${item.image_url}`}
                      alt={item.camera_name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                      {item.camera_name}
                    </h3>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {convertDate(new Date(item.date_incident))}
                    </p>
                  </div>
                </div>

                <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getStatusBadgeClass(item.status as string)}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-40 flex-col items-center justify-center text-slate-400">
            <FaRobot className="h-7 w-7 text-slate-400 mb-2" />
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Tidak ada data deteksi terbaru
            </p>
          </div>
        )}
      </div>
    </div>
  );
}