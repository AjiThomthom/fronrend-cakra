"use client";
import { CameraSchema } from "@/@types/camera.type";
import { MapProvider } from "@/context/map.context";
import MapsDialogsShow from "@/features/protected/map/m.dialogs/m.show";
import { getAllPublicMapCamera } from "@/services/maps.service";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MapsView = dynamic(() => import("../../../components/maps-view"), {
  ssr: false,
});

export default function PublicMapsFeature() {
  const [camera, setCamera] = useState<CameraSchema[]>([]);

  const getPublicCamera = async () => {
    const response = await getAllPublicMapCamera();
    setCamera(response);
  };

  useEffect(() => {
    getPublicCamera();
  }, []);

  return (
    <MapProvider>
      <MapsView data={camera} />
      <MapsDialogsShow />
    </MapProvider>
  );
}
