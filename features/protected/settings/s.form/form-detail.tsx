"use client";

import { CurrentAgency, updateAgency } from "@/services/agency.service";
import { Edit3, Save, RotateCcw } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDetailAgencyForm } from "./hooks";
import { useTokenJWT } from "@/context/user.context";

export function DetailAgencyForm() {
  const [mode, setMode] = useState<string>("read");
  const params = useParams();

  const {
    reset,
    formState: { errors },
    handleSubmit,
    register,
  } = useDetailAgencyForm();

  const user = useTokenJWT();

  const getDetailAgency = async () => {
    const response = await CurrentAgency(params.slugs as string);
    if (!response) return null;

    const payload = {
      agency_name: response.data.agency.agency_name,
      agency_email_pic: response.data.agency_email_pic,
      agency_number_pic: response.data.agency_number_pic,
      agency_address: response.data.agency_address,
      agency_description: response.data.agency_description,
    };
    reset(payload);
  };

  useEffect(() => {
    getDetailAgency();
  }, []);

  const submitDetail = async (data: any) => {
    const response = await updateAgency(params.slugs as string, data);
    if (!response) return null;
    setMode("read");
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit(submitDetail)} className="space-y-4 max-w-2xl">
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
          Nama Lembaga / Instansi
        </label>
        <input
          {...register("agency_name")}
          disabled={mode === "read"}
          type="text"
          className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 px-3.5 text-xs font-medium text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500"
        />
        {errors?.agency_name && (
          <p className="text-[11px] font-medium text-rose-500">
            {errors.agency_name?.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
          Email Resmi Lembaga
        </label>
        <input
          {...register("agency_email_pic")}
          disabled={mode === "read"}
          type="email"
          className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 px-3.5 text-xs font-medium text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500"
        />
        {errors?.agency_email_pic && (
          <p className="text-[11px] font-medium text-rose-500">
            {errors.agency_email_pic?.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
          Nomor Telepon
        </label>
        <input
          {...register("agency_number_pic")}
          disabled={mode === "read"}
          type="tel"
          className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 px-3.5 text-xs font-medium text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500"
        />
        {errors?.agency_number_pic && (
          <p className="text-[11px] font-medium text-rose-500">
            {errors.agency_number_pic?.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
          Alamat Lengkap
        </label>
        <textarea
          {...register("agency_address")}
          disabled={mode === "read"}
          rows={3}
          className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 px-3.5 text-xs font-medium text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500"
        />
        {errors?.agency_address && (
          <p className="text-[11px] font-medium text-rose-500">
            {errors.agency_address?.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
          Deskripsi Singkat
        </label>
        <textarea
          {...register("agency_description")}
          disabled={mode === "read"}
          rows={3}
          className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 px-3.5 text-xs font-medium text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500"
        />
        {errors?.agency_description && (
          <p className="text-[11px] font-medium text-rose-500">
            {errors.agency_description?.message}
          </p>
        )}
      </div>

      <div className="pt-3">
        {mode === "read" ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setMode("edit");
            }}
            disabled={user.role !== "OWNER"}
            className="flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Data Lembaga</span>
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 cursor-pointer dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
            >
              <Save className="h-4 w-4" />
              <span>Simpan Perubahan</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("read")}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Batal</span>
            </button>
          </div>
        )}
      </div>
    </form>
  );
}