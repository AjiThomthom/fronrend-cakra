export default function LoadingProtectedSlug() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="animate-pulse">
          <img
            src="/CAKRA.png"
            alt="CAKRA"
            className="h-28 w-28 object-contain"
          />
        </div>
        <div className="mt-6 flex items-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-green-600" />
        </div>

        <p className="mt-3 text-sm font-medium text-gray-500">
          Memuat Sumber Daya...
        </p>
      </div>
    </div>
  );
}
