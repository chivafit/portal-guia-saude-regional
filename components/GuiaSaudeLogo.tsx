import Image from "next/image";

export function GuiaSaudeLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "guia-logo guia-logo-compact" : "guia-logo"} aria-label="Guia Saúde">
      <svg className="guia-logo-symbol" viewBox="0 0 96 96" role="img" aria-label="Símbolo Guia Saúde">
        <defs>
          <linearGradient id="guia-a" x1="10" y1="14" x2="78" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00D1C6" />
            <stop offset=".52" stopColor="#0F9D7E" />
            <stop offset="1" stopColor="#D7FF5A" />
          </linearGradient>
          <linearGradient id="guia-b" x1="82" y1="8" x2="25" y2="83" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D7FF5A" />
            <stop offset=".5" stopColor="#72E7C2" />
            <stop offset="1" stopColor="#0F9D7E" />
          </linearGradient>
          <linearGradient id="guia-c" x1="22" y1="80" x2="78" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#08745F" />
            <stop offset=".5" stopColor="#00D1C6" />
            <stop offset="1" stopColor="#E9FFB5" />
          </linearGradient>
        </defs>
        <path d="M47 9c15 0 27 11 28 25 1 9-4 16-12 20-10 5-22 2-30-5-8-8-10-19-4-28C33 13 39 9 47 9Z" fill="url(#guia-b)" opacity=".94"/>
        <path d="M18 35c7-12 21-17 33-11 8 4 12 12 11 21-1 11-10 20-20 24-11 4-22 1-28-8-5-8-3-18 4-26Z" fill="url(#guia-a)" opacity=".96"/>
        <path d="M48 43c9-8 22-9 31-2 9 7 11 19 5 29-7 11-20 17-32 12-10-4-16-14-15-24 1-6 5-11 11-15Z" fill="url(#guia-c)" opacity=".92"/>
        <path d="M35 36c8-8 21-9 30-3 8 6 11 16 7 25-4 9-14 15-24 14-10-1-18-8-20-17-2-7 1-14 7-19Z" fill="#F4F7FA" opacity=".82"/>
      </svg>
      <Image
        className="guia-logo-wordmark"
        src={compact ? "/brand/guia-saude-wordmark-compact.svg" : "/brand/guia-saude-wordmark.svg"}
        alt=""
        width={compact ? 110 : 145}
        height={compact ? 80 : 85}
        priority
      />
    </span>
  );
}
