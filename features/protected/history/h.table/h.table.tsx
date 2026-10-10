"use client";

import { useEffect, useState, useMemo } from "react";
import { Check, X as XIcon, Calendar, Camera, Clock, ImageOff } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { HistoryItem } from "@/@types/data-history.type";
import {
  getAllHistory,
  updateConfirmedStatus,
  updateRejectedStatus,
} from "@/services/history.service";
import { useHistoryContext } from "../h.hooks";
import { useTokenJWT } from "@/context/user.context";
import { convertDate } from "@/lib/common";
import { motion, AnimatePresence } from "framer-motion";

type GrouppedHistory = Record<string, HistoryItem[]>;

const grouppedByDate = (datas: HistoryItem[]): GrouppedHistory => {
  if (!datas) return {};
  return datas.reduce((acc, item) => {
    const dateKey = item.date_incident ? item.date_incident.split("T")[0] : "unknown";
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(item);
    return acc;
  }, {} as GrouppedHistory);
};

export default function HistoryTable() {
  const { setHistory, dateIncident, status, history } = useHistoryContext();
  const [groupped, setGroupped] = useState<GrouppedHistory>({});
  const user = useTokenJWT();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");

  const selectedItem = useMemo(() => {
    if (!selectedId || !history?.data) return null;
    return (
      history.data.find(
        (item: HistoryItem) => item.incident_public_id === selectedId
      ) ?? null
    );
  }, [selectedId, history]);

  useEffect(
    function socketConnection() {
      const socket = getAllHistory(
        status,
        dateIncident,
        params.slugs as string,
        (response) => {
          setHistory(response);
          setGroupped(grouppedByDate(response.data ?? []));
        },
        (error) => console.error(error)
      );
      return () => {
        socket && socket.close();
      };
    },
    [status, dateIncident, params.slugs]
  );

  useEffect(() => {
    if (history?.data) setGroupped(grouppedByDate(history.data));
  }, [history]);

  const closePhoto = () => router.push("?");

  const updateRejected = async (id: string) => {
    try {
      setGroupped((prev) => {
        const next: GrouppedHistory = {};
        for (const [date, items] of Object.entries(prev)) {
          next[date] = items.map((item) =>
            item.incident_id === id ? { ...item, status: "REJECTED" } : item
          );
        }
        return next;
      });
      await updateRejectedStatus(id, params.slugs as string);
    } catch (error) {
      console.error(error);
    }
  };

  const updateConfirmed = async (id: string) => {
    try {
      setGroupped((prev) => {
        const next: GrouppedHistory = {};
        for (const [date, items] of Object.entries(prev)) {
          next[date] = items.map((item) =>
            item.incident_id === id ? { ...item, status: "CONFIRMED" } : item
          );
        }
        return next;
      });
      await updateConfirmedStatus(id, params.slugs as string);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusBadge = (st: string) => {
    switch (st) {
      case "CONFIRMED":
        return (
          <span className="inline-flex items-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
            CONFIRMED
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
            REJECTED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
            PENDING
          </span>
        );
    }
  };

  const isVisitor = user?.role === "VISITOR";

  return (
    <>
      <ViewMaxPhoto item={selectedItem} onClose={closePhoto} />

      <div className="space-y-6">
        {Object.keys(groupped).length > 0 ? (
          Object.entries(groupped).map(([date, items]) => (
            <div
              key={date}
              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              {/* GROUP DATE HEADER */}
              <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200">
                <Calendar className="h-4 w-4 text-emerald-500" />
                <span>{convertDate(new Date(date))}</span>
                <span className="ml-auto rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-black text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                  {items.length} Kejadian
                </span>
              </div>

              {/* TABLE DATA */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
                    {items.map((item, index) => (
                      <tr
                        key={item.incident_public_id ?? index}
                        onClick={() =>
                          router.push(`?id=${item.incident_public_id}`)
                        }
                        className="group cursor-pointer transition-colors hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                      >
                        {/* THUMBNAIL */}
                        <td className="w-20 px-4 py-3">
                          <div className="relative h-12 w-14 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800">
                            <img
                              src={`${process.env.NEXT_PUBLIC_AI_MEDIA}${item.image_url}`}
                              alt={item.camera_name || "insiden"}
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          </div>
                        </td>

                        {/* NAMA KAMERA & WAKTU */}
                        <td className="px-4 py-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                              <Camera className="h-3.5 w-3.5 text-slate-400" />
                              <span className="truncate">{item.camera_name}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                              <Clock className="h-3 w-3" />
                              <span>{item.time}</span>
                            </div>
                          </div>
                        </td>

                        {/* STATUS BADGE */}
                        <td className="px-4 py-3">
                          {getStatusBadge(item.status as string)}
                        </td>

                        {/* ACTION CONFIRM */}
                        <td className="w-12 px-2 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            disabled={isVisitor}
                            onClick={() => updateConfirmed(item.incident_id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-slate-950 cursor-pointer transition-colors"
                            title={isVisitor ? "Kamu tidak memiliki akses" : "Deteksi Benar"}
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        </td>

                        {/* ACTION REJECT */}
                        <td className="w-12 pr-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            disabled={isVisitor}
                            onClick={() => updateRejected(item.incident_id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed dark:text-rose-400 dark:hover:bg-rose-500 dark:hover:text-white cursor-pointer transition-colors"
                            title={isVisitor ? "Kamu tidak memiliki akses" : "Deteksi Salah"}
                          >
                            <XIcon className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white py-16 text-center dark:border-slate-800 dark:bg-slate-900">
            <ImageOff className="h-10 w-10 text-slate-400" />
            <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
              Belum ada riwayat insiden terdeteksi!
            </p>
          </div>
        )}
      </div>
    </>
  );
}

{/* MODAL FULL PHOTO PREVIEW */}
function ViewMaxPhoto({
  item,
  onClose,
}: {
  item: HistoryItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative flex w-full max-w-4xl flex-col items-center overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-4 shadow-2xl transition-colors dark:border-slate-800 dark:bg-slate-900"
          onClick={(e) => e.stopPropagation()}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur-md hover:bg-slate-900 cursor-pointer"
          >
            <XIcon className="h-5 w-5" />
          </button>

          {/* MAIN IMAGE */}
          <div className="relative flex max-h-[70vh] w-full items-center justify-center overflow-hidden rounded-2xl bg-black">
            <img
              src={`${process.env.NEXT_PUBLIC_AI_MEDIA}${item.image_url}`}
              alt={item.camera_name ?? "insiden"}
              className="max-h-[70vh] w-auto object-contain"
            />
          </div>

          {/* METADATA PANEL */}
          <div className="mt-4 flex w-full items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
            <div className="space-y-0.5">
              <h3 className="font-black text-slate-900 dark:text-white text-sm">
                {item.camera_name}
              </h3>
              <p className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                {item.time} &bull; {convertDate(new Date(item.date_incident))}
              </p>
            </div>

            <div>
              <span
                className={`inline-block rounded-xl border px-3 py-1 text-xs font-bold ${
                  item.status === "CONFIRMED"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : item.status === "REJECTED"
                    ? "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}