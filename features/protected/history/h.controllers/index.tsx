"use client";

import { KeyboardEvent, useState } from "react";
import { useParams } from "next/navigation";
import { useHistoryContext } from "../h.hooks";
import { getSearchHistory } from "@/services/history.service";
import { Search, Calendar, Filter, History as HistoryIcon, Clock, AlertTriangle } from "lucide-react";

interface HistoryStats {
  total: number;
  pending: number;
  accuracy: number;
}

interface HistoryControllersProps {
  stats?: HistoryStats;
  onSearchChange?: (value: string) => void;
  onDateFilterChange?: (value: string) => void;
  onStatusFilterChange?: (value: string) => void;
}

const dateOptions = [
  { value: "all", label: "Semua tanggal" },
  { value: "today", label: "Hari ini" },
  { value: "weekly", label: "Minggu ini" },
];

const statusOptions = [
  { value: "all", label: "Semua status" },
  { value: "pending", label: "Belum ditinjau" },
  { value: "confirmed", label: "Ditandai benar" },
  { value: "rejected", label: "Ditandai salah" },
];

export default function HistoryControllers({
  onSearchChange,
  onDateFilterChange,
  onStatusFilterChange,
}: HistoryControllersProps) {
  const [search, setSearch] = useState("");
  const {
    history,
    setDateIncident,
    setHistory,
    status,
    dateIncident,
    setStatus,
  } = useHistoryContext();
  const param = useParams();

  async function handleSearchChange(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    if (search.trim() === "") {
      return window.location.reload();
    }

    const data = await getSearchHistory(search, param.slugs as string);
    setHistory(data);
    onSearchChange?.(search);
  }

  function handleDateFilterChange(value: string) {
    setDateIncident(value);
    onDateFilterChange?.(value);
  }

  function handleStatusFilterChange(value: string) {
    setStatus(value);
    onStatusFilterChange?.(value);
  }

  return (
    <div className="space-y-6">
      {/* HEADER TITLE */}
      <div>
        <div className="flex items-center gap-2">
          <HistoryIcon className="h-5 w-5 text-emerald-500" />
          <h1 className="text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
            Riwayat Deteksi AI
          </h1>
        </div>
        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          Pantau dan konfirmasi seluruh log insiden terdeteksi oleh sistem kamera
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Kejadian
            </p>
            <p className="text-xl font-black text-slate-900 dark:text-white">
              {history?.meta?.total ?? 0}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 shadow-xs dark:bg-amber-500/10">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Belum Ditinjau
            </p>
            <p className="text-xl font-black text-amber-700 dark:text-amber-400">
              {history?.meta?.pending ?? 0}
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* INPUT PENCARIAN NAMA KAMERA */}
        <div className="relative flex flex-1 items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama kamera... (Tekan Enter)"
            value={search}
            onKeyDown={handleSearchChange}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-500"
          />
        </div>

        {/* FILTER TANGGAL */}
        <div className="relative flex w-full items-center sm:w-44">
          <Calendar className="absolute left-3.5 h-4 w-4 pointer-events-none text-emerald-500" />
          <select
            value={dateIncident}
            onChange={(e) => handleDateFilterChange(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-xs font-bold text-slate-800 outline-none transition-all focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 cursor-pointer"
          >
            {dateOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="dark:bg-slate-900">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* FILTER STATUS */}
        <div className="relative flex w-full items-center sm:w-48">
          <Filter className="absolute left-3.5 h-4 w-4 pointer-events-none text-emerald-500" />
          <select
            value={status}
            onChange={(e) => handleStatusFilterChange(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-xs font-bold text-slate-800 outline-none transition-all focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 cursor-pointer"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="dark:bg-slate-900">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}