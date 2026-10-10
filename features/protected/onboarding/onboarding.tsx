"use client";

import Image from "next/image";
import CreateAgencyForm from "./o.form/o.form-1";
import AcceptionForm from "./o.form/o.form-2";
import { motion } from "framer-motion";
import { ShieldCheck, Ticket } from "lucide-react";

export default function OnboardingTemplate() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-slate-50 px-4 py-8 transition-colors duration-300 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-xl"
      >
        {/* Kartu Onboarding dengan Kontras Tegas */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xl transition-colors duration-300 md:p-8 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/70">
          <div className="space-y-6">
            
            {/* Header Logo & Judul */}
            <div className="flex flex-col items-center text-center">
              {/* Wadah Logo Terisolasi (Kontras Tajam di Dark Mode) */}
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
                <span>Onboarding Instansi</span>
              </div>

              {/* Judul Utama */}
              <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 md:text-3xl dark:text-white">
                Selamat Datang di CAKRA
              </h1>
              <p className="mt-1 text-xs font-medium text-slate-500 md:text-sm dark:text-slate-300">
                Pilih opsi di bawah untuk mendaftarkan instansi baru atau bergabung dengan instansi yang sudah ada.
              </p>
            </div>

            {/* OPSI 1: FORM BUAT INSTANSI */}
            <div className="pt-2">
              <CreateAgencyForm />
            </div>

            {/* PEMBATAS / DIVIDER */}
            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
              <span className="shrink mx-4 rounded-full border border-slate-200 bg-slate-100 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400">
                ATAU
              </span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
            </div>

            {/* OPSI 2: FORM KODE UNDANGAN */}
            <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 transition-colors dark:border-slate-800/80 dark:bg-slate-800/50">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                <Ticket className="h-4 w-4 text-emerald-500" />
                <span>Punya Kode Undangan?</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Masukkan kode undangan resmi yang kamu terima untuk langsung bergabung ke dalam instansi.
              </p>
              <AcceptionForm />
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}