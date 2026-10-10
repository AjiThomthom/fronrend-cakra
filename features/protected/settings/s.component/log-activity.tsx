"use client";

import { getlogActivity } from "@/services/history.service";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Activity, ChevronLeft, ChevronRight, History } from "lucide-react";

export type ActivityLogType = {
  log_id: number;
  created_at: string;
  activity_context: string;
};

export type ActivityLogInterface = {
  data: ActivityLogType[];
  page: number;
  total_data: number;
  total_page: number;
};

export const ActivityLogComponents = () => {
  const [logs, setLogs] = useState<ActivityLogInterface>();
  const params = useParams();
  const searchParams = useSearchParams(); // Hook dipanggil di top-level
  const page = searchParams.get("page") || "1";
  const router = useRouter();

  const getLogs = async () => {
    const response = await getlogActivity(
      params.slugs as string,
      page as string
    );
    setLogs(response);
  };

  // Pengecekan parameter URL menggunakan variable searchParams yang dipanggil di top-level
  useEffect(() => {
    if (!searchParams.get("page")) {
      router.push(`?page=1`);
    }
  }, [searchParams, router]);

  useEffect(() => {
    getLogs();
  }, [page]);

  const dateFormat = (date: Date) => {
    return Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const currentPage = Number(page);
  const totalPages = logs ? logs.total_page : 1;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-emerald-500" />
          <h1 className="text-lg font-black text-slate-900 dark:text-white">
            Log Aktivitas Terbaru
          </h1>
        </div>
        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          Riwayat Jejak Audit seluruh aktivitas pengguna di dalam sistem
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3.5">Nomor</th>
                <th className="px-4 py-3.5">Waktu Ops</th>
                <th className="px-4 py-3.5">Aktivitas Sistem</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
              {logs && logs.data && logs.data.length > 0 ? (
                logs.data.map((log, index) => (
                  <tr
                    key={log.log_id}
                    className="transition-colors hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-4 py-3.5 font-mono text-slate-400">
                      {(currentPage - 1) * 10 + index + 1}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-slate-600 whitespace-nowrap dark:text-slate-300">
                      {dateFormat(new Date(log.created_at))}
                    </td>
                    <td className="px-4 py-3.5 font-medium text-slate-900 dark:text-white">
                      {log.activity_context}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                      <History className="h-8 w-8 text-slate-400" />
                      <p className="text-xs font-semibold">Tidak ada aktivitas tercatat!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-slate-800">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Halaman <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> dari{" "}
            <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => router.push(`?page=${currentPage - 1}`)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => router.push(`?page=${currentPage + 1}`)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};