"use client";

import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import { useMapProvider } from "@/context/map.context";
import { Cctv, Search, Navigation, Filter, Video, Plus, Minus, Layers, Map as MapIcon } from "lucide-react";
import { renderToString } from "react-dom/server";
import { CameraSchema } from "@/@types/camera.type";
import { useRouter, useSearchParams } from "next/navigation";

export default function MapsView({ data }: { data: CameraSchema[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  
  const { selectedCoordinat, setSelectedCoordinat, setIsOpen } = useMapProvider();
  const router = useRouter();
  const searchParams = useSearchParams();

  // State untuk Mode Peta: "street" (Tampilan Jalan/Rute) vs "satellite" (Satelit)
  const [mapType, setMapType] = useState<"street" | "satellite">("street");

  // State pencarian & filter
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"ALL" | "PUBLIC" | "PRIVATE">("ALL");

  // URLs Provider Peta
  const tileSources = {
    street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  };

  // Filter data kamera
  const filteredData = (data || []).filter((cam) => {
    const cameraName = cam.camera_name || "";
    const locationDesc = cam.location_description || "";
    const matchName = cameraName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      locationDesc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === "ALL" || cam.category === categoryFilter;
    return matchName && matchCategory;
  });

  // Watch posisi geolocation user
  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        if (!selectedCoordinat) {
          setSelectedCoordinat({ lat, lng });
        }
      },
      (err) => console.error("Geolocation error:", err.message),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Inisialisasi Peta Leaflet
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const defaultCenter: [number, number] = selectedCoordinat 
      ? [selectedCoordinat.lat, selectedCoordinat.lng] 
      : [-6.2383, 106.9756];

    const indonesiaBounds = L.latLngBounds(
      L.latLng(-11.5, 94.5),
      L.latLng(6.5, 141.5)
    );

    const map = L.map(mapRef.current, {
      center: defaultCenter,
      zoom: 15,
      maxBounds: indonesiaBounds,
      minZoom: 5,
      maxZoom: 19,
      doubleClickZoom: false,
      zoomControl: false, // Hilangkan tombol zoom bawaan Leaflet
      attributionControl: false, // Hilangkan teks "Leaflet | Tiles..." di kanan bawah
    });

    const tileLayer = L.tileLayer(tileSources[mapType], {
      maxZoom: 19,
      maxNativeZoom: 18, // Mencegah gambar hilang saat zoom mendalam
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    map.on("dblclick", (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      setSelectedCoordinat({ lat, lng });
      setIsOpen(true);
    });

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
  }, []);

  // Ganti Provider Tile ketika Mode Peta diubah (Street vs Satelit)
  useEffect(() => {
    if (!tileLayerRef.current) return;
    tileLayerRef.current.setUrl(tileSources[mapType]);
  }, [mapType]);

  // FlyTo jika ada parameter lat & lng di URL
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    if (lat && lng) {
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);

      if (!isNaN(latNum) && !isNaN(lngNum)) {
        map.flyTo([latNum, lngNum], 18, {
          animate: true,
          duration: 1.5,
        });
      }
    }
  }, [searchParams]);

  // Render CCTV Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    const cctvSvgString = renderToString(
      <Cctv size={18} className="text-white" />
    );

    const getCctvIcon = (category: string) => {
      const isPublic = category === "PUBLIC";
      const bgClass = isPublic ? "bg-emerald-500 shadow-emerald-500/30" : "bg-amber-500 shadow-amber-500/30";

      return L.divIcon({
        html: `
          <div class="relative flex items-center justify-center">
            <span class="absolute inline-flex h-10 w-10 animate-ping rounded-full ${isPublic ? 'bg-emerald-400' : 'bg-amber-400'} opacity-30"></span>
            <div class="relative flex h-9 w-9 items-center justify-center rounded-full ${bgClass} border-2 border-white shadow-lg transition-transform hover:scale-110">
              ${cctvSvgString}
            </div>
          </div>
        `,
        className: "custom-cctv-marker",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });
    };

    filteredData.forEach((cam: CameraSchema) => {
      if (cam.latitude && cam.longitude) {
        const publicId = cam.cctv_public_id || "";
        const shortId = publicId ? publicId.slice(0, 8) : "N/A";
        const isPublic = cam.category === "PUBLIC";
        const badgeColor = isPublic ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";

        const popupWrapper = document.createElement("div");
        popupWrapper.className = "p-1 font-sans";

        popupWrapper.innerHTML = `
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between gap-2 mb-1">
              <span class="inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold ${badgeColor}">
                ${cam.category || "PUBLIC"}
              </span>
              <span class="text-[10px] text-slate-400 font-mono">ID: ${shortId}</span>
            </div>
            <h3 class="font-bold text-sm text-slate-900 dark:text-slate-100 leading-tight">
              ${cam.camera_name || "CCTV Kamera"}
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
              ${cam.location_description || "Tidak ada deskripsi lokasi."}
            </p>
            <button id="btn-cctv-${publicId}" class="mt-3 w-full flex items-center justify-center gap-1.5 rounded-lg ${isPublic ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-amber-600 hover:bg-amber-500'} px-3 py-2 text-xs font-bold text-white shadow-md transition-colors cursor-pointer">
              <span>Streaming CCTV</span>
            </button>
          </div>
        `;

        const marker = L.marker([cam.latitude, cam.longitude], {
          icon: getCctvIcon(cam.category || "PUBLIC"),
        }).addTo(map);

        marker.bindPopup(popupWrapper, {
          maxWidth: 280,
          className: "custom-leaflet-popup",
        });

        marker.on("popupopen", () => {
          if (publicId) {
            const btn = document.getElementById(`btn-cctv-${publicId}`);
            if (btn) {
              btn.onclick = () => router.push(`?id=${publicId}`);
            }
          }
        });
      }
    });
  }, [filteredData, mapType]);

  // Fungsi Zoom Control Kustom
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  // Re-center Posisi User
  const handleRecenter = () => {
    if (!selectedCoordinat || !mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([selectedCoordinat.lat, selectedCoordinat.lng], 18, {
      animate: true,
      duration: 1.2,
    });
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full">
      {/* CONTAINER PETA LEAFLET */}
      <div ref={mapRef} className="h-full w-full z-0" />

      {/* FLOATING ZOOM CONTROLS (KIRI ATAS) */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 rounded-2xl border border-slate-200/80 bg-white/90 p-1 shadow-xl backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/90">
        <button
          onClick={handleZoomIn}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
          title="Zoom In"
        >
          <Plus className="h-4 w-4" />
        </button>
        <span className="mx-2 h-[1px] bg-slate-200 dark:bg-slate-800" />
        <button
          onClick={handleZoomOut}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>

      {/* FLOATING SEARCH & FILTER PANEL (TENGAH ATAS) */}
      <div className="absolute top-4 left-20 right-4 z-10 mx-auto max-w-xl">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/80 p-2 shadow-lg backdrop-blur-xl transition-colors dark:border-slate-800/80 dark:bg-slate-900/80">
          {/* Box Pencarian */}
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-slate-100/80 px-3 py-2 dark:bg-slate-800/80">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari CCTV atau nama jalan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs font-medium text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100"
            />
          </div>

          {/* Filter Kategori */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 text-xs dark:border-slate-700 dark:bg-slate-800">
            <Filter className="ml-1.5 h-3.5 w-3.5 text-emerald-500" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="bg-transparent py-1 font-semibold text-slate-700 outline-none dark:text-slate-200 cursor-pointer text-xs"
            >
              <option value="ALL" className="dark:bg-slate-900">Semua</option>
              <option value="PUBLIC" className="dark:bg-slate-900">Public</option>
              <option value="PRIVATE" className="dark:bg-slate-900">Private</option>
            </select>
          </div>
        </div>
      </div>

      {/* FLOATING MAP TYPE SWITCHER & RE-CENTER (KANAN BAWAH) */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
        {/* Tombol Switch Tampilan Satelit / Rute */}
        <button
          onClick={() => setMapType(mapType === "street" ? "satellite" : "street")}
          className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/90 px-3.5 text-xs font-bold text-slate-700 shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 dark:border-slate-800/80 dark:bg-slate-900/90 dark:text-slate-200 cursor-pointer"
          title="Ganti Mode Peta"
        >
          {mapType === "street" ? (
            <>
              <Layers className="h-4 w-4 text-emerald-500" />
              <span>Satelit</span>
            </>
          ) : (
            <>
              <MapIcon className="h-4 w-4 text-emerald-500" />
              <span>Rute</span>
            </>
          )}
        </button>

        {/* Tombol Re-center ke Lokasi User */}
        <button
          onClick={handleRecenter}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/90 text-slate-700 shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 dark:border-slate-800/80 dark:bg-slate-900/90 dark:text-slate-200 cursor-pointer ml-auto"
          title="Ke Lokasi Saya"
        >
          <Navigation className="h-5 w-5 text-emerald-500" />
        </button>
      </div>

      {/* BADGE STATISTIK KAMERA (KIRI BAWAH) */}
      <div className="absolute bottom-6 left-6 z-10 hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-2.5 shadow-xl backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
          <Video className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Kamera Terdeteksi
          </p>
          <p className="text-sm font-black text-slate-900 dark:text-white">
            {filteredData.length} <span className="text-xs font-normal text-slate-500">CCTV</span>
          </p>
        </div>
      </div>
    </div>
  );
}