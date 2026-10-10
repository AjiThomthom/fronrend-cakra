"use client";

import { DeleteAgencyServices } from "@/services/agency.service";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DialogsDeleteAgency() {
  const router = useRouter();
  const out = useSearchParams().get("act");
  const params = useParams();

  if (out !== "delete") return null;

  const deleteAgency = async () => {
    const response = await DeleteAgencyServices(params.slugs as string);
    if (!response) return null;
    router.push("/onboarding");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl transition-colors dark:border-slate-800 dark:bg-slate-900"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-base font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Hapus Lembaga Permanen
            </h2>
            <button
              onClick={() => router.back()}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="my-4 text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
            Lembaga ini akan dihapus secara permanen dan tidak dapat dipulihkan. Riwayat aktivitas akan tetap tersimpan untuk keperluan audit, namun seluruh data dan akses terhadap lembaga ini tidak akan dapat digunakan kembali.
          </p>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              Batalkan
            </button>
            <button
              onClick={deleteAgency}
              className="rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-rose-600/20 hover:bg-rose-500 cursor-pointer"
            >
              Saya Yakin, Hapus
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}