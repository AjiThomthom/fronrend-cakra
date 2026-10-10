"use client";

import { Plus, Search, Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEmployeContext } from "../em.hooks/em.hooks";
import { KeyboardEvent } from "react";
import { searchAccounts } from "@/services/accounts.service";
import { useTokenJWT } from "@/context/user.context";

export default function EmployeeControllers() {
  const { employe, setKeyword, keyword, setEmploye } = useEmployeContext();
  const router = useRouter();
  const params = useParams();
  const user = useTokenJWT();

  const findPeople = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return null;
    router.push(`?search=${keyword}`);
    const response = await searchAccounts(keyword, params.slugs as string);
    if (!response) return null;
    setEmploye(response);
  };

  if (!user) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-500" />
            <h1 className="text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
              Hak Akses Anggota
            </h1>
          </div>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Terdaftar {employe.length} pengguna dalam sistem instansi kamu
          </p>
        </div>

        <button
          onClick={() => router.push("?dialogs=add")}
          disabled={user.role !== "OWNER"}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95 self-start sm:self-auto dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Hak Akses</span>
        </button>
      </div>

      <div className="relative flex max-w-md items-center">
        <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Cari username atau nama lengkap... (Tekan Enter)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={findPeople}
          className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-500"
        />
      </div>
    </div>
  );
}