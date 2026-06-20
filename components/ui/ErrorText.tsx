import { ReactNode } from "react";

export default function ErrorText({ children }: { children: ReactNode }) {
  return <p className="text-[12px] text-red-500 mt-1">{children}</p>;
}
