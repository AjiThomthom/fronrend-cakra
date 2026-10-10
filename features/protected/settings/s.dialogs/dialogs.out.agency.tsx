"use client";

import { EmployeeType } from "@/@types/account.type";
import { useTokenJWT } from "@/context/user.context";
import { updateRoleService } from "@/services/accounts.service";
import { leaveAgencyServices } from "@/services/agency.service";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LogOut, CheckCircle2, UserCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DialogsOutAgency({ data }: { data: EmployeeType[] }) {
  const router = useRouter();
  const out = useSearchParams().get("act");
  const params = useParams();
  const user = useTokenJWT();
  const [selected, setSelected] = useState<EmployeeType | null>(null);

  if (out !== "leave" || !user) return null;

  const leaveAgency = async () => {
    if (user.role !== "OWNER") {
      const response = await leaveAgencyServices(params.slugs as string);
      if (!response) return null;
      router.replace("/");
      return;
    }

    if (!selected) return null;
    const updateUser = await updateRoleService(
      params.slugs as string,
      { role: "OWNER" },
      selected.account.account_id
    );

    if (!updateUser) return null;
    await leaveAgencyServices(params.slugs as string);
    router.replace("/");
  };

  const selectNewOwner = (item: EmployeeType) => {
    if (selected?.account.username === item.account.username) {
      setSelected(null);
    } else {
      setSelected(item);
    }
  };

  const isOwner = user.role === "OWNER";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl transition-colors dark:border-slate-800 dark:bg-slate-900"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <LogOut className="h-5 w-5 text-rose-500" />
              Konfirmasi Keluar dari Lembaga
            </h2>
            <button
              onClick={() => router.back()}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {isOwner ? (
            <div className="my-4 space-y-3">
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                Anda adalah <span className="font-bold text-purple-600 dark:text-purple-400">Owner</span> lembaga ini. Sebelum keluar, silakan pilih anggota yang akan menggantikan peran Anda:
              </p>

              <div className="max-h-52 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-2 space-y-1.5 dark:border-slate-800 dark:bg-slate-800/50">
                {data &&
                  data
                    .filter((item) => item.account.username !== user.username)
                    .map((item: EmployeeType, index: number) => {
                      const isSelected =
                        selected?.account.username === item.account.username;
                      return (
                        <div
                          key={index}
                          onClick={() => selectNewOwner(item)}
                          className={`flex cursor-pointer items-center justify-between rounded-xl p-2.5 text-xs transition-all ${
                            isSelected
                              ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                              : "bg-white hover:bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                          }`}
                        >
                          <div className="min-w-0 space-y-0.5">
                            <p className="font-bold truncate">{item.profile.fullname}</p>
                            <p className="text-[11px] font-mono text-slate-400 truncate">
                              @{item.account.username} &bull; {item.profile.email}
                            </p>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                          )}
                        </div>
                      );
                    })}
              </div>
            </div>
          ) : (
            <p className="my-4 text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
              Anda akan keluar dari lembaga ini. Seluruh riwayat aktivitas Anda akan tetap tersimpan, namun akses Anda ke lembaga ini akan dicabut.
            </p>
          )}

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              Batal
            </button>
            <button
              disabled={isOwner && !selected}
              onClick={leaveAgency}
              className="rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-rose-600/20 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Saya Mengerti, Keluar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}