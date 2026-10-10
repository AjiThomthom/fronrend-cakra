"use client";

import Link from "next/link";
import { useLoginForms } from "../l.hooks";
import axios from "axios";
import { loginService } from "@/services/accounts.service";
import { LoginSchema } from "@/@types/account.type";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User, LogIn, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function LoginForms() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useLoginForms();
  const [isOpenPassword, setIsOpenPassword] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  
  // State untuk menyimpan pesan error dari server
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const signIn = async (data: LoginSchema) => {
    setDisabled(true);
    setErrorMessage(null); // Reset error saat mencoba login kembali

    try {
      const response = await loginService(data);

      if (!response) {
        setErrorMessage("Username atau password tidak ditemukan.");
        setDisabled(false);
        return;
      }

      if (response?.agency && response.agency.count > 0) {
        console.log("masuk ke block agency", response);
        router.push(`/${response.agency.data.slug_agency}/home`);
      } else {
        router.push("/onboarding");
      }
    } catch (error: any) {
      setDisabled(false);
      
      // Tangkap pesan error dari response backend
      if (axios.isAxiosError(error)) {
        const detailMessage =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          "Username atau password salah / akun belum terdaftar!";
        setErrorMessage(detailMessage);
      } else {
        setErrorMessage("Terjadi kesalahan koneksi ke server. Silakan coba lagi.");
      }
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form
      className="flex flex-col my-3 items-center gap-y-4 w-full"
      onSubmit={handleSubmit(signIn)}
    >
      {/* BANNER ERROR MSG (Tampil jika login gagal / user tidak terdaftar) */}
      {errorMessage && (
        <div className="flex w-full items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-semibold text-rose-600 dark:border-rose-500/40 dark:bg-rose-500/15 dark:text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
          <span className="leading-tight">{errorMessage}</span>
        </div>
      )}

      {/* FIELD USERNAME */}
      <div className="flex flex-col gap-y-1.5 w-full">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
          Username
        </label>
        <div className="relative flex items-center">
          <User className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Masukan username..."
            autoComplete="off"
            {...register("username", {
              onChange: (e) => {
                e.target.value = e.target.value.toLowerCase();
              },
            })}
            style={{ textTransform: "lowercase" }}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800"
          />
        </div>
        {errors?.username && (
          <p className="text-xs font-medium text-rose-500 text-start">
            {errors.username?.message}
          </p>
        )}
      </div>

      {/* FIELD PASSWORD */}
      <div className="flex flex-col gap-y-1.5 w-full">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
          Password
        </label>
        <div className="relative flex items-center">
          <Lock className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type={isOpenPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="off"
            autoCorrect="off"
            {...register("password")}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800"
          />
          <button
            type="button"
            onClick={() => setIsOpenPassword(!isOpenPassword)}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-pointer"
          >
            {isOpenPassword ? (
              <Eye className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </button>
        </div>
        {errors?.password && (
          <p className="text-xs font-medium text-rose-500 text-start">
            {errors.password?.message}
          </p>
        )}
      </div>

      {/* TOMBOL MASUK */}
      <button
        disabled={disabled}
        type="submit"
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 cursor-pointer"
      >
        <LogIn className="h-4 w-4" />
        <span>{disabled ? "Memproses..." : "Masuk"}</span>
      </button>

      {/* REGISTRATION LINK */}
      <p className="text-xs text-slate-600 dark:text-slate-300 pt-1">
        Belum punya akun?{" "}
        <Link
          href={"/register"}
          className="font-bold text-emerald-600 hover:underline dark:text-emerald-400"
        >
          klik disini
        </Link>
      </p>
    </form>
  );
}