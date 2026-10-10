"use client";

import { useMapProvider } from "@/context/map.context";
import { useCameraForms } from "../m.hooks/m.hooks";
import { useEffect, useState } from "react";
import { addCamera } from "@/services/maps.service";
import { CameraSchema } from "@/@types/camera.type";
import { useParams } from "next/navigation";
import { Camera, Link2, MapPin, Plus } from "lucide-react";

export default function MapsForms() {
  const { setIsOpen, selectedCoordinat } = useMapProvider();
  const [categoryCamera, setCategoryCamera] = useState("PRIVATE");
  const {
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useCameraForms();

  const params = useParams();

  useEffect(() => {
    if (selectedCoordinat) {
      setValue("latitude", selectedCoordinat.lat);
      setValue("longitude", selectedCoordinat.lng);
    }
  }, [selectedCoordinat, setValue]);

  const closeDialogs = () => {
    setIsOpen(false);
  };

  const submitform = async (data: any) => {
    try {
      const payload: CameraSchema = {
        ...data,
        category: categoryCamera,
      };
      const response = await addCamera(payload, params.slugs as string);
      if (!response) return null;
      window.location.reload();
      setIsOpen(false);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitform)} className="space-y-4">
      {/* Nama Kamera */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
          Nama Kamera
        </label>
        <div className="relative flex items-center">
          <Camera className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-400" />
          <input
            type="text"
            placeholder="Contoh: CCTV Simpang Empat"
            autoComplete="off"
            {...register("camera_name")}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800 dark:focus:ring-emerald-500/20"
          />
        </div>
        {errors?.camera_name && (
          <p className="text-[11px] font-medium text-rose-500">
            {errors.camera_name?.message}
          </p>
        )}
      </div>

      {/* URL Stream */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
          URL Stream (RTSP / HLS)
        </label>
        <div className="relative flex items-center">
          <Link2 className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-400" />
          <input
            type="text"
            placeholder="rtsp://admin:pass@ip:port/stream"
            autoComplete="off"
            {...register("source_url")}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800 dark:focus:ring-emerald-500/20"
          />
        </div>
        {errors?.source_url && (
          <p className="text-[11px] font-medium text-rose-500">
            {errors.source_url?.message}
          </p>
        )}
      </div>

      {/* Latitude & Longitude (Read-only) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            readOnly
            {...register("latitude", { valueAsNumber: true })}
            className="w-full rounded-xl border border-slate-200 bg-slate-100 py-2 px-3 text-xs font-mono font-medium text-slate-600 outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300 cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            readOnly
            {...register("longitude", { valueAsNumber: true })}
            className="w-full rounded-xl border border-slate-200 bg-slate-100 py-2 px-3 text-xs font-mono font-medium text-slate-600 outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Deskripsi Lokasi */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
          Deskripsi Lokasi
        </label>
        <div className="relative flex items-center">
          <MapPin className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-400" />
          <input
            type="text"
            placeholder="Dekat pos satpam / gerbang utama"
            autoComplete="off"
            {...register("location_description")}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800 dark:focus:ring-emerald-500/20"
          />
        </div>
      </div>

      {/* Kategori */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
          Kategori
        </label>
        <select
          value={categoryCamera}
          onChange={(e) => setCategoryCamera(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 outline-none transition-all focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500 cursor-pointer"
        >
          <option value="PRIVATE" className="dark:bg-slate-900 dark:text-white">Private (Internal Instansi)</option>
          <option value="PUBLIC" className="dark:bg-slate-900 dark:text-white">Public (Dapat Diakses Umum)</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={closeDialogs}
          className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 cursor-pointer dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 transition-all active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Kamera</span>
        </button>
      </div>
    </form>
  );
}