"use client";
import { usePathname } from "next/navigation";

const ShowComponents = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return <div>{pathname !== "/login" && children}</div>;
};

export default ShowComponents;
