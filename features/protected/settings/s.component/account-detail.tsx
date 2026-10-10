"use client";

import AccountForm from "../s.form/form-account";
import { UserCheck } from "lucide-react";

export const AccountComponents = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-emerald-500" />
          <h1 className="text-lg font-black text-slate-900 dark:text-white">
            Pengaturan Akun Saya
          </h1>
        </div>
        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          Kelola informasi pribadi dan kredensial keamanan akun Anda
        </p>
      </div>

      <AccountForm />
    </div>
  );
};