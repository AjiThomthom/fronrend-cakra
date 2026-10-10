"use client";

import { CameraSchema } from "@/@types/camera.type";
import { useTokenJWT } from "@/context/user.context";
import { StreamSocketCamera } from "@/services/camera.service";
import { getDetailCamera, getDetailCameraPublic } from "@/services/maps.service";
import { Trash2, X, Video, MapPin } from "lucide-react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MIME_CODEC = 'video/mp4; codecs="avc1.42E01E"';
const MAX_BUFFER_SECONDS = 10;

export default function MapsDialogsShow() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const page = searchParams.get("page");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const user = useTokenJWT();

  const [selectedCamera, setSelectedCamera] = useState<CameraSchema>();
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [streamError, setStreamError] = useState<string | null>(null);

  const closeDialog = () => router.back();

  useEffect(() => {
    if (!id) {
      setSelectedCamera(undefined);
      return;
    }

    let cancelled = false;

    const fetchDetail = async () => {
      try {
        let response: CameraSchema | undefined;
        if (
          pathname === `/${params.slugs}/map` ||
          pathname === `/${params.slugs}/device`
        ) {
          response = await getDetailCamera(id, params.slugs as string);
        } else if (pathname === "/maps") {
          response = await getDetailCameraPublic(id);
        }
        if (!cancelled) setSelectedCamera(response);
      } catch (err) {
        console.error("Failed to fetch camera detail", err);
      }
    };

    fetchDetail();
    return () => {
      cancelled = true;
    };
  }, [id, pathname, params.slugs]);

  useEffect(() => {
    if (!selectedCamera || !videoEl) return;

    setStreamError(null);

    const stream = StreamSocketCamera(id as string, videoEl, {
      mimeCodec: MIME_CODEC,
      maxBufferSeconds: MAX_BUFFER_SECONDS,
      onError: setStreamError,
    });

    return () => stream.close();
  }, [selectedCamera, videoEl]);

  if (!id) return null;

  const handleDelete = () => {
    const cameraId = selectedCamera?.cctv_public_id;
    const isDevice = pathname === `/${params.slugs}/device`;
    router.push(
      isDevice
        ? `?confirmation=delete&id=${cameraId}&page=${page}`
        : `?confirmation=delete&id=${cameraId}`
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl transition-colors dark:border-slate-800 dark:bg-slate-900"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
                <Video className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  {selectedCamera?.camera_name || "Detail CCTV"}
                </h2>
                <span className="text-[10px] font-mono text-slate-400">
                  ID: {selectedCamera?.cctv_public_id || "N/A"}
                </span>
              </div>
            </div>

            <button
              onClick={closeDialog}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Video Stream Container */}
          <div className="my-4 space-y-3">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black border border-slate-800 shadow-inner flex items-center justify-center">
              {id && selectedCamera ? (
                <video
                  ref={setVideoEl}
                  className="h-full w-full object-cover"
                  controls={false}
                  playsInline
                  autoPlay
                  muted
                />
              ) : (
                <div className="h-full w-full bg-slate-950" />
              )}

              {streamError && (
                <div className="absolute rounded-xl bg-slate-900/90 px-3 py-1.5 text-xs text-rose-400 backdrop-blur-md border border-rose-500/30">
                  {streamError}
                </div>
              )}
            </div>

            <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <MapPin className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
              <p>{selectedCamera?.location_description || "Tidak ada deskripsi lokasi."}</p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={closeDialog}
              className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              Tutup
            </button>

            <button
              onClick={handleDelete}
              disabled={!user || user.role === "VISITOR"}
              className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-rose-600/20 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              <span>Hapus Kamera</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}