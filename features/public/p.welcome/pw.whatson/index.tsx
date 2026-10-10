"use client";

import { Bomb, CctvIcon, LayoutDashboard, Sparkles, Zap } from "lucide-react";
import { SiTelegram, SiTensorflow } from "react-icons/si";
import { motion, Variants } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const services = [
  {
    icon: <CctvIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    tag: "Low Latency",
    title: "Realtime Streaming",
    description:
      "Pemantauan kamera CCTV interaktif tanpa delay signifikan menggunakan transmisi stream yang teroptimasi.",
  },
  {
    icon: <SiTensorflow className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/20",
    tag: "Computer Vision",
    title: "Fighting Recognition",
    description:
      "Algoritma AI pendeteksi pola perkelahian dan tindakan anomali fisik secara otomatis di area pantau.",
  },
  {
    icon: <SiTelegram className="h-6 w-6 text-sky-600 dark:text-sky-400" />,
    badgeBg: "bg-sky-500/10 dark:bg-sky-500/20",
    tag: "Instant Alert",
    title: "Telegram Bot Alert",
    description:
      "Notifikasi darurat seketika lengkap dengan cuplikan gambar saat ancaman terdeteksi oleh sistem.",
  },
  {
    icon: <LayoutDashboard className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
    badgeBg: "bg-blue-500/10 dark:bg-blue-500/20",
    tag: "Centralized UI",
    title: "CCTV Management",
    description:
      "Dashboard terpadu untuk pengelompokan wilayah, status koneksi feed kamera, dan riwayat kejadian.",
  },
  {
    icon: <Bomb className="h-6 w-6 text-rose-600 dark:text-rose-400" />,
    badgeBg: "bg-rose-500/10 dark:bg-rose-500/20",
    tag: "Public Safety",
    title: "Vandalisme Recognition",
    description:
      "Deteksi dini perusakan fasilitas umum dan tindakan mencurigakan di area publik secara realtime.",
  },
];

export function WhatsOnSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 260, damping: 20 },
    },
  };

  return (
    <section className="py-12">
      <div className="space-y-3 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Fitur Unggulan
        </motion.div>
        <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl dark:text-white">
          What's in CAKRA?
        </h2>
        <p className="mx-auto max-w-xl text-sm font-medium text-slate-600 md:text-base dark:text-slate-400">
          Ekosistem pemantauan CCTV cerdas berbasis AI untuk respons cepat dan presisi.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="my-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((item, index) => (
          <motion.div key={index} variants={cardVariants}>
            <SpotlightCard className="group flex h-full flex-col justify-between hover:border-emerald-500/40 dark:hover:border-emerald-500/40">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className={`rounded-xl p-3 ${item.badgeBg} transition-transform duration-300 group-hover:scale-110`}>
                    {item.icon}
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-400">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 md:text-sm dark:text-slate-400">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-emerald-400">
                <span>Teknologi Aktif</span>
                <Zap className="h-3.5 w-3.5" />
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}