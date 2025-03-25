"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DebugPath({ children }) {
  const pathname = usePathname();
  
  useEffect(() => {
    console.log("Current Pathname:", pathname);
    if (pathname !== "/") {
        sessionStorage.setItem("lastPath", pathname); // Store last visited path
        console.log(pathname);
      }
  }, [pathname]);

  return children;
}
