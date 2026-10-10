"use client";

import { LogOut, Trash2, Building2 } from "lucide-react";
import { DetailAgencyForm } from "../s.form/form-detail";
import { useTokenJWT } from "@/context/user.context";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { DialogsOutAgency } from "../s.dialogs/dialogs.out.agency";
import { DialogsDeleteAgency } from "../s.dialogs/dialogs.delete.agency";
import { useEffect, useState } from "react";
import { allAccountsUsers } from "@/services/accounts.service";
import { EmployeeType } from "@/@types/account.type";

export const AgencyDetailComponents = () => {
  const user = useTokenJWT();
  const router = useRouter();
  const params = useParams();
  const set = useSearchParams().get("set") || "agency-detail";

  const [members, setMembers] = useState<EmployeeType[]>([]);

  const getMembers = async () => {
    const response = await allAccountsUsers(params.slugs as string);
    if (!response) return null;
    setMembers(response.data || []);
  };

  useEffect(() => {
    getMembers();
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-emerald-500" />
            <h1 className="text-lg font-black text-slate-900 dark:text-white">
              Detail Lembaga
            </h1>
          </div>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Kelola informasi publik dan data profil utama lembaga Anda
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* TOMBOL HAPUS LEMBAGA */}
          <button
            disabled={user.role !== "OWNER"}
            onClick={() => router.push(`?set=${set}&act=delete`)}
            className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed dark:text-rose-400 cursor-pointer transition-all"
            title="Hapus Lembaga Permanen"
          >
            <Trash2 className="h-4 w-4" />
            <span>Hapus</span>
          </button>

          {/* TOMBOL KELUAR DARI LEMBAGA */}
          <button
            disabled={members.length === 0}
            onClick={() => router.push(`?set=${set}&act=leave`)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer transition-all"
            title="Keluar dari Lembaga ini"
          >
            <LogOut className="h-4 w-4" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      <DetailAgencyForm />
      <DialogsDeleteAgency />
      <DialogsOutAgency data={members} />
    </div>
  );
};