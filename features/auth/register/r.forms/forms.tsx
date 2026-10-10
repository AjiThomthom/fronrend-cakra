"use client";

import Link from "next/link";
import useRegisterForm, { useOpenContext } from "../r.hooks";
import { registerService } from "@/services/accounts.service";
import { useRouter } from "next/navigation";
import { useTokenJWT } from "@/context/user.context";
import { Eye, EyeOff, Lock, Mail, PhoneCall, User, UserPlus } from "lucide-react";
import { useState } from "react";

export default function RegisterForms() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useRegisterForm();
  const [isOpenConfirmPassword, setIsOpenConfirmPassword] = useState(false);
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { setIsOpen } = useOpenContext();
  const router = useRouter();

  const payload = async (data: any) => {
    try {
      setIsDisabled(true);
      const response = await registerService(data);
      if (!response) {
        alert("Gagal mendaftarkan akun");
      }
      router.push("/login");
    } catch (e) {
      setIsDisabled(false);
      setIsOpen(false);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <form
      className="flex flex-col my-2 items-center gap-y-5 w-full"
      onSubmit={handleSubmit(payload)}
    >
      {/* GRID INPUT 2 KOLOM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        
        {/* USERNAME */}
        <div className="flex flex-col gap-y-1.5 w-full">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Username
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="johndoe"
              autoComplete="off"
              autoCorrect="off"
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

        {/* EMAIL */}
        <div className="flex flex-col gap-y-1.5 w-full">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Email
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              autoComplete="off"
              autoCorrect="off"
              {...register("email", {
                onChange: (e) => {
                  e.target.value = e.target.value.toLowerCase();
                },
              })}
              style={{ textTransform: "lowercase" }}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800"
            />
          </div>
          {errors?.email && (
            <p className="text-xs font-medium text-rose-500 text-start">
              {errors.email?.message}
            </p>
          )}
        </div>

        {/* NOMOR TELEPON */}
        <div className="flex flex-col gap-y-1.5 w-full">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Nomor Telepon
          </label>
          <div className="relative flex items-center">
            <PhoneCall className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="+62812345678"
              autoComplete="off"
              autoCorrect="off"
              {...register("number_phone", {
                onChange: (e) => {
                  e.target.value = e.target.value.toLowerCase();
                },
              })}
              style={{ textTransform: "lowercase" }}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800"
            />
          </div>
          {errors?.number_phone && (
            <p className="text-xs font-medium text-rose-500 text-start">
              {errors.number_phone?.message}
            </p>
          )}
        </div>

        {/* NAMA LENGKAP */}
        <div className="flex flex-col gap-y-1.5 w-full">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Nama Lengkap
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="John Doe"
              autoComplete="off"
              autoCorrect="off"
              {...register("fullname")}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800"
            />
          </div>
          {errors?.fullname && (
            <p className="text-xs font-medium text-rose-500 text-start">
              {errors.fullname?.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
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

        {/* CONFIRM PASSWORD */}
        <div className="flex flex-col gap-y-1.5 w-full">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Confirm Password
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type={isOpenConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="off"
              {...register("confirm_password")}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800"
            />
            <button
              type="button"
              onClick={() => setIsOpenConfirmPassword(!isOpenConfirmPassword)}
              className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-pointer"
            >
              {isOpenConfirmPassword ? (
                <Eye className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </button>
          </div>
          {errors?.confirm_password && (
            <p className="text-xs font-medium text-rose-500 text-start">
              {errors.confirm_password?.message}
            </p>
          )}
        </div>
      </div>

      {/* TOMBOL DAFTAR */}
      <button
        disabled={isDisabled}
        type="submit"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 cursor-pointer"
      >
        <UserPlus className="h-4 w-4" />
        <span>{isDisabled ? "Memproses..." : "Daftar"}</span>
      </button>

      {/* LINK NAVIGASI LOGIN */}
      <p className="text-xs text-slate-600 dark:text-slate-300 pt-1">
        Sudah punya akun?{" "}
        <Link
          href={"/login"}
          className="font-bold text-emerald-600 hover:underline dark:text-emerald-400"
        >
          klik disini
        </Link>
      </p>
    </form>
  );
}