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
} from "lucide-react";
import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="relative mt-16 overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-900 text-slate-100 p-8 md:p-12 shadow-2xl backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950">
      {/* Background Glow Effect */}
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* BRAND COLUMN */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-wider text-white">
                CAKRA
              </h2>
              <p className="text-xs font-semibold text-emerald-400">
                Cepat, Akurat, Koordinasi Respon Aman
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
            Platform pemantauan berbasis AI yang mengintegrasikan kamera CCTV
            untuk keamanan ruang publik secara real-time dan presisi.
          </p>

          <div className="pt-2 text-xs text-slate-400 space-y-1">
            <p>Developed by:</p>
            <p className="font-semibold text-emerald-300">
              Informatics Students of Pelita Bangsa
            </p>
          </div>
        </div>

        {/* QUICK ACCESS */}
        <div className="md:col-span-3 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
            Akses Cepat
          </h3>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li>
              <Link
                href="/login"
                className="hover:text-emerald-400 flex items-center gap-2 transition-colors"
              >
                <Key className="w-4 h-4 text-emerald-500" /> Masuk
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="hover:text-emerald-400 flex items-center gap-2 transition-colors"
              >
                <UserCircle className="w-4 h-4 text-emerald-500" /> Pendaftaran
              </Link>
            </li>
            <li>
              <Link
                href="/maps"
                className="hover:text-emerald-400 flex items-center gap-2 transition-colors"
              >
                <Compass className="w-4 h-4 text-emerald-500" /> Peta Keamanan
              </Link>
            </li>
            <li>
              <Link
                href="/docs"
                className="hover:text-emerald-400 flex items-center gap-2 transition-colors"
              >
                <Folder className="w-4 h-4 text-emerald-500" /> Dokumentasi
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT & SUPPORT */}
        <div className="md:col-span-4 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
            Kontak & Bantuan
          </h3>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
              <span>Universitas Pelita Bangsa, Cikarang, Indonesia</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>cakra.support@pelitabangsa.ac.id</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>+62 812-3456-7890</span>
            </li>
          </ul>
        </div>
      </div>

      <Divider className="!border-slate-800 !my-8" />

      {/* COPYRIGHT */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
        <p>
          &copy; {new Date().getFullYear()} CAKRA Platform. All rights reserved.
        </p>
        <p className="font-medium text-slate-500">Built for Smart City & Community Security</p>
      </div>
    </footer>
  );
}