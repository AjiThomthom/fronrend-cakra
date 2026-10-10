"use client";

import { useMapProvider } from "@/context/map.context";
import MapsForms from "../m.forms/m.forms";
import { AlertTriangle, ShieldAlert, X } from "lucide-react";
import { useTokenJWT } from "@/context/user.context";
import { motion, AnimatePresence } from "framer-motion";

export default function MapsDialogsAdd() {
  const { isOpen, setIsOpen } = useMapProvider();
  const user = useTokenJWT();

  const closeDialogs = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl transition-colors dark:border-slate-800 dark:bg-slate-900"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {user && user.role !== "VISITOR" ? "Tambah Kamera CCTV" : "Akses Ditolak"}
            </h2>
            <button
              onClick={closeDialogs}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="pt-4">
            {user && user.role !== "VISITOR" ? (
              <>
                {/* Banner Peringatan Privasi */}
                <div className="flex gap-3 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-800 dark:text-amber-300 mb-5 items-start">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-200">
                      KETENTUAN PRIVASI & HUKUM
                    </p>
                    <p className="text-xs leading-relaxed text-amber-800/90 dark:text-amber-300/90">
                      Mohon hanya mendaftarkan kamera CCTV yang memantau area publik atau fasilitas umum. Sistem tidak bertanggung jawab atas pendaftaran kamera di area domestik/privasi.
                    </p>
                  </div>
                </div>

                <MapsForms />
              </>
            ) : (
              <div className="space-y-4 py-2">
                <div className="flex items-center gap-3 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-600 dark:text-rose-400">
                  <ShieldAlert className="h-6 w-6 shrink-0" />
                  <p className="text-xs font-semibold leading-relaxed">
                    Kamu tidak memiliki akses untuk fitur ini. Hubungi STAFF atau OWNER untuk mendapatkan izin.
                  </p>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={closeDialogs}
                    className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}