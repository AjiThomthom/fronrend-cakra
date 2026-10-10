"use client";

import { Bomb, CctvIcon, LayoutDashboard, Sparkles } from "lucide-react";
import { SiTelegram, SiTensorflow } from "react-icons/si";
import { motion } from "framer-motion";

const services = [
  {
    icon: <CctvIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    title: "Realtime Streaming",
    description: "Memungkinkan kamu untuk melakukan pemantauan CCTV secara realtime dengan latency ultra rendah.",
  },
  {
    icon: <SiTensorflow className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/20",
    title: "Fighting Recognition",
    description: "Deteksi otomatis aksi perkelahian atau kekerasan menggunakan algoritma Deep Learning.",
  },
  {
    icon: <SiTelegram className="h-6 w-6 text-sky-600 dark:text-sky-400" />,
    badgeBg: "bg-sky-500/10 dark:bg-sky-500/20",
    title: "Telegram Bot Alert",
    description: "Sistem pengiriman notifikasi serta cuplikan kejadian mencurigakan secara langsung via Telegram.",
  },
  {
    icon: <LayoutDashboard className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
    badgeBg: "bg-blue-500/10 dark:bg-blue-500/20",
    title: "CCTV Management",
    description: "Terintegrasi penuh dengan panel manajemen kamera, status jaringan, dan pemetaan lokasi.",
  },
  {
    icon: <Bomb className="h-6 w-6 text-rose-600 dark:text-rose-400" />,
    badgeBg: "bg-rose-500/10 dark:bg-rose-500/20",
    title: "Vandalisme Recognition",
    description: "Deteksi dini tindakan perusakan fasilitas umum dan potensi ancaman keamanan di area publik.",
  },
];

export function WhatsOnSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="mt-16 py-8">
      {/* SECTION HEADER */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
          <Sparkles className="h-3.5 w-3.5" />
          Feature Showcase
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          What's in CAKRA?
        </h2>
        <p className="text-base md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Everything you need for smart security and intelligent traffic monitoring
        </p>
      </div>

      {/* SERVICES GRID */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10"
      >
        {services.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xl dark:border-slate-800/80 dark:bg-slate-900/80 dark:hover:border-emerald-500/40"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${item.badgeBg} transition-transform group-hover:scale-110`}>
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Subtle Accent Line */}
            <div className="mt-6 h-1 w-12 rounded-full bg-slate-200 group-hover:w-full group-hover:bg-emerald-500 transition-all duration-300 dark:bg-slate-800" />
          </motion.div>
        ))}
      </motion.div>

      {/* FOOTER NOTE */}
      <p className="text-center text-sm md:text-base font-medium text-slate-500 dark:text-slate-400">
        Dan berbagai fitur terintegrasi lainnya yang terus dikembangkan
      </p>
    </section>
  );
}