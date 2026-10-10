"use client";

import { AgencyType } from "@/@types/agency.type";
import { AgencyCreate } from "@/services/agency.service";
import { useTokenJWT } from "@/context/user.context";
import { useRouter } from "next/navigation";
import { useCreateAgencyForms } from "../o.hooks/o.hooks-1";
import { Building2, PlusCircle } from "lucide-react";

export default function CreateAgencyForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useCreateAgencyForms();
  const user = useTokenJWT();
  const router = useRouter();

  const submit = async (e: AgencyType) => {
    if (!user) return null;
    try {
      const payload = {
        agency_name: e.agency_name,
        created_by: user.id,
      };

      const response = await AgencyCreate(payload);
      console.log(response);
      if (response) {
        window.location.href = `/${response.data.data.slug_agency}/home`;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-y-4 w-full"
    >
      <div className="flex flex-col gap-y-1.5 w-full">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
          Nama Instansi / Lembaga
        </label>
        <div className="relative flex items-center">
          <Building2 className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Contoh: Dinas Perhubungan Bekasi"
            autoComplete="off"
            {...register("agency_name")}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800"
          />
        </div>
        {errors?.agency_name && (
          <p className="text-xs font-medium text-rose-500 text-start">
            {errors.agency_name?.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-500 active:scale-[0.98] dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 cursor-pointer"
      >
        <PlusCircle className="h-4 w-4" />
        <span>Daftarkan Instansi</span>
      </button>
    </form>
  );
}