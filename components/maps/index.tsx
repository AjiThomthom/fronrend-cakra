"use client";
import L, { popup } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { useMapProvider } from "@/context/map.context";
import { Cctv } from "lucide-react";
import { renderToString } from "react-dom/server";
import { CameraSchema } from "@/@types/camera.type";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@mui/material";

export default function Maps({ data }: { data: CameraSchema[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [locationError, setLocationError] = useState<string | null>("");
  const { setSelectedCoordinat, setIsOpen, selectedCoordinat } =
    useMapProvider();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Peta buat ambil koordinat user terdekat
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Browser tidak mengizinkan geolocation");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setSelectedCoordinat({ lat, lng });
        setLocationError(null);
      },
      (err) => {
        console.error("Geolocation error", err.message);
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Peta buat render map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    if (!selectedCoordinat) return;

    const map = L.map(mapRef.current, {
      center: [selectedCoordinat.lat, selectedCoordinat.lng],
      zoom: 18,
      minZoom: 5,
      maxZoom: 19,
      doubleClickZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    map.on("dblclick", (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      setSelectedCoordinat({ lat, lng });
      setIsOpen(true);
    });
    mapInstanceRef.current = map;
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [Boolean(selectedCoordinat)]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    if (lat && lng) {
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);

      if (!isNaN(latNum) && !isNaN(lngNum)) {
        map.invalidateSize();
        map.flyTo([latNum, lngNum], 18, {
          animate: true,
          duration: 1.5,
        });
      }
    }
  }, [searchParams]);

  // Peta buat merender marker cctv
  useEffect(() => {
    const map = mapInstanceRef.current;

    if (!map) {
      console.log(`Peta Belum siap, skip render marker`);
      return;
    }

    const cctvSvgString = renderToString(
      <Cctv size={18} className="text-white" />,
    );

    const cctvIcon = (category: "PUBLIC" | "PRIVATE" | string) => {
      const bg = category === "PUBLIC" ? "bg-green-600" : "bg-orange-500";

      return L.divIcon({
        html: `
      <div class="flex items-center justify-center w-8 h-8 ${bg}
        rounded-full border-2 shadow-lg border-white">
        ${cctvSvgString}
      </div>
    `,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
    };
    data.forEach((cam: CameraSchema) => {
      if (cam.latitude && cam.longitude) {
        const popupContent = document.createElement("div");
        popupContent.className =
          "p-2 text-gray-800 w-[260px] flex flex-col gap-y-2";

        const textContainer = document.createElement("div");
        textContainer.className = "flex flex-col gap-y-0.5 text-left px-0.5";

        const title = document.createElement("h3");
        title.innerText = cam.camera_name;
        title.className =
          "font-bold text-sm text-gray-950 leading-tight truncate";
        textContainer.appendChild(title);

        const description = document.createElement("p");
        description.innerText =
          cam.location_description || "Tidak ada deskripsi lokasi.";
        description.className =
          "text-xs text-gray-500 line-clamp-2 leading-relaxed mt-0.5";
        textContainer.appendChild(description);

        const divider = document.createElement("hr");
        divider.className = "border-gray-100 my-1";
        textContainer.appendChild(divider);

        const button = document.createElement("button");
        button.innerText = "Lihat Detail";
        button.className =
          cam.category == "PUBLIC"
            ? "bg-green-600 px-2 py-1 font-bold text-white rounded-md cursor-pointer"
            : "bg-orange-600 px-2 py-1 font-bold text-white rounded-md cursor-pointer";

        button.addEventListener("click", () => {
          router.push(`?id=${cam.cctv_public_id}`);
        });
        textContainer.appendChild(button);
        popupContent.appendChild(textContainer);
        L.marker([cam.latitude, cam.longitude], {
          icon: cctvIcon(cam.category as string),
        })
          .addTo(map)
          .bindPopup(popupContent);
      }
    });
  }, [data, selectedCoordinat]);

  return data ? (
    <div ref={mapRef} className="w-full h-screen mt-4 z-48" />
  ) : (
    <Container>
      <h1>Kamu belum mendaftarkan CCTV sama sekali!</h1>
    </Container>
  );
}
