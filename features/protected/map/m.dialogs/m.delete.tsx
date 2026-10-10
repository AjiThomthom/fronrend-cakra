"use client";

import { useTokenJWT } from "@/context/user.context";
import { deleteCamera } from "@/services/maps.service";
import { ShieldAlert, Trash2, X } from "lucide-react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function MapsDialogDelete() {
  const router = useRouter();
  const confirmation = useSearchParams().get("confirmation");
  const pathname = usePathname();
  const user = useTokenJWT();
  const params = useParams();
  const id = useSearchParams().get("id");

  if (!confirmation) return null;

  const deleteCameraCCTV = async () => {
    if (!id) return null;
    const response = await deleteCamera(id as string, params.slugs as string);
    window.location.replace(pathname);
    return response;
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
          {user && user.role !== "VISITOR" ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-lg font-black text-rose-600 dark:text-rose-400 flex items-center gap-2">
                  <Trash2 className="h-5 w-5" />
                  Hapus Kamera CCTV?
                </h2>
                <button
                  onClick={() => router.back()}
                  className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                Kamera CCTV ini akan terhapus dari sistem, namun kamu tetap dapat mendaftarkannya kembali di masa mendatang.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => router.back()}
                  className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={deleteCameraCCTV}
                  className="rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-rose-600/20 hover:bg-rose-500 cursor-pointer"
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-base border-b border-slate-200 dark:border-slate-800 pb-3">
                <ShieldAlert className="h-5 w-5" />
                <span>Akses Ditolak</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Kamu tidak memiliki akses untuk fitur ini, hubungi STAFF atau OWNER untuk bantuan.
              </p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => router.back()}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}