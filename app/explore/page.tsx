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
  width: number;
};

const items = [
  { id: "home", label: "Home", href: "/" },
  { id: "world-map", label: "World Map", href: "/world-map" },
  { id: "random", label: "Random", href: "/random" },
  { id: "notes", label: "Notes", href: "/notes" },
  { id: "movie", label: "Movie", href: "/movie" },
  { id: "about", label: "About", href: "/about" },
];

const ITEM_HEIGHT = 30;
const ITEM_WIDTH = 140;

export default function ExplorePage() {
  const [floaters, setFloaters] = useState<FloatingItem[]>([]);
  const animRef = useRef<number | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;

    const initial: FloatingItem[] = items.map((item) => ({
      ...item,
      width: ITEM_WIDTH,
      x: Math.random() * (W - ITEM_WIDTH),
      y: 80 + Math.random() * (H - 80 - ITEM_HEIGHT - 40),
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
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
          if (x < 0) { x = 0; vx = Math.abs(vx); }
          if (x + ITEM_WIDTH > W) { x = W - ITEM_WIDTH; vx = -Math.abs(vx); }
          if (y < 80) { y = 80; vy = Math.abs(vy); }
          if (y + ITEM_HEIGHT > H - 40) { y = H - 40 - ITEM_HEIGHT; vy = -Math.abs(vy); }
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