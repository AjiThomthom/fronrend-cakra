"use client";

import { useTokenJWT } from "@/context/user.context";
import axios from "axios";
import { Compass, ArrowRight, LogOut, FileText, LogIn, Activity, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function HeroSection() {
  const router = useRouter();
  const user = useTokenJWT();

  const logOutServices = async () => {
    try {
      const res = await axios.delete(`/api`, { withCredentials: true });
      if (!res) return null;
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const metrics = [
    { label: "CCTV Publik Terintegrasi", value: "5" },
    { label: "Akurasi Deteksi AI", value: "98.4%" },
    { label: "Rata-rata Latensi", value: "< 1000ms" },
    { label: "Uptime Sistem", value: "50%" },
  ];

  return (
    <div className="space-y-8 mt-4">
      {/* MAIN HERO SPOTLIGHT CARD */}
      <SpotlightCard className="relative overflow-hidden p-6 md:p-10">
        {/* Background Decorative Glow */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/20" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/20" />

        <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
          {/* LEFT COLUMN: TEXT & ACTIONS */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Smart Surveillance Platform
              </div>

              {/* Gradient Text CAKRA Title */}
              <h1 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 md:text-7xl">
                CAKRA
              </h1>

              <p className="text-lg font-semibold text-emerald-600 md:text-xl dark:text-emerald-400">
                Cepat, Akurat, Koordinasi Respon Aman
              </p>
            </motion.div>

            <p className="max-w-xl text-base text-slate-600 md:text-lg leading-relaxed dark:text-slate-300">
              Platform integrasi kamera CCTV cerdas berbasis{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                Artificial Intelligence
              </span>{" "}
              untuk pemantauan lalu lintas dan keamanan ruang publik secara real-time.
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start pt-2">
              {user ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.back()}
                    className="flex items-center justify-center gap-2 rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    Kembali
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={logOutServices}
                    className="flex items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-5 py-3 font-semibold text-rose-600 shadow-sm transition-colors hover:bg-rose-500/20 dark:bg-rose-500/20 dark:text-rose-400"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/login")}
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/30 transition-colors hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950"
                  >
                    <LogIn className="h-4 w-4" />
                    Masuk
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/docs")}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    <FileText className="h-4 w-4" />
                    Dokumentasi
                  </motion.button>
                </>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: VIDEO STREAM DEMO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-lg lg:max-w-md"
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900/90 p-3 shadow-2xl backdrop-blur-md dark:border-emerald-500/20">
              {/* Video Container */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                <video
                  src="/demo.mp4"
                  autoPlay
                  loop
                  muted
                  className="pointer-events-none h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold text-emerald-400 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  AI STREAM DEMO
                </div>
              </div>

              {/* Explore Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => (window.location.href = "/maps")}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 shadow-md transition-colors hover:bg-emerald-400"
              >
                <Compass className="h-5 w-5" />
                Explore Maps
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </SpotlightCard>

      {/* METRICS / STATS STRIP */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {metrics.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white/60 p-4 shadow-xs backdrop-blur-md transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-900/60"
          >
            <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
              {stat.value}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 text-center mt-0.5">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}