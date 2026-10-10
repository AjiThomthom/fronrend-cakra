"use client";
import dynamic from "next/dynamic";
import { useTokenJWT } from "@/context/user.context";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ArrowRight, Camera, Globe, Info, Lock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import HomeHeaders from "./h.headers";
import HomeMaps from "./h.maps";
import HomeTables from "./h.table";
import { getSummaryData } from "@/services/home.service";
import { useEffect, useState } from "react";
import { SummaryType } from "@/@types/home.type";
import { capitalizeText, formatAgencyName } from "@/lib/common";
import Link from "next/link";
import HomeDeviceTable from "./h.device";
import { FooterSection } from "@/features/public/p.welcome/pw.footer";
import HomeEmployeeTable from "./h.employee";

export default function HomeFeature() {
  const [count, setCount] = useState<SummaryType>();
  const params = useParams();
  const getSummary = async () => {
    const data = await getSummaryData(params.slugs as string);
    setCount(data);
  };
  const user = useTokenJWT();
  useEffect(() => {
    getSummary();
  }, []);

  if (!count || !user) return null;
  return (
    <Container maxWidth="lg" className="py-15 ">
      <div>
        <h1 className="font-semibold text-[18px] md:text-xl">
          Selamat datang kembali, {user.username}
        </h1>
        <p className="text-gray-500 text-[15px] md:text-sm">
          Ringkasan wilayah pengawasan kamu hari ini di{" "}
          {formatAgencyName(params.slugs as string)}.
        </p>
      </div>
      <div className="flex gap-x-4 w-full md:flex-row flex-col">
        <Box>
          <HomeHeaders data={count} />
        </Box>
        <div className="w-full">
          <HomeMaps data={count} />
          <HomeTables data={count} />
        </div>
      </div>

      <HomeDeviceTable params={params} data={count} />
      <HomeEmployeeTable data={count} params={params} />
    </Container>
  );
}
