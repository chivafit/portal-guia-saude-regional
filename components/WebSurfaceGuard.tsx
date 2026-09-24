"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const publicPaths = new Set(["/", "/privacidade", "/termos"]);

export function WebSurfaceGuard({children}:{children:React.ReactNode}) {
  const pathname = usePathname();
  const router = useRouter();
  const isPublic = publicPaths.has(pathname);
  useEffect(()=>{if(!isPublic)router.replace("/")},[isPublic,router]);
  return isPublic ? children : null;
}
