"use client";

import { BASE_URL } from "@/services/maps.service";
import axios from "axios";
import { Copy, Check, ShieldAlert, KeyRound, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TokenDialogs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const open = searchParams.get("dialog") === "token";
  const [token, setToken] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const generateToken = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/telegram-token`,
        {},
        { withCredentials: true }
      );
      setToken(response.data.token);
    } catch (err) {
      console.error("Gagal mengambil token", err);
    }
  };

  useEffect(() => {
    if (open) {
      generateToken();
    }
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token as string);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Gagal menyalin token", err);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl transition-colors dark:border-slate-800 dark:bg-slate-900"
        >
          {/* HEADER DIALOG */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-emerald-500" />
              Token Verifikasi Telegram
            </h2>
            <button
              onClick={() => router.back()}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* PETUNJUK VERIFIKASI */}
          <div className="mt-4 space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed dark:text-slate-300">
              Salin token di bawah ini, lalu ketik{" "}
              <code className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:text-emerald-400">
                /verify &lt;TOKEN&gt;
              </code>{" "}
              pada bot Telegram CAKRA.
            </p>

            {/* KOTAK TOKEN */}
            <div className="flex items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/60">
              <span className="font-mono text-xs font-bold tracking-widest text-slate-900 dark:text-white truncate">
                {token || "Memuat token..."}
              </span>
              <button
                onClick={handleCopy}
                disabled={!token}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                title={copied ? "Tersalin!" : "Salin token"}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* PERINGATAN KEAMANAN */}
            <div className="flex items-start gap-2.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
              <ShieldAlert className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
              <span className="leading-tight">
                Jangan bagikan token ini kepada siapapun, termasuk pihak admin.
              </span>
            </div>
          </div>

          {/* TOMBOL AKSI */}
          <div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => router.back()}
              className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              Tutup
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://t.me/AlertCakraBot",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 cursor-pointer dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
            >
              Lanjutkan ke Telegram
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}