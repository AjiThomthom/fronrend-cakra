"use client";

import { useTokenJWT } from "@/context/user.context";
import { useParams } from "next/navigation";
import HomeHeaders from "./h.headers";
import HomeMaps from "./h.maps";
import HomeTables from "./h.table";
import { getSummaryData } from "@/services/home.service";
import { useEffect, useState } from "react";
import { SummaryType } from "@/@types/home.type";
import { formatAgencyName } from "@/lib/common";
import HomeDeviceTable from "./h.device";
import HomeEmployeeTable from "./h.employee";
import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";

export default function HomeFeature() {
  const [count, setCount] = useState<SummaryType>();
  const params = useParams();
  const user = useTokenJWT();

  const getSummary = async () => {
    if (!params?.slugs) return;
    const data = await getSummaryData(params.slugs as string);
    setCount(data);
  };

  useEffect(() => {
    getSummary();
  }, [params?.slugs]);

  if (!count || !user) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-slate-50 px-4 py-8 transition-colors duration-300 md:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* WELCOME HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>Dasbor Operasional</span>
            </div>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 md:text-3xl dark:text-white">
              Selamat datang kembali, {user.username} 👋
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-500 md:text-sm dark:text-slate-400">
              Ringkasan wilayah pengawasan kamu hari ini di{" "}
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {formatAgencyName(params.slugs as string)}
              </span>
              .
            </p>
          </div>
        </motion.div>

        {/* SECTION 1: HEADER METRICS + MAP + RECENT INCIDENTS */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* STATS HEADERS (LEFT) */}
          <div className="lg:col-span-4 xl:col-span-3">
            <HomeHeaders data={count} />
          </div>

          {/* MAP & INCIDENT TABLE (RIGHT) */}
          <div className="space-y-6 lg:col-span-8 xl:col-span-9">
            <HomeMaps data={count} />
            <HomeTables data={count} />
          </div>
        </div>

        {/* SECTION 2: DEVICE & EMPLOYEE TABLES */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <HomeDeviceTable params={params} data={count} />
          <HomeEmployeeTable data={count} params={params} />
        </div>
      </div>
    </div>
  );
}