"use client";

import { SummaryType } from "@/@types/home.type";
import { Camera, Globe, Lock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function HomeHeaders({ data }: { data: SummaryType }) {
  if (!data) return null;

  const stats = [
    {
      title: "Total CCTV",
      subtitle: "Titik terpasang",
      value: data.count.total,
      icon: Camera,
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20",
      iconBg: "bg-emerald-500/15 text-emerald-500",
    },
    {
      title: "Publik",
      subtitle: "Kamera Publik",
      value: data.count.public,
      icon: Globe,
      badgeColor: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20",
      iconBg: "bg-blue-500/15 text-blue-500",
    },
    {
      title: "Private",
      subtitle: "Kamera Private",
      value: data.count.private,
      icon: Lock,
      badgeColor: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20",
      iconBg: "bg-amber-500/15 text-amber-500",
    },
    {
      title: "Belum Ditinjau",
      subtitle: "Kejadian",
      value: data.count.pending,
      icon: AlertTriangle,
      badgeColor: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 border-rose-500/20",
      iconBg: "bg-rose-500/15 text-rose-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${stat.badgeColor}`}>
                {stat.title}
              </span>
            </div>

            <div className="mt-4">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                {stat.value}
              </h2>
              <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                {stat.subtitle}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}