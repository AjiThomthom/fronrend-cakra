"use client";

import { selectCameraCategory, updateCameraCategory } from "@/services/maps.service";
import { Eye, ChevronLeft, ChevronRight, VideoOff } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCameraContext } from "../d.hooks/device.hooks";
import { useTokenJWT } from "@/context/user.context";

export default function DeviceTable() {
  const { camera, setCameras, setCount, selected, count } = useCameraContext();
  const router = useRouter();
  const page = useSearchParams().get("page") || "1";
  const user = useTokenJWT();
  const params = useParams();

  const getAllCamerasData = async () => {
    if (!useSearchParams().get("page")) {
      router.push("?page=1");
      return;
    }

    const response: any = await selectCameraCategory(
      selected,
      page as string,
      params.slugs as string
    );
    if (!response) return;

    setCount({
      private: response.meta.private,
      public: response.meta.public,
      total_page: response.meta.total_page,
    });
    setCameras(response.data);
  };

  const updateCategory = async (body: string, id: string) => {
    setCameras((prev) =>
      prev.map((item) =>
        item.cctv_public_id === id ? { ...item, category: body } : item
      )
    );
    const payload = { category: body };
    await updateCameraCategory(payload, id, params.slugs as string);
  };

  useEffect(() => {
    getAllCamerasData();
  }, [selected, page]);

  const totalPages = count.total_page || 1;
  const currentPage = Number(page);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          {/* HEADER TABLE */}
          <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3.5">No</th>
              <th className="px-4 py-3.5">Nama CCTV</th>
              <th className="hidden px-4 py-3.5 sm:table-cell">Latitude</th>
              <th className="hidden px-4 py-3.5 sm:table-cell">Longitude</th>
              <th className="hidden px-4 py-3.5 md:table-cell">Kategori</th>
              <th className="px-4 py-3.5 text-center">Aksi</th>
            </tr>
          </thead>

          {/* BODY TABLE */}
          <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
            {camera && camera.length > 0 ? (
              camera.map((item, index) => (
                <tr
                  key={item.cctv_public_id ?? index}
                  onClick={() =>
                    router.push(
                      `/${params.slugs}/map?lat=${item.latitude}&lng=${item.longitude}`
                    )
                  }
                  className="group cursor-pointer transition-colors hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                >
                  <td className="px-4 py-3.5 font-mono font-medium text-slate-500 dark:text-slate-400">
                    {(currentPage - 1) * 20 + index + 1}
                  </td>
                  <td className="max-w-[140px] truncate px-4 py-3.5 font-bold text-slate-900 sm:max-w-none dark:text-white">
                    {item.camera_name}
                  </td>
                  <td className="hidden px-4 py-3.5 font-mono text-slate-600 sm:table-cell dark:text-slate-300">
                    {item.latitude}
                  </td>
                  <td className="hidden px-4 py-3.5 font-mono text-slate-600 sm:table-cell dark:text-slate-300">
                    {item.longitude}
                  </td>

                  {/* UPDATE KATEGORI SELECT */}
                  <td className="hidden px-4 py-3.5 md:table-cell">
                    {user?.role === "OWNER" || user?.role === "STAFF" ? (
                      <select
                        value={item.category}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateCategory(
                            e.target.value,
                            item.cctv_public_id as string
                          );
                        }}
                        className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold outline-none cursor-pointer ${
                          item.category === "PUBLIC"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        <option value="PUBLIC" className="dark:bg-slate-900">Public</option>
                        <option value="PRIVATE" className="dark:bg-slate-900">Private</option>
                      </select>
                    ) : (
                      <span
                        className={`inline-block rounded-lg border px-2.5 py-1 text-[11px] font-bold ${
                          item.category === "PUBLIC"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {item.category === "PUBLIC" ? "Public" : "Private"}
                      </span>
                    )}
                  </td>

                  {/* ACTION STREAM BUTTON */}
                  <td className="px-4 py-3.5 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`?page=${page}&id=${item.cctv_public_id}`);
                      }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600 transition-colors hover:bg-emerald-500 hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-emerald-500 dark:hover:text-slate-950 cursor-pointer"
                      title="Lihat Stream CCTV"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                    <VideoOff className="h-8 w-8 text-slate-400" />
                    <p className="text-xs font-semibold">Belum ada kamera ditambahkan!</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION FOOTER */}
      <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-slate-800">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Halaman <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> dari{" "}
          <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage <= 1}
            onClick={() => router.push(`?page=${currentPage - 1}`)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => router.push(`?page=${currentPage + 1}`)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}