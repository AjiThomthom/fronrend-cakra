"use client";

import { Circle, Send, Mail, ShieldAlert } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEmployeeForms } from "../em.hooks/em.hooks";
import { useState } from "react";
import { inviteUsers } from "@/services/accounts.service";
import { Controller } from "react-hook-form";

export default function EmployeForms() {
  const router = useRouter();
  const [load, setIsLoad] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useEmployeeForms();

  const params = useParams();

  const submitForm = async (data: any) => {
    try {
      setIsLoad(true);
      await inviteUsers(data, params.slugs as string);
      setIsLoad(false);
      router.back();
    } catch (error) {
      setIsLoad(false);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* EMAIL INPUT */}
        <div className="flex-1 space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Email Pengguna
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              autoComplete="off"
              {...register("email")}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800"
            />
          </div>
          {errors?.email && (
            <p className="text-[11px] font-medium text-rose-500">
              {errors.email?.message}
            </p>
          )}
        </div>

        {/* ROLE SELECT */}
        <div className="space-y-1.5 sm:w-36">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Role Akses
          </label>
          <Controller
            name="role"
            control={control}
            defaultValue="VISITOR"
            render={({ field }) => (
              <select
                {...field}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 outline-none transition-all focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <option value="STAFF" className="dark:bg-slate-900">
                  Staff
                </option>
                <option value="VISITOR" className="dark:bg-slate-900">
                  Visitor
                </option>
              </select>
            )}
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={load}
          className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 disabled:opacity-50 cursor-pointer dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
        >
          {load ? (
            <>
              <span>Mengundang...</span>
              <Circle className="h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              <span>Undang</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}