"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Activity, Building2, User } from "lucide-react";

const options = [
  {
    title: "Log Aktivitas",
    value: "activity-log",
    href: "?set=activity-log",
    icon: Activity,
  },
  {
    title: "Detail Lembaga",
    value: "agency-detail",
    href: "?set=agency-detail",
    icon: Building2,
  },
  {
    title: "Akun Saya",
    value: "account",
    href: "?set=account",
    icon: User,
  },
];

export default function SettingsControllers() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("set") || "activity-log";

  return (
    <div className="w-full md:w-1/4 space-y-4">
      <h2 className="text-base font-black text-slate-900 dark:text-white">
        Pengaturan
      </h2>
      <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0">
        {options.map((item, index) => {
          const isActive = activeTab === item.value;
          const Icon = item.icon;

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold transition-all ${
                isActive
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 dark:bg-emerald-500 dark:text-slate-950"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}