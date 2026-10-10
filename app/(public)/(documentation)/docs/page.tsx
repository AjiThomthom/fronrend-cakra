import { Info, Sparkles, Users, Code2, Server, FileText } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dokumentasi - CAKRA",
};

export default async function Page() {
  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-200">
      {/* SECTION 1: APA ITU CAKRA */}
      <section
        id="apa-itu-cakra"
        className="scroll-mt-24 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex items-center gap-3 border-b border-slate-200/80 pb-4 dark:border-slate-800">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <Info className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
            Apa Itu CAKRA?
          </h1>
        </div>

        <div className="mt-4 space-y-4 text-xs sm:text-sm leading-relaxed font-medium text-slate-600 dark:text-slate-300">
          <p>
            <strong className="text-slate-900 dark:text-white">CAKRA</strong> adalah platform
            sistem deteksi perkelahian dan insiden berbasis kecerdasan buatan (*Artificial Intelligence*)
            yang dikembangkan oleh sekelompok mahasiswa Program Studi Teknik Informatika, Universitas
            Pelita Bangsa.
          </p>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800/80 dark:bg-slate-800/40">
            <p className="text-[10px] text-slate-400 mb-2 font-bold uppercase tracking-wider">
              Susunan Tim Pengembang:
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 font-bold text-blue-600 dark:text-blue-400">
                Radjikin Septiawan &bull; <span className="font-normal text-[11px]">Software Engineer & AI</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                Megatama Setiaji &bull; <span className="font-normal text-[11px]">DevOps & IT Infra</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 font-bold text-amber-600 dark:text-amber-400">
                Gilang Ramadhan &bull; <span className="font-normal text-[11px]">Administrasi & Proposal</span>
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-700/60 pt-2.5">
              Dosen Pembimbing: <strong className="text-slate-800 dark:text-slate-200">Muhammad Anggi Rifa'i, M.Kom.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: CERITA DI BALIK CAKRA */}
      <section
        id="cerita-dibalik-cakra"
        className="scroll-mt-24 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex items-center gap-3 border-b border-slate-200/80 pb-4 dark:border-slate-800">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
            Cerita di Balik CAKRA
          </h2>
        </div>

        <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed font-medium text-slate-600 dark:text-slate-300">
          <p>
            <strong className="text-emerald-600 dark:text-emerald-400 font-bold">CAKRA</strong> merupakan akronim dari{" "}
            <span className="font-bold italic text-slate-900 dark:text-white">"Cepat, Akurat, Koordinasi Respon Aman"</span>.
            Awalnya, CAKRA dirancang untuk mengikuti kompetisi tingkat nasional oleh tim mahasiswa Teknik Informatika Universitas Pelita Bangsa yang dipimpin oleh Radjikin Septiawan.
          </p>

          <p>
            Seiring berjalannya waktu, berbagai riset dan percobaan terus dilakukan, meski sempat menemui kegagalan dalam sejumlah seleksi proposal kompetisi. Berkat semangat pantang menyerah dalam mengembangkan ide ini, lahirlah sebuah teknologi yang mengintegrasikan <strong className="text-slate-900 dark:text-white">Software Development, Artificial Intelligence</strong>, dan <strong className="text-slate-900 dark:text-white">Internet of Things (IoT)</strong>.
          </p>
        </div>
      </section>

      {/* SECTION 3: KONTRIBUSI TIM PENGEMBANG */}
      <section
        id="kontribusi-tim"
        className="scroll-mt-24 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex items-center gap-3 border-b border-slate-200/80 pb-4 dark:border-slate-800">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <Users className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
            Kontribusi Tim Pengembang Utama
          </h2>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* RADJIKIN */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-colors dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400 font-bold text-xs">
              <Code2 className="h-4 w-4 shrink-0" />
              <span>Radjikin Septiawan</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Riset teknologi & software, Desain UI/UX, pengembangan model Artificial Intelligence, serta Software Engineering.
            </p>
          </div>

          {/* MEGATAMA */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-colors dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              <Server className="h-4 w-4 shrink-0" />
              <span>Megatama Setiaji</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Infrastruktur IT & Sysadmin, riset topologi hardware, Desain UI/UX, serta DevOps Engineering.
            </p>
          </div>

          {/* GILANG */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-colors dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center gap-2 mb-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <FileText className="h-4 w-4 shrink-0" />
              <span>Gilang Ramadhan</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Manajemen administrasi, penyusunan proposal teknis, serta pengelolaan dokumen proyek.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}