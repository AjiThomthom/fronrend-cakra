"use client";

import { AlertTriangle, RefreshCw, Home, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4 py-8 transition-colors duration-300 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 text-center shadow-2xl transition-colors duration-300 md:p-8 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/70">
          
          {/* Header Logo */}
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-md border border-slate-200/80 dark:border-rose-500/30 dark:shadow-rose-500/10">
              <Image
                src="/CAKRA.png"
                alt="CAKRA Logo"
                width={42}
                height={42}
                priority
                className="object-contain"
              />
            </div>

            {/* Badge Status Error */}
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Sistem Anomali</span>
            </div>
          </div>

          {/* Icon Peringatan */}
          <div className="my-6 flex h-20 w-20 items-center justify-center rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-500 mx-auto dark:bg-rose-500/20 dark:text-rose-400">
            <AlertTriangle className="h-10 w-10 animate-pulse" />
          </div>

          {/* Judul & Kotak Detail Error */}
          <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl dark:text-white">
            Terjadi Kesalahan!
          </h1>

          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-100/80 p-3 text-start transition-colors dark:border-slate-800 dark:bg-slate-800/60">
            <p className="text-[11px] font-mono leading-relaxed text-slate-600 dark:text-slate-300 break-words">
              {error?.message || "Terjadi masalah yang tidak terduga pada sistem."}
            </p>
          </div>

          <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

          {/* Tombol Aksi */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => reset()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-500 active:scale-[0.98] dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Coba Lagi</span>
            </button>

            <Link
              href="/"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 py-3 text-sm font-bold text-slate-700 shadow-xs transition-all hover:bg-slate-200 active:scale-[0.98] dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              <Home className="h-4 w-4" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
}