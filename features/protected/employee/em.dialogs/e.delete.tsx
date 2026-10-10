"use client";

import { EmployeeType } from "@/@types/account.type";
import { useTokenJWT } from "@/context/user.context";
import { deleteMembers } from "@/services/accounts.service";
import { UserMinus, X } from "lucide-react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function EmployeDeleteDialogs({
  data,
}: {
  data: EmployeeType[];
}) {
  const id = useSearchParams().get("id-member");
  const detailUser = data?.find((item) => item.public_account_agency_id === id);
  const router = useRouter();
  const params = useParams();
  const user = useTokenJWT();
  const pathname = usePathname();

  if (!id || !data) return null;

  const DeleteUser = async (id: string) => {
    await deleteMembers(id, params.slugs as string);
    window.location.replace(pathname);
  };

  const isSelfOrOwner =
    user?.username === detailUser?.account.username || detailUser?.role === "OWNER";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl transition-colors dark:border-slate-800 dark:bg-slate-900"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-base font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <UserMinus className="h-5 w-5" />
              Konfirmasi Hapus Anggota
            </h2>
            <button
              onClick={() => router.back()}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="my-4 text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
            Pengguna <span className="font-bold text-slate-900 dark:text-white">{detailUser?.profile.fullname}</span> akan dihapus dari instansi ini. Anda tetap dapat mengundangnya kembali di masa mendatang.
          </p>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => router.back()}
              className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              Batal
            </button>
            <button
              disabled={isSelfOrOwner}
              onClick={() => DeleteUser(id as string)}
              className="rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-rose-600/20 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Ya, Hapus
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}