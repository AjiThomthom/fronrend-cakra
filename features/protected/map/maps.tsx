"use client";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import MapsDialogsAdd from "./m.dialogs/m.add";
import MapsDialogsShow from "./m.dialogs/m.show";
import MapsDialogDelete from "./m.dialogs/m.delete";
import { getAllCamera } from "@/services/maps.service";
import { useEffect, useState } from "react";
import { CameraSchema } from "@/@types/camera.type";
import { useTokenJWT } from "@/context/user.context";
import { useParams } from "next/navigation";

const Maps = dynamic(() => import("../../../components/maps"), {
  ssr: false,
});
export default function MapsFeatures() {
  const [camera, setCamera] = useState<CameraSchema[]>([]);
  const params = useParams();

  const getMarkCamera = async () => {
    try {
      const response = await getAllCamera(params.slugs as string);
      setCamera(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMarkCamera();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-screen flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
        <Maps data={camera} />
        <MapsDialogsAdd />
        <MapsDialogsShow />
        <MapsDialogDelete />
      </main>
    </div>
  );
}
