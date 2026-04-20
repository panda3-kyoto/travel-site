"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Cat, Utensils, Building2, Sunset, Plane, Trees, User } from "lucide-react";

type Theme = {
  slug: string;
  label: string;
  icon: React.ElementType;
};

const themes: Theme[] = [
  { slug: "cats", label: "Cats", icon: Cat },
  { slug: "food", label: "Food", icon: Utensils },
  { slug: "architecture", label: "Architecture", icon: Building2 },
  { slug: "sunset", label: "Sunset", icon: Sunset },
  { slug: "plane", label: "Travel", icon: Plane },
  { slug: "nature", label: "Nature", icon: Trees },
  { slug: "people", label: "People", icon: User },
];

type FloatingItem = {
  theme: Theme;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export default function ThemesPage() {
  const [floaters, setFloaters] = useState<FloatingItem[]>([]);
  const animRef = useRef<number | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;

    const initial: FloatingItem[] = themes.map((theme) => {
      const size = 180 + Math.random() * 60;
      return {
        theme,
        x: Math.random() * (W - size),
        y: Math.random() * (H - size),
        vx: (Math.random() - 0.5) * 8.0,
        vy: (Math.random() - 0.5) * 8.0,
        size,
      };
    });

    setFloaters(initial);

    const tick = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      setFloaters((prev) =>
        prev.map((f) => {
          let { x, y, vx, vy, size } = f;
          x += vx;
          y += vy;
          if (x < 0 || x + size > W) vx = -vx;
          if (y < 0 || y + size > H) vy = -vy;
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
      <div className="absolute inset-0">
        {floaters.map((f) => {
          const Icon = f.theme.icon;
          return (
            <button
              key={f.theme.slug}
              onClick={() => router.push(`/themes/${f.theme.slug}`)}
              className="absolute group"
              style={{
                left: f.x,
                top: f.y,
                width: f.size,
              }}
            >
              <Icon
                size={f.size}
                strokeWidth={0.5}
                className="text-neutral-300 group-hover:text-neutral-600 transition-colors duration-300"
              />
            </button>
          );
        })}
      </div>
    </main>
  );
}