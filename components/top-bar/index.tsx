"use client";

import Image from "next/image";
import ThemeToggle from "./theme-toggle";
import { Sparkles, HelpCircle, UserPlus, Compass } from "lucide-react";
import { usePathname } from "next/navigation";

export default function TopBarNav() {
  const pathname = usePathname();
  // Sembunyikan tag navigasi pada halaman selain landing page
  const isPublicWelcome = pathname === "/";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navTags = [
    { label: "Fitur", targetId: "whatson-section", icon: Sparkles },
    { label: "FAQ", targetId: "faq-section", icon: HelpCircle },
    { label: "Bergabung", targetId: "register-section", icon: UserPlus },
    { label: "Peta", action: () => (window.location.href = "/maps"), icon: Compass },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-xl transition-colors duration-300 md:px-8 dark:border-slate-800/80 dark:bg-slate-950/80">
      {/* Kiri: Logo Brand */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className="flex cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-90"
          onClick={() => (window.location.href = "/")}
        >
          <Image src="/CAKRA.png" alt="CAKRA Logo" width={34} height={34} priority />
          <span className="text-lg font-black tracking-wider text-slate-900 dark:text-white">
            CAKRA
          </span>
        </div>

        {/* Hanya tampilkan tag navigasi di halaman landing page utama */}
        {isPublicWelcome && (
          <>
            <span className="hidden h-5 w-[1px] bg-slate-300 sm:inline-block dark:bg-slate-800" />
            <nav className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-slate-100/70 p-1 backdrop-blur-md sm:flex dark:border-slate-800/80 dark:bg-slate-900/70">
              {navTags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (tag.action) {
                      tag.action();
                    } else if (tag.targetId) {
                      scrollToSection(tag.targetId);
                    }
                  }}
                  className="flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-slate-600 transition-all hover:bg-white hover:text-emerald-600 hover:shadow-xs dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
                >
                  <tag.icon className="h-3.5 w-3.5 text-emerald-500" />
                  <span>{tag.label}</span>
                </button>
              ))}
            </nav>
          </>
        )}
      </div>

      {/* Kanan: Theme Switcher */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
}