"use client";
import { SummaryType } from "@/@types/home.type";
import { useTokenJWT } from "@/context/user.context";
import { formatAgencyName } from "@/lib/common";
import { Paper } from "@mui/material";
import { Camera, Globe, Info, Lock } from "lucide-react";
import { useParams } from "next/navigation";

export default function HomeHeaders({ data }: { data: SummaryType }) {
  if (!data) return null;
  const user = useTokenJWT();
  const params = useParams();

  if (!user) return null;
  return (
    <>
      <div className="flex gap-y-2 md:gap-x-8 flex-col">
        <Paper className="w-80 md:w-52  px-3 my-2 md:my-5 py-1">
          <div className="bg-green-500/10 p-3 py-2 w-12 rounded-md text-green-500">
            <Camera />
          </div>
          <h1 className="mt-3 font-bold text-xl">{data.count.total}</h1>
          <p className="font-semibold text-sm">Total CCTV</p>
          <p className="text-gray-400 text-[12px]">Titik terpasang</p>
        </Paper>

        <Paper className="w-80 md:w-52 w-52 px-3 md:my-5 py-3">
          <div className="bg-gray-500/10 p-3 py-2 w-12 rounded-md text-gray-500">
            <Globe />
          </div>
          <h1 className="mt-3 font-bold text-xl">{data.count.public}</h1>
          <p className="font-semibold text-sm">Publik</p>
          <p className="text-gray-400 text-[12px]">Kamera Publik</p>
        </Paper>

        <Paper className="w-80 md:w-52 px-3 my-3 md:my-5 py-3">
          <div className="bg-orange-500/10 p-3 py-2 w-12 rounded-md text-orange-500">
            <Lock />
          </div>
          <h1 className="mt-3 font-bold text-xl">{data.count.private}</h1>
          <p className="font-semibold text-sm">Private</p>
          <p className="text-gray-400 text-[12px]">Kamera Private</p>
        </Paper>

        <Paper className="w-80 md:w-52 px-3 my-3 md:my-5 py-3">
          <div className="bg-lime-500/10 p-3 py-2 w-12 rounded-md text-lime-500">
            <Info />
          </div>
          <h1 className="mt-3 font-bold text-xl">{data.count.pending}</h1>
          <p className="font-semibold text-sm">Belum Ditinjau</p>
          <p className="text-gray-400 text-[12px]">Kejadian</p>
        </Paper>
      </div>
    </>
  );
}
