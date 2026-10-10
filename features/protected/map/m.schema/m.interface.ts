import z from "zod";

const ipv4Regex =
  /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const MapsAddCameraSchema = z.object({
  camera_name: z.string().min(1, "Nama camera wajib di isi!"),
  source_url: z.string().min(1, "URL stream wajib di isi!"),
  latitude: z.float64(),
  longitude: z.float64(),
  location_description: z.string().min(1, "Nama camera wajib di isi!"),
});

export type MapsAddCameraSchema = z.infer<typeof MapsAddCameraSchema>;
