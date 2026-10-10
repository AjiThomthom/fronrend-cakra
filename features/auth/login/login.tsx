"use client";

import Image from "next/image";
import LoginControllers from "./l.controllers/controllers";
import LoginForms from "./l.forms/forms";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function LoginFeature() {
  return (
    <LoginControllers>
      {/* Container Fullscreen Tanpa Celah/Margin */}
      <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-slate-50 px-4 py-8 transition-colors duration-300 dark:bg-slate-950">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          {/* Kartu Login dengan Kontras Tegas dan Shadow Tebal */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xl transition-colors duration-300 md:p-8 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/70">
            <div className="space-y-6">
              {/* Header Logo & Judul */}
              <div className="flex flex-col items-center text-center">
                
                {/* Wadah Logo: Menggunakan background putih salju solid & border terang agar logo tetap tajam */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-md border border-slate-200/80 dark:border-emerald-500/30 dark:shadow-emerald-500/10">
                  <Image
                    src="/CAKRA.png"
                    alt="CAKRA Logo"
                    width={42}
                    height={42}
                    priority
                    className="object-contain"
                  />
                </div>

                {/* Badge Indicator */}
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Portal Keamanan CAKRA</span>
                </div>

                {/* Judul & Deskripsi dengan Warna Kontras Tinggi */}
                <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 md:text-3xl dark:text-white">
                  Selamat Datang Kembali
                </h1>
                <p className="mt-1 text-xs font-medium text-slate-500 md:text-sm dark:text-slate-300">
                  Masuk untuk melanjutkan ke dasbor pengawasan kamu.
                </p>
              </div>

              {/* Form Input */}
              <div className="pt-2">
                <LoginForms />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </LoginControllers>
  );
}