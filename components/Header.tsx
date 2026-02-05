export default function Header() {
  return (
    <div className="h-[15vh] w-full flex flex-col items-center justify-center relative z-[200] min-h-[100px] pt-4">
      {/* Logo Icon */}
      <div className="mb-2">
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.6)]">
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
        <span className="drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]">
          Bain Forge
        </span>
      </h1>
    </div>
  );
}
