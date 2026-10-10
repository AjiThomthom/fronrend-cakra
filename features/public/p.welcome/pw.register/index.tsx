"use client";

import { UserCircle, ArrowRight, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function RegisterSection() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 p-8 md:p-10 text-white shadow-xl shadow-emerald-500/10 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950 dark:border-emerald-500/40"
    >
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md dark:bg-emerald-500/20 dark:text-emerald-300">
            <ShieldAlert className="h-3.5 w-3.5" />
            Gabung Komunitas CAKRA
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            Segera Daftarkan Akunmu Sekarang!
          </h2>
          <p className="text-sm md:text-base text-emerald-100 dark:text-slate-300 max-w-xl">
            Mari amankan ruang publik dan tingkatkan koordinasi keamanan masyarakat bersama platform CAKRA.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/register")}
          className="flex items-center gap-2.5 rounded-2xl bg-white px-6 py-3.5 font-bold text-slate-900 shadow-lg transition-colors hover:bg-slate-100 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 shrink-0"
        >
          <UserCircle className="h-5 w-5" />
          <span>Register Now</span>
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}