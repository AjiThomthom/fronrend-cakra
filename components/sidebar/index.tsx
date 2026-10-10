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
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  Paper,
} from "@mui/material";
import { agencyConnect } from "@/services/accounts.service";
import { useTokenJWT } from "@/context/user.context";
import { formatAgencyName } from "@/lib/common";
import { AnimatePresence, motion } from "framer-motion";
import { AccountAgency, AgencyType } from "@/@types/agency.type";
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
    if (pathname == "/onboarding") {
      return null;
    }
    const response = await agencyConnect(params.slugs as string);
    setAgency(response.agency);
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
      <div
        onClick={closeSlide}
        className={`fixed inset-0 z-54 bg-black/50 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {children}

      <div
        className={`fixed top-0 right-0 z-54 mt-4 h-screen w-72 md:w-96 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto px-3 my-3 bg-white shadow-xl">
          <div className="p-4 text-center font-semibold my-5">
            <div className="mb-1 w-full">
              <div
                onClick={() => setDropdownOpen(!openDropdown)}
                className={`flex gap-x-3 w-fullr cursor-pointer hover:bg-green-200/40 justify-between
                rounded-md text-green-600  px-3 py-2 ${openDropdown ? "bg-green-200/40" : "bg-white"}`}
              >
                <div className="flex items-center gap-x-3">
                  <Avatar src={profileLink ?? undefined}></Avatar>
                  <div className="text-start">
                    <h1>{user.username}</h1>
                    <p className="font-light text-gray-500">
                      {pathname != "/onboarding" &&
                        formatAgencyName(params.slugs as string)}
                    </p>
                  </div>
                </div>
                {openDropdown ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>

            <AnimatePresence>
              {openDropdown && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  className="z-58 fixed w-80  h-42 overflow-y-auto"
                >
                  <DropdownAgency data={agency} />
                </motion.div>
              )}
            </AnimatePresence>

            <Divider>
              <h1 className="text-gray-500 font-light">Menu</h1>
            </Divider>

            {navigation.map((item, index) => {
              const isActive = route == item.href;
              return (
                <Link
                  key={index}
                  onClick={() => setDropdownOpen(false)}
                  href={`/${params.slugs}/${item.href}`}
                  className={`${
                    isActive ? "bg-green-600/30 text-green-800" : ""
                  } flex items-center gap-x-2  text-gray-600 hover:bg-gray-100 px-2 py-3 my-1 rounded-md cursor-pointer`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <Divider>
              <h1 className="text-gray-500 font-light">Options</h1>
            </Divider>
            <button
              onClick={() => router.push("?dialog=token")}
              className={` ${pathname == `/${params.slug}/settings` ? "bg-green-600/30 text-green-800" : ""}
              flex items-center gap-x-2 bg-green-300/30 text-green-500 w-full text-gray-600 hover:bg-green-100/30 px-2 py-3 my-1 rounded-md cursor-pointer`}
            >
              <FaTelegram size={20} />
              Link it to Telegram
            </button>
            <Link
              href={`/${params.slugs}/settings`}
              className={` ${pathname == `/${params.slug}/settings` ? "bg-green-600/30 text-green-800" : ""}
               flex items-center gap-x-2  text-gray-600 hover:bg-gray-100 px-2 py-3 my-1 rounded-md cursor-pointer`}
            >
              <Settings />
              <span>Settings</span>
            </Link>
            <button
              onClick={() => {
                if (page) {
                  router.push(`?page=${page}&action=logout`);
                  return;
                }
                router.push("?action=logout");
              }}
              className={`flex items-center w-full gap-x-2 text-gray-600 hover:bg-gray-100 px-2 py-3 my-1 rounded-md cursor-pointer`}
            >
              <LogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      {pathname !== "/onboarding" && (
        <Fab
          color="success"
          onClick={closeSlide}
          className="!fixed bottom-10 right-4 !z-[60]"
        >
          {isOpen ? <SquareArrowOutDownLeft /> : <SquareArrowOutUpRight />}
        </Fab>
      )}

      <SignOutDialog />
      <TokenDialogs />
    </>
  );
}

export const SignOutDialog = () => {
  const action = useSearchParams().get("action");
  const router = useRouter();

  const signOutService = async () => {
    const response = await axios.delete("/api", { withCredentials: true });
    if (!response) return null;
    window.location.href = "/";
  };
  return (
    <Dialog className="px-2" open={action ? true : false}>
      <DialogTitle className="font-bold text-green-600">
        Kamu serius?
      </DialogTitle>
      <hr className="text-green-500 mx-5" />
      <DialogContent>
        Aksi ini akan membuat kamu keluar dari halaman, dan perlu login kembali
        untuk mengakses nya
      </DialogContent>
      <DialogActions>
        <Button color="success" onClick={() => router.back()}>
          Batal
        </Button>
        <Button onClick={signOutService} variant="contained" color="error">
          Ya
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const DropdownAgency = ({ data }: { data: any }) => {
  const router = useRouter();
  const params = useParams();

  if (!data) return [];
  return (
    <Paper className=" px-1 py-1 w-64 md:w-80 shadow-xs">
      <ul>
        <li>
          <div>
            <Button
              size="small"
              color="success"
              onClick={() => (window.location.href = "/onboarding")}
              className="flex gap-x-4 w-full"
            >
              <div className="bg-green-500/20 text-green-500 p-2 w-9 rounded-full">
                <Plus size={20} />
              </div>
              Buat Instansi/Lembaga Baru
            </Button>
          </div>
        </li>
        <Divider></Divider>
        {data.map((item: AccountAgency, index: number) => {
          console.log(item);
          return (
            <div
              key={index}
              className={` my-3 text-start gap-x-3 flex items-start cursor-pointer my-4 py-3 px-1 w-full  text-black
               ${params.slugs == item.agency.slug_agency ? "bg-green-500/20 rounded-md text-green-500 w-full" : ""}`}
              onClick={() => {
                router.replace(`/${item.agency.slug_agency}/home`);
              }}
            >
              <li className={`flex gap-x-1 p-1 w-full items-center`}>
                <BuildingIcon size={20} />
                {item.agency.agency_name}
              </li>
              <Divider />;
            </div>
          );
        })}
      </ul>
    </Paper>
  );
};
