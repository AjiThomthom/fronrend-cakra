"use client";

import Link from "next/link";
import { Camera, ArrowRight } from "lucide-react";

export default function HomeDeviceTable({ params, data }: any) {
  const cameras = data?.camera || [];

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-emerald-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Daftar Kamera
          </h2>
        </div>

        <Link
          href={`/${params.slugs}/device`}
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline dark:text-emerald-400"
        >
          <span>SEMUA</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="max-h-60 overflow-y-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-400 dark:border-slate-800">
            <tr>
              <th className="pb-2 pl-2 w-12 text-center">No</th>
              <th className="pb-2">Kamera</th>
              <th className="pb-2 pr-2 text-right">Kategori</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {cameras.map((item: any, index: number) => {
              const isPublic = item.category === "PUBLIC";
              return (
                <tr key={index} className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 pl-2 font-mono text-center text-slate-400">{index + 1}</td>
                  <td className="py-2.5 font-semibold text-slate-800 dark:text-slate-200">
                    {item.camera_name}
                  </td>
                  <td className="py-2.5 pr-2 text-right">
                    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold ${isPublic ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'}`}>
                      {isPublic ? "Public" : "Private"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}