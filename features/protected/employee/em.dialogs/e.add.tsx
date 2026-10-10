"use client";

import { useRouter, useSearchParams } from "next/navigation";
import EmployeForms from "../em.forms/forms";
import { UserPlus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmployeeAddDialog() {
  const dialog = useSearchParams().get("dialogs");
  const router = useRouter();

  if (!dialog) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl transition-colors dark:border-slate-800 dark:bg-slate-900"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
                <UserPlus className="h-4 w-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Undang Pengguna Baru
              </h2>
            </div>
            <button
              onClick={() => router.back()}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="pt-4">
            <EmployeForms />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}