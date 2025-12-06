import { ReactNode } from "react";
import { UIProvider } from "./UIProvider";

export function Providers({ children }: { children: ReactNode }) {
  return <UIProvider>{children}</UIProvider>;
}
