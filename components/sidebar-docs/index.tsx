"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";

export default function SideBarDocs() {
  const pathname = usePathname();
  const isActive = pathname === "/docs";

  return (
    <nav className="w-full rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-center gap-2 border-b border-slate-200/80 pb-3 dark:border-slate-800">
        <BookOpen className="h-4 w-4 text-emerald-500" />
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
          Dokumentasi
        </h2>
      </div>

      <div className="space-y-1">
        <Link
          href="/docs"
          className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            isActive
              ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
          }`}
        >
          <span>Pendahuluan</span>
        </Link>
      </div>
    </nav>
  );
}