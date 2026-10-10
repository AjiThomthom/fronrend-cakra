"use client";

import { Divider } from "@mui/material";
import {
  Compass,
  Folder,
  Key,
  Mail,
  MapPin,
  Phone,
  UserCircle,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="relative mt-12 overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-900/95 p-8 text-slate-100 shadow-2xl backdrop-blur-xl transition-colors duration-300 md:p-12 dark:border-slate-800/80 dark:bg-slate-950">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-16 -right-16 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-12">
        {/* Brand Info */}
        <div className="space-y-4 md:col-span-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-wider text-white">
                CAKRA
              </h2>
              <p className="text-xs font-semibold text-emerald-400">
                Cepat, Akurat, Koordinasi Respon Aman
              </p>
            </div>
          </div>

          <p className="max-w-sm text-xs leading-relaxed text-slate-300 md:text-sm">
            Platform pengawasan CCTV terpadu berbasis AI untuk deteksi kejadian darurat secara presisi dan realtime.
          </p>

          <div className="pt-2 text-xs text-slate-400">
            <p>Pengembangan oleh:</p>
            <p className="font-semibold text-emerald-300">
              Mahasiswa Informatika Universitas Pelita Bangsa
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3 md:col-span-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Akses Pintar
          </h3>
          <ul className="space-y-2.5 text-xs md:text-sm text-slate-300">
            {[
              { name: "Masuk Akun", href: "/login", icon: Key },
              { name: "Pendaftaran", href: "/register", icon: UserCircle },
              { name: "Peta Keamanan", href: "/maps", icon: Compass },
              { name: "Dokumentasi API", href: "/docs", icon: Folder },
            ].map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-2 transition-colors hover:text-emerald-400"
                >
                  <link.icon className="h-4 w-4 text-emerald-500 transition-transform group-hover:scale-110" />
                  <span>{link.name}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 md:col-span-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Kontak & Lokasi
          </h3>
          <ul className="space-y-3 text-xs md:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>Universitas Pelita Bangsa, Cikarang Pusat, Indonesia</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>cakra.support@pelitabangsa.ac.id</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>+62 812-3456-7890</span>
            </li>
          </ul>
        </div>
      </div>

      <Divider className="!my-8 !border-slate-800" />

      {/* Bottom Bar */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} CAKRA Platform. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-slate-300">Sistem Aktif & Terhubung</span>
        </div>
      </div>
    </footer>
  );
}