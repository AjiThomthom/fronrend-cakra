import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MapsAddCameraSchema } from "../m.schema/m.interface";

export const useCameraForms = () => {
  return useForm({
    resolver: zodResolver(MapsAddCameraSchema),
    defaultValues: {
      camera_name: "",
      latitude: 0,
      longitude: 0,
      location_description: "",
      source_url: "",
    },
  });
};
