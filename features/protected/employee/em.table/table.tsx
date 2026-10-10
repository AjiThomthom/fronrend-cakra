"use client";

import { EmployeeType } from "@/@types/account.type";
import { useTokenJWT } from "@/context/user.context";
import { allAccountsUsers, updateRoleService } from "@/services/accounts.service";
import { Trash2, UserX, Mail, Phone, Shield, ShieldCheck, UserCheck } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useEmployeContext } from "../em.hooks/em.hooks";
import { useParams, useRouter } from "next/navigation";
import EmployeDeleteDialogs from "../em.dialogs/e.delete";

function getInitials(name: string) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TableEmployee() {
  const { employe, setEmploye, keyword } = useEmployeContext();
  const user = useTokenJWT();
  const router = useRouter();
  const params = useParams();

  const getAllUsers = async () => {
    const response = await allAccountsUsers(params.slugs as string);
    if (!response) return null;
    setEmploye(response.data);
  };

  const updateRole = async (username: string, role: string, id: string) => {
    setEmploye((prev) =>
      prev.map((item) =>
        item.account.username === username ? { ...item, role } : item
      )
    );
    await updateRoleService(params.slugs as string, { role }, id);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const filteredUsers = useMemo(
    () =>
      employe.filter(
        (item) =>
          item.profile.fullname.toLowerCase().includes(keyword.toLowerCase()) ||
          item.account.username.toLowerCase().includes(keyword.toLowerCase())
      ),
    [employe, keyword]
  );

  if (!employe) return null;

  const isOwnerViewer = user && user.role === "OWNER";

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3.5">Nama & Username</th>
                <th className="hidden px-4 py-3.5 sm:table-cell">Email</th>
                <th className="px-4 py-3.5">Role / Hak Akses</th>
                <th className="hidden px-4 py-3.5 md:table-cell">Nomor Telepon</th>
                <th className="px-4 py-3.5 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
              {filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers.map((item, index) => (
                  <tr
                    key={item.account.account_id ?? index}
                    className="transition-colors hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-xs font-black text-emerald-600 dark:text-emerald-400">
                          {getInitials(item.profile.fullname)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate dark:text-white">
                            {item.profile.fullname}
                          </p>
                          <p className="text-[11px] font-mono text-slate-400 truncate">
                            @{item.account.username}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="hidden px-4 py-3.5 text-slate-600 sm:table-cell dark:text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{item.profile.email}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      {isOwnerViewer ? (
                        <select
                          disabled={item.role === "OWNER"}
                          value={item.role}
                          onChange={(e) =>
                            updateRole(
                              item.account.username,
                              e.target.value,
                              item.account.account_id
                            )
                          }
                          className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold outline-none cursor-pointer disabled:cursor-not-allowed ${
                            item.role === "OWNER"
                              ? "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400"
                              : item.role === "STAFF"
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                        >
                          {user.role === "OWNER" && (
                            <option value="OWNER" disabled className="dark:bg-slate-900">
                              Owner
                            </option>
                          )}
                          <option value="STAFF" className="dark:bg-slate-900">
                            Staff
                          </option>
                          <option value="VISITOR" className="dark:bg-slate-900">
                            Visitor
                          </option>
                        </select>
                      ) : (
                        <span
                          className={`inline-block rounded-lg border px-2.5 py-1 text-[11px] font-bold ${
                            item.role === "OWNER"
                              ? "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400"
                              : item.role === "STAFF"
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                        >
                          {item.role}
                        </span>
                      )}
                    </td>

                    <td className="hidden px-4 py-3.5 font-mono text-slate-600 md:table-cell dark:text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{item.profile.number_phone || "N/A"}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      <button
                        disabled={user?.role === "VISITOR"}
                        onClick={() =>
                          router.push(`?id-member=${item.public_account_agency_id}`)
                        }
                        className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600 transition-colors hover:bg-rose-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-rose-500 dark:hover:text-white cursor-pointer"
                        title={
                          user?.role !== "VISITOR"
                            ? "Hapus Pengguna"
                            : "Tidak Memiliki Akses"
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                      <UserX className="h-8 w-8 text-slate-400" />
                      <p className="text-xs font-semibold">Tidak ada anggota ditemukan!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EmployeDeleteDialogs data={filteredUsers} />
    </>
  );
}