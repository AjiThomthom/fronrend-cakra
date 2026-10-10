import SideBarDocs from "@/components/sidebar-docs";
import { ReactNode } from "react";
import { List } from "lucide-react";

export default function LayoutDocumentation({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-6 pt-20 transition-colors duration-300 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[16rem_1fr] xl:grid-cols-[16rem_1fr_15rem]">
          {/* SIDEBAR NAVIGASI UTAMA (KIRI) */}
          <aside className="hidden lg:block sticky top-20">
            <SideBarDocs />
          </aside>

          {/* AREA KONTEN UTAMA DOKUMENTASI */}
          <main className="min-w-0 w-full">{children}</main>

          {/* TABLE OF CONTENTS / DAFTAR ISI HALAMAN (KANAN) */}
          <aside className="hidden xl:block sticky top-20">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3 dark:border-slate-800">
                <List className="h-4 w-4 text-emerald-500" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Di Halaman Ini
                </h3>
              </div>

              <nav className="mt-3">
                <ul className="space-y-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <li>
                    <a
                      href="#apa-itu-cakra"
                      className="block rounded-lg px-2.5 py-1.5 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
                    >
                      Apa itu CAKRA
                    </a>
                  </li>
                  <li>
                    <a
                      href="#cerita-dibalik-cakra"
                      className="block rounded-lg px-2.5 py-1.5 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
                    >
                      Cerita di Balik CAKRA
                    </a>
                  </li>
                  <li>
                    <a
                      href="#kontribusi-tim"
                      className="block rounded-lg px-2.5 py-1.5 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
                    >
                      Kontribusi Tim Utama
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}