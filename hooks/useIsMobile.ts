// hooks/useIsMobile.ts
import { useEffect, useState } from "react";

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  return isMobile;
}
