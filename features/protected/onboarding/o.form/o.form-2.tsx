"use client";

import { useAcceptForms } from "../o.hooks/o.hooks-1";
import { acceptInvite } from "@/services/accounts.service";
import { useTokenJWT } from "@/context/user.context";
import { KeyRound, ArrowRight } from "lucide-react";

export default function AcceptionForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useAcceptForms();
  const user = useTokenJWT();

  const datasubmitted = async (data: { token: string }) => {
    if (!user) return null;
    const payload = {
      email: user.email,
      token: data.token,
    };
    const response = await acceptInvite(payload);
    const slug = response.account.agency.slug_agency;
    console.log(slug);
    if (!slug) {
      console.error(`Tidak ada slug!`);
      return;
    }
    setTimeout(() => {
      window.location.href = `/${slug}/home`;
    }, 3000);
  };

  return (
    <form
      onSubmit={handleSubmit(datasubmitted)}
      className="flex flex-col sm:flex-row items-start gap-2.5 w-full pt-1"
    >
      <div className="flex flex-col gap-y-1 w-full flex-1">
        <div className="relative flex items-center">
          <KeyRound className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Masukkan Kode Undangan"
            autoComplete="off"
            {...register("token")}
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-500"
          />
        </div>
        {errors?.token && (
          <p className="text-xs font-medium text-rose-500 text-start">
            {errors.token?.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="flex h-[42px] w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 text-sm font-bold text-emerald-600 shadow-xs transition-all hover:bg-emerald-500 hover:text-white active:scale-[0.98] dark:bg-emerald-500/20 dark:text-emerald-300 dark:hover:bg-emerald-500 dark:hover:text-slate-950 cursor-pointer shrink-0"
      >
        <span>Masuk</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}