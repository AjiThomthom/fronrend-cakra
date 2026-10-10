"use client";

import { CameraSchema } from "@/@types/camera.type";
import { MapProvider } from "@/context/map.context";
import MapsDialogsShow from "@/features/protected/map/m.dialogs/m.show";
import { getAllPublicMapCamera } from "@/services/maps.service";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Import komponen MapsView secara dinamis tanpa SSR (Leaflet butuh DOM client)
const MapsView = dynamic(() => import("@/components/maps-view"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          Memuat Peta Pemantauan CCTV...
        </p>
      </div>
    </div>
  ),
});

export default function PublicMapsFeature() {
  const [camera, setCamera] = useState<CameraSchema[]>([]);

  const getPublicCamera = async () => {
    try {
      const response = await getAllPublicMapCamera();
      setCamera(response || []);
    } catch (error) {
      console.error("Gagal mengambil data kamera public:", error);
    }
  };

  useEffect(() => {
    getPublicCamera();
  }, []);

  return (
    <MapProvider>
      <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-950">
        <MapsView data={camera} />
        <MapsDialogsShow />
      </div>
    </MapProvider>
  );
}