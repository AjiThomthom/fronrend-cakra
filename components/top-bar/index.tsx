"use client";

import Image from "next/image";
import ThemeToggle from "./theme-toggle"; // Import tombol dari folder yang sama

export default function TopBarNav() {
  return (
    <header className="top-0 fixed flex justify-between items-center h-16 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md w-full shadow-sm border-b border-slate-200 dark:border-slate-800 px-6 transition-colors duration-300">
      {/* Brand / Logo */}
      <div
        className="flex gap-x-3 items-center cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => (window.location.href = "/")}
      >
        <Image src={"/CAKRA.png"} alt="cakra.png" width={36} height={36} priority />
        <span className="font-bold text-lg tracking-wider text-slate-800 dark:text-slate-100">
          CAKRA
        </span>
      </div>

      {/* Area Kanan: Tombol Switch Theme */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
}