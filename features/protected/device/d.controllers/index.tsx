"use client";

import { useMapProvider } from "@/context/map.context";
import { useTokenJWT } from "@/context/user.context";
import {
  searchCamera,
  selectCameraCategory,
  selectCategorySearchKey,
} from "@/services/maps.service";
import { ChevronDown, MapPin, Plus, Search, Filter, Video, Lock, Globe } from "lucide-react";
import { KeyboardEvent, useEffect } from "react";
import { useCameraContext } from "../d.hooks/device.hooks";
import { CameraSchema } from "@/@types/camera.type";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function DeviceControllers() {
  const { setIsOpen, selectedCoordinat, setSelectedCoordinat } = useMapProvider();
  const {
    setCameras,
    setKeyword,
    keyword,
    selected,
    setSelected,
    setCount,
    count,
  } = useCameraContext();

  const page = useSearchParams().get("page") || "1";
  const params = useParams();
  const user = useTokenJWT();
  const router = useRouter();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setSelectedCoordinat({ lat, lng });
      });
    }
  }, []);

  const addCamera = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setSelectedCoordinat({ lat, lng });
      });
    }
    setIsOpen(true);
  };

  const searchCameraName = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    router.push("?page=1");
    if (!keyword.trim()) return window.location.reload();

    try {
      if (selected && selected !== "SEMUA") {
        const response: any = await selectandSearch();
        if (!response) return;
        setCount({
          private: response.meta.private,
          public: response.meta.public,
          total_page: response.meta.total_page,
        });
        setCameras(response.data);
        return;
      }

      const response: any = await searchCamera(keyword, page as string);
      if (!response) return;
      setCount({
        private: response.meta.private,
        public: response.meta.public,
        total_page: response.meta.total_page,
      });
      setCameras(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const selectCamera = async (value: string) => {
    router.push("?page=1");
    setSelected(value);

    if (keyword) {
      const response: any = await selectandSearch();
      if (!response) return;
      setCount({
        private: response.meta.private,
        public: response.meta.public,
        total_page: response.meta.total_page,
      });
      setCameras(response.data);
      return;
    }

    const response: any = await selectCameraCategory(
      value,
      page as string,
      params.slugs as string
    );
    if (!response) return;
    setCount({
      private: response.meta.private,
      public: response.meta.public,
      total_page: response.meta.total_page,
    });
    setCameras(response.data);
  };

  const selectandSearch = async () => {
    router.push("?page=1");
    if (!keyword) return null;
    try {
      const response: any = await selectCategorySearchKey(
        keyword,
        selected,
        page as string,
        params.slugs as string
      );
      if (!response) return null;
      setCount({
        private: response.meta.private,
        public: response.meta.public,
        total_page: response.meta.total_page,
      });
      setCameras(response.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-5">
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
            Perangkat Terdaftar
          </h1>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Total {count.private + count.public} titik CCTV terdaftar di wilayah instansi kamu
          </p>
        </div>

        <button
          disabled={user.role === "VISITOR"}
          onClick={addCamera}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95 self-start sm:self-auto dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Perangkat</span>
        </button>
      </div>

      {/* STATS & LIVE LOCATION CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* LOKASI USER LIVE CARD */}
        <div
          onClick={() =>
            router.push(
              `/${params.slugs}/map?lat=${selectedCoordinat?.lat}&lng=${selectedCoordinat?.lng}`
            )
          }
          className="group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/15 dark:bg-emerald-500/10"
        >
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                LOKASI SAYA &bull; LIVE
              </p>
            </div>
            <p className="truncate text-xs font-mono font-semibold text-slate-800 dark:text-slate-200">
              {selectedCoordinat ? `${selectedCoordinat.lat}, ${selectedCoordinat.lng}` : "Mengambil lokasi..."}
            </p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-600 transition-transform group-hover:scale-110 dark:text-emerald-400">
            <MapPin className="h-5 w-5" />
          </div>
        </div>

        {/* KATEGORI RATIO COUNTER CARD */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-1 items-center gap-3 border-r border-slate-200 pr-4 dark:border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">PUBLIK</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">{count.public}</p>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-3 pl-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">PRIVAT</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">{count.private}</p>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* SEARCH INPUT */}
        <div className="relative flex flex-1 items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama kamera atau lokasi... (Tekan Enter)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={searchCameraName}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-500"
          />
        </div>

        {/* SELECT KATEGORI */}
        <div className="relative flex w-full items-center sm:w-48">
          <Filter className="absolute left-3.5 h-4 w-4 text-emerald-500" />
          <select
            value={selected}
            onChange={(e) => selectCamera(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-8 text-xs font-bold text-slate-800 outline-none transition-all focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 cursor-pointer"
          >
            <option value="SEMUA" className="dark:bg-slate-900">SEMUA</option>
            <option value="PUBLIC" className="dark:bg-slate-900">PUBLIC</option>
            <option value="PRIVATE" className="dark:bg-slate-900">PRIVATE</option>
          </select>
          <ChevronDown className="absolute right-3.5 h-4 w-4 pointer-events-none text-slate-400" />
        </div>
      </div>
    </div>
  );
}