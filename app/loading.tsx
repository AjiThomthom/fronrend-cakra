import Image from "next/image";

export default function LoadingProtectedSlug() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      {/* Ambient Decorative Lighting */}
      <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/20" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Wadah Logo Terisolasi dengan Ambient Pulse Glow */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-3 shadow-xl border border-slate-200/80 dark:border-emerald-500/30 dark:shadow-emerald-500/20">
          <span className="absolute -inset-1 rounded-2xl bg-emerald-500/20 blur-md animate-pulse" />
          <Image
            src="/CAKRA.png"
            alt="CAKRA Logo"
            width={56}
            height={56}
            priority
            className="relative object-contain"
          />
        </div>

        {/* Indikator Loading Dots */}
        <div className="mt-6 flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.3s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.15s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-emerald-500" />
        </div>

        <p className="mt-3 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
          Memuat Sumber Daya...
        </p>
      </div>
    </div>
  );
}