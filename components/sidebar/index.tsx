"use client";

import {
  BuildingIcon,
  Car,
  Cctv,
  ChevronDown,
  ChevronUp,
  History,
  Home,
  LogOut,
  Map,
  Plus,
  Settings,
  SquareArrowOutDownLeft,
  SquareArrowOutUpRight,
  User,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { agencyConnect } from "@/services/accounts.service";
import { useTokenJWT } from "@/context/user.context";
import { formatAgencyName } from "@/lib/common";
import { AnimatePresence, motion } from "framer-motion";
import { AccountAgency } from "@/@types/agency.type";
import { BASE_URL } from "@/services/maps.service";
import TokenDialogs from "../token-dialogs";
import axios from "axios";

const navigation = [
  {
    icon: <Home />,
    name: "Beranda",
    href: "/home",
  },
  {

    icon: <Map />,
    name: "Peta",
    href: "/map",
  },
  {
    icon: <User />,
    name: "Pengguna",
    href: "/employee",
  },
  {
    icon: <History />,
    name: "Riwayat Deteksi",
    href: "/history",
  },
  {
    icon: <Cctv />,
    name: "Perangkat",
    href: "/device",
  },
];

export default function Sidebar({
  children,
}: {
  children: ReactNode;
  content?: ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setDropdownOpen] = useState(false);
  const [agency, setAgency] = useState([]);
  const page = useSearchParams().get("page");
  const settings = useSearchParams().get("set");
  const pathname = usePathname();
  const params = useParams();
  const route = "/" + pathname.split("/").slice(2).join();

  const agencyList = async () => {
    if (pathname === "/onboarding") {
      return null;
    }
    try {
      const response = await agencyConnect(params.slugs as string);
      setAgency(response.agency || []);
    } catch (error) {
      console.error("Error fetching agency list:", error);
    }
  };

  useEffect(() => {
    agencyList();
  }, [params]);

  const closeSlide = () => {
    setDropdownOpen(false);
    setIsOpen(!isOpen);
    if (page) {
      router.replace(`${pathname}?page=${page}`);
      return;
    }

    if (settings) {
      router.replace(`${pathname}?set=${settings}`);
      return;
    }

    router.replace(pathname);
  };

  const user = useTokenJWT();
  if (!user) return null;
  const profileLink = `${BASE_URL}/uploads/${user.image}`;

  return (
    <>
      {/* Backdrop Gelap Overlay */}
      <div
        onClick={closeSlide}
        className={`fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Konten Utama Aplikasi */}
      {children}

      {/* FLOATING ACTION BUTTON (DI KANAN BAWAH) */}
      {pathname !== "/onboarding" && (
        <button
          onClick={closeSlide}
          className="fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-2xl transition-all hover:bg-emerald-500 hover:scale-105 active:scale-95 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 cursor-pointer"
          title={isOpen ? "Tutup Menu" : "Buka Menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      )}

      {/* DRAWER SIDEBAR (Slide-over dari KANAN) */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-80 md:w-96 border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto p-4 pt-20">
          {/* USER & AGENCY SWITCHER */}
          <div className="relative mb-4">
            <div
              onClick={() => setDropdownOpen(!openDropdown)}
              className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3 transition-colors ${
                openDropdown
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                  : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-300 bg-slate-200 dark:border-slate-700 dark:bg-slate-700">
                  {user.image ? (
                    <img
                      src={profileLink}
                      alt={user.username}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <User className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                  )}
                </div>
                <div className="truncate text-left">
                  <h1 className="text-sm font-bold truncate">{user.username}</h1>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
                    {pathname !== "/onboarding" &&
                      formatAgencyName(params.slugs as string)}
                  </p>
                </div>
              </div>
              {openDropdown ? (
                <ChevronUp className="h-4 w-4 shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0" />
              )}
            </div>

            {/* DROPDOWN SWITCH INSTANSI */}
            <AnimatePresence>
              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <DropdownAgency data={agency} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MENU SEPARATOR */}
          <div className="relative flex items-center my-3">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
            <span className="shrink mx-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Menu Utama
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="space-y-1">
            {navigation.map((item, index) => {
              const isActive = route === item.href;
              return (
                <Link
                  key={index}
                  onClick={() => {
                    setDropdownOpen(false);
                    closeSlide();
                  }}
                  href={`/${params.slugs}${item.href}`}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/20"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* OPTIONS SEPARATOR */}
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
            <span className="shrink mx-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Opsi Tambahan
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
          </div>

          {/* ADDITIONAL OPTIONS */}
          <div className="space-y-1">
            <button
              onClick={() => {
                closeSlide();
                router.push("?dialog=token");
              }}
              className="flex w-full items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 px-3.5 py-2.5 text-xs font-bold text-blue-600 hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 cursor-pointer transition-all"
            >
              <FaTelegram className="h-4 w-4 text-blue-500" />
              <span>Hubungkan ke Telegram</span>
            </button>

            <Link
              href={`/${params.slugs}/settings`}
              onClick={closeSlide}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                pathname === `/${params.slugs}/settings`
                  ? "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/20"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Pengaturan</span>
            </Link>

            <button
              onClick={() => {
                closeSlide();
                if (page) {
                  router.push(`?page=${page}&action=logout`);
                  return;
                }
                router.push("?action=logout");
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-500/10 dark:text-rose-400 cursor-pointer transition-all"
            >
              <LogOut className="h-4 w-4" />
              <span>Keluar (Logout)</span>
            </button>
          </div>
        </div>
      </div>

      <SignOutDialog />
      <TokenDialogs />
    </>
  );
}

{/* DIALOG KONFIRMASI LOGOUT */}
export const SignOutDialog = () => {
  const action = useSearchParams().get("action");
  const router = useRouter();

  if (!action) return null;

  const signOutService = async () => {
    try {
      const response = await axios.delete("/api", { withCredentials: true });
      if (!response) return null;
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-sm rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xl transition-colors dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-lg border-b border-slate-200 dark:border-slate-800 pb-3">
            <ShieldCheck className="h-5 w-5" />
            <span>Konfirmasi Keluar</span>
          </div>

          <p className="mt-3 text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
            Apakah Anda yakin ingin keluar dari sesi ini? Anda perlu masuk kembali untuk mengakses dasbor CAKRA.
          </p>

          <div className="flex items-center justify-end gap-2 pt-5">
            <button
              onClick={() => router.back()}
              className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={signOutService}
              className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-rose-600/20 hover:bg-rose-500 cursor-pointer"
            >
              Ya, Keluar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

{/* DROPDOWN DAFTAR INSTANSI */}
export const DropdownAgency = ({ data }: { data: any }) => {
  const router = useRouter();
  const params = useParams();

  if (!data) return null;

  return (
    <div className="max-h-56 overflow-y-auto space-y-1 p-1">
      <button
        onClick={() => (window.location.href = "/onboarding")}
        className="flex w-full items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-xs font-bold text-emerald-600 hover:bg-emerald-500 hover:text-white dark:bg-emerald-500/20 dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-slate-950 cursor-pointer transition-all"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500 text-white">
          <Plus className="h-4 w-4" />
        </div>
        <span>Buat Instansi/Lembaga Baru</span>
      </button>

      <div className="my-1.5 border-t border-slate-200 dark:border-slate-800" />

      {data.map((item: AccountAgency, index: number) => {
        const isSelected = params.slugs === item.agency.slug_agency;
        return (
          <div
            key={index}
            onClick={() => {
              router.replace(`/${item.agency.slug_agency}/home`);
            }}
            className={`flex cursor-pointer items-center gap-2.5 rounded-xl p-2.5 text-xs font-semibold transition-all ${
              isSelected
                ? "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/30"
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/80"
            }`}
          >
            <BuildingIcon className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="truncate">{item.agency.agency_name}</span>
          </div>
        );
      })}
    </div>
  );
};