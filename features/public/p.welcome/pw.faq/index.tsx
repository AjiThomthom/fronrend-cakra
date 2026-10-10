"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { ChevronDown, HelpCircleIcon } from "lucide-react";
import { motion } from "framer-motion";

export function FaQSection() {
  return (
    <div className="my-16 space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
          <HelpCircleIcon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Pertanyaan yang sering diajukan mengenai platform CAKRA
          </p>
        </div>
      </div>

      {/* ACCORDION LIST */}
      <div className="space-y-3">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Accordion
              disableGutters
              elevation={0}
              sx={{
                bgcolor: "transparent",
                color: "inherit",
                borderRadius: "1rem !important",
                border: "1px solid",
                borderColor: "rgba(148, 163, 184, 0.2)",
                "&:before": { display: "none" },
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
              className="bg-white/80 backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-800"
            >
              <AccordionSummary
                expandIcon={<ChevronDown className="h-5 w-5 text-emerald-500" />}
                className="font-semibold text-slate-800 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {item.question}
              </AccordionSummary>
              <AccordionDetails className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                {item.answer}
              </AccordionDetails>
            </Accordion>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const faqData = [
  {
    question: "Apa itu platform CAKRA?",
    answer:
      "CAKRA (Cepat, Akurat, Koordinasi Respon Aman) adalah platform integrasi kamera CCTV berbasis Artificial Intelligence (AI) yang dirancang untuk membantu pemantauan keamanan real-time serta mendeteksi berbagai kejadian berbahaya secara otomatis.",
  },
  {
    question: "Bagaimana cara kerja fitur Fighting & Object Detection?",
    answer:
      "Sistem AI CAKRA menganalisis aliran video CCTV secara langsung menggunakan model Deep Learning untuk mengidentifikasi objek spesifik serta pola gerakan perkelahian/kekerasan secara instan.",
  },
  {
    question: "Apakah notifikasi peringatan dikirim secara otomatis?",
    answer:
      "Ya, ketika AI mendeteksi kejadian mencurigakan atau pelanggaran, sistem akan langsung mengirimkan peringatan (alert) secara otomatis melalui Telegram Bot kepada tim keamanan atau admin terpilih.",
  },
  {
    question: "Apakah CAKRA dapat diintegrasikan dengan jenis CCTV apapun?",
    answer:
      "Selama kamera CCTV mendukung protokol streaming standar seperti RTSP (Real-Time Streaming Protocol) atau IP Camera, kamera tersebut dapat terintegrasi dengan platform CAKRA.",
  },
  {
    question: "Bagaimana cara mendaftarkan lokasi atau CCTV baru?",
    answer:
      "Anda dapat membuat akun terlebih dahulu melalui tombol 'Register Now', lalu masuk ke menu Dashboard untuk mengelola dan menambahkan perangkat CCTV baru ke dalam sistem.",
  },
];