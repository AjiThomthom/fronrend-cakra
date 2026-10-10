"use client";

import { CameraSchema } from "@/@types/camera.type";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Cctv } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";

export default function MapShortcut({ data }: { data: CameraSchema[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const router = useRouter();
  const params = useParams();
  const [coordinate, setCoordinate] = useState<{
    lat: number;
    long: number;
  } | null>(null);

  // Ambil lokasi pengguna untuk menentukan titik tengah peta mini
  useEffect(() => {
    if (!navigator.geolocation) {
      setCoordinate({ lat: -6.2383, long: 106.9756 }); // Default Jakarta/Bekasi
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude: lat, longitude: long } = position.coords;
        setCoordinate({ lat, long });
      },
      (err) => {
        console.error("Geolocation error", err.message);
        setCoordinate({ lat: -6.2383, long: 106.9756 });
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Inisialisasi Peta Mini Non-Interaktif
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    if (!coordinate) return;

    const map = L.map(mapRef.current, {
      center: [coordinate.lat, coordinate.long],
      zoom: 15,
      dragging: false,
      scrollWheelZoom: false,
      touchZoom: false,
      zoomControl: false,
      doubleClickZoom: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [coordinate]);

  // Render Marker CCTV
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !data) return;

    const cctvSvgString = renderToString(
      <Cctv size={16} className="text-white" />
    );

    const getCctvIcon = (category: string) => {
      const isPublic = category === "PUBLIC";
      const bgClass = isPublic ? "bg-emerald-500" : "bg-amber-500";

      return L.divIcon({
        html: `
          <div class="flex items-center justify-center w-7 h-7 ${bgClass} rounded-full border-2 border-white shadow-md">
            ${cctvSvgString}
          </div>
        `,
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
    };

    data.forEach((cam: CameraSchema) => {
      if (cam.latitude && cam.longitude) {
        L.marker([cam.latitude, cam.longitude], {
          icon: getCctvIcon(cam.category || "PUBLIC"),
        }).addTo(map);
      }
    });
  }, [data, coordinate]);

  return (
    <div
      ref={mapRef}
      onClick={() => router.push(`/${params.slugs}/map`)}
      className="relative z-0 h-full w-full cursor-pointer overflow-hidden rounded-xl"
      title="Klik untuk membuka Peta Lengkap"
    />
  );
}