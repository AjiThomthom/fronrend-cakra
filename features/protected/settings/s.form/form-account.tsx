"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useModeAccount } from "../s.hooks/account.hooks";
import { BASE_URL } from "@/services/maps.service";
import { useMyAccountForm } from "./hooks";
import { getMyAccounts, updateSubmitService } from "@/services/accounts.service";
import { AccountDataType } from "@/@types/account.type";
import { Camera, User, Lock, Save, RotateCcw, Edit3 } from "lucide-react";

export default function AccountForm() {
  const [data, setData] = useState<AccountDataType>();
  const { mode, setMode } = useModeAccount();
  const imageInput = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useMyAccountForm();

  const clickProfileInput = () => {
    if (imageInput) {
      imageInput.current?.click();
    }
  };

  const imageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (!image) return null;
    setMedia(image);
    setPreviewUrl(URL.createObjectURL(image));
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const getAccount = async () => {
    const response = await getMyAccounts();
    setData(response.data);
    reset(response.data);
  };

  useEffect(() => {
    getAccount();
  }, []);

  if (!data) return null;

  const profileImage = data?.photo_profile
    ? `${BASE_URL}/uploads/${data.photo_profile}`
    : undefined;

  const updateSubmit = async (formData: AccountDataType) => {
    const response = await updateSubmitService(formData, media as File);
    if (!response) return null;
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit(updateSubmit)} className="space-y-6 max-w-2xl">
      {/* PHOTO PROFILE CARD */}
      <div className="flex items-center gap-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-emerald-500 bg-slate-200 dark:bg-slate-700">
          {mode === "read" ? (
            profileImage ? (
              <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <User className="h-8 w-8 text-slate-400" />
            )
          ) : previewUrl ? (
            <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
          ) : profileImage ? (
            <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <User className="h-8 w-8 text-slate-400" />
          )}
        </div>

        <div className="space-y-1.5">
          <button
            type="button"
            disabled={mode === "read"}
            onClick={clickProfileInput}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
          >
            <Camera className="h-4 w-4 text-emerald-500" />
            <span>Ganti Foto Profil</span>
          </button>
          <p className="text-[11px] font-medium text-slate-400">
            Format JPG, GIF atau PNG. Ukuran Maksimal 1MB.
          </p>
          <input
            {...register("photo_profile")}
            ref={imageInput}
            onChange={imageChange}
            type="file"
            hidden
          />
          {errors?.photo_profile && (
            <p className="text-[11px] font-medium text-rose-500">
              {errors.photo_profile?.message}
            </p>
          )}
        </div>
      </div>

      {/* INPUT DATA PROFIL */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Nama Lengkap
          </label>
          <input
            {...register("fullname")}
            disabled={mode === "read"}
            type="text"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 px-3.5 text-xs font-medium text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500"
          />
          {errors?.fullname && (
            <p className="text-[11px] font-medium text-rose-500">
              {errors.fullname?.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Email Terdaftar
          </label>
          <input
            {...register("email")}
            disabled={mode === "read"}
            type="email"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 px-3.5 text-xs font-medium text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500"
          />
          {errors?.email && (
            <p className="text-[11px] font-medium text-rose-500">
              {errors.email?.message}
            </p>
          )}
        </div>

        {/* FIELD GANTI PASSWORD */}
        {mode === "edit" && (
          <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <Lock className="h-4 w-4 text-emerald-500" />
              <span>Ganti Kata Sandi</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Password Lama
              </label>
              <input
                {...register("old_password")}
                type="password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 px-3.5 text-xs font-medium text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500"
              />
              {errors?.old_password && (
                <p className="text-[11px] font-medium text-rose-500">
                  {errors.old_password?.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Password Baru
              </label>
              <input
                {...register("new_password")}
                type="password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 px-3.5 text-xs font-medium text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500"
              />
              {errors?.new_password && (
                <p className="text-[11px] font-medium text-rose-500">
                  {errors.new_password?.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ACTIONS BUTTONS */}
      <div className="pt-2">
        {mode === "edit" ? (
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 cursor-pointer dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
            >
              <Save className="h-4 w-4" />
              <span>Simpan Pembaruan</span>
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
        ) : (
          <button
            type="button"
            onClick={() => setMode("edit")}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 cursor-pointer dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
          >
            <Edit3 className="h-4 w-4" />
            <span>Perbarui Profil</span>
          </button>
        )}
      </div>
    </form>
  );
}