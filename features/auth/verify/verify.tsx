"use client";

import { verifyAccounts } from "@/services/accounts.service";
import { CheckCircle2, XCircle, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";

export default function VerifyTemplate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState("");

  if (!token || !email) {
    return <InvalidVerifyTemplate />;
  }

  const verify = async () => {
    if (!token || !email) return null;
    setStatus("pending");
    try {
      await verifyAccounts(email as string, token as string);
      setStatus("success");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setStatus("invalid");
        setMessage(error.response?.data?.detail ?? "Verifikasi gagal");
      } else {
        setStatus("invalid");
        setMessage("Terjadi kesalahan saat verifikasi");
      }
    }
  };

  useEffect(() => {
    verify();
  }, []);

  if (status === "pending") {
    return <LoadingVerifyTemplate />;
  }

  if (status === "invalid") {
    return <InvalidVerifyTemplate message={message} />;
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-slate-50 px-4 py-8 transition-colors duration-300 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 text-center shadow-2xl transition-colors duration-300 md:p-8 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/70">
          
          {/* Logo & Status Badge */}
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-md border border-slate-200/80 dark:border-emerald-500/30 dark:shadow-emerald-500/10">
              <Image
                src="/CAKRA.png"
                alt="CAKRA Logo"
                width={42}
                height={42}
                priority
                className="object-contain"
              />
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verifikasi Akun</span>
            </div>
          </div>

          {/* Success Icon */}
          <div className="my-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 mx-auto dark:bg-emerald-500/20 dark:text-emerald-400">
            <CheckCircle2 className="h-10 w-10 animate-bounce" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl dark:text-white">
            Verifikasi Berhasil!
          </h1>
          <p className="mt-2 text-xs font-medium text-slate-500 md:text-sm dark:text-slate-300">
            Selamat datang di platform CAKRA. Akun Anda telah aktif dan siap digunakan.
          </p>

          <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

          {/* Action Button */}
          <button
            onClick={() => router.push("/login")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-500 active:scale-[0.98] dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 cursor-pointer"
          >
            <span>Mulai CAKRA</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function InvalidVerifyTemplate({ message }: { message?: string }) {
  const router = useRouter();
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-slate-50 px-4 py-8 transition-colors duration-300 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 text-center shadow-2xl transition-colors duration-300 md:p-8 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/70">
          
          {/* Logo */}
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-md border border-slate-200/80 dark:border-rose-500/30 dark:shadow-rose-500/10">
              <Image
                src="/CAKRA.png"
                alt="CAKRA Logo"
                width={42}
                height={42}
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Error Icon */}
          <div className="my-6 flex h-20 w-20 items-center justify-center rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-500 mx-auto dark:bg-rose-500/20 dark:text-rose-400">
            <XCircle className="h-10 w-10" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl dark:text-white">
            Verifikasi Gagal!
          </h1>
          <p className="mt-2 text-xs font-medium text-slate-500 md:text-sm dark:text-slate-300">
            {message
              ? message
              : "Token atau Email tidak valid, silakan periksa kembali tautan Anda!"}
          </p>

          <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

          {/* Action Button */}
          <button
            onClick={() => router.push("/login")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-200 py-3 text-sm font-bold text-slate-800 shadow-xs transition-all hover:bg-slate-300 active:scale-[0.98] dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 cursor-pointer"
          >
            <span>Kembali ke Halaman Login</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function LoadingVerifyTemplate() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-slate-50 px-4 py-8 transition-colors duration-300 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 text-center shadow-2xl transition-colors duration-300 md:p-8 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/70">
          
          {/* Logo */}
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-md border border-slate-200/80 dark:border-emerald-500/30">
              <Image
                src="/CAKRA.png"
                alt="CAKRA Logo"
                width={42}
                height={42}
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Loading Spinner */}
          <div className="my-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 mx-auto dark:bg-emerald-500/20 dark:text-emerald-400">
            <Loader2 className="h-10 w-10 animate-spin" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl dark:text-white">
            Memverifikasi Akun...
          </h1>
          <p className="mt-2 text-xs font-medium text-slate-500 md:text-sm dark:text-slate-300">
            Mohon tunggu sebentar, kami sedang memvalidasi token keamanan Anda.
          </p>

          <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

          {/* Disabled Button */}
          <button
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 py-3 text-sm font-bold text-slate-400 opacity-60 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-500 cursor-not-allowed"
          >
            <span>Sedang Memproses...</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}