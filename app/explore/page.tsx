"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type FloatingItem = {
  id: string;
  label: string;
  href: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const items = [
  { id: "home", label: "Home", href: "/" },
  { id: "world-map", label: "World Map", href: "/world-map" },
  { id: "random", label: "Random", href: "/random" },
  { id: "notes", label: "Notes", href: "/notes" },
  { id: "movie", label: "Movie", href: "/movie" },
  { id: "about", label: "About", href: "/about" },
];

export default function ExplorePage() {
  const [floaters, setFloaters] = useState<FloatingItem[]>([]);
  const animRef = useRef<number | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;

    const initial: FloatingItem[] = items.map((item) => ({
      ...item,
      x: Math.random() * (W - 120),
      y: Math.random() * (H - 40),
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));

    setFloaters(initial);

    const tick = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      setFloaters((prev) =>
        prev.map((f) => {
          let { x, y, vx, vy } = f;
          x += vx;
          y += vy;
          if (x < 0 || x + 120 > W) vx = -vx;
          if (y < 0 || y + 40 > H) vy = -vy;
          return { ...f, x, y, vx, vy };
        })
      );
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <main className="fixed inset-0 bg-white overflow-hidden">
      {floaters.map((f) => (
        <button
          key={f.id}
          onClick={() => router.push(f.href)}
          className="absolute text-sm tracking-[0.2em] uppercase text-neutral-300 hover:text-neutral-700 transition-colors duration-300"
          style={{
            left: f.x,
            top: f.y,
            fontFamily: "var(--font-serif)",
            whiteSpace: "nowrap",
          }}
        >
          {f.label}
        </button>
      ))}
    </main>
  );
}