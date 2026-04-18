"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function FadeIn({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: visible ? "opacity 1.8s ease-in-out" : "none",
        backgroundColor: "white",
      }}
    >
      {children}
    </div>
  );
}