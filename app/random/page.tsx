"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { posts } from "../../data/posts";

const validPosts = posts.filter((p) => p.photos.length > 0);

export default function RandomPage() {
  const [spinning, setSpinning] = useState(false);
  const [displayCity, setDisplayCity] = useState("");
  const [selected, setSelected] = useState<typeof validPosts[0] | null>(null);
  const [showCover, setShowCover] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const router = useRouter();

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setShowCover(false);
    setSelected(null);

    const finalPost = validPosts[Math.floor(Math.random() * validPosts.length)];

    // 速度スケジュール：最初は速く、最後はゆっくり
    const schedule = [
      ...Array(15).fill(60),   // 速い
      ...Array(8).fill(120),   // 中速
      ...Array(5).fill(220),   // ゆっくり
      ...Array(3).fill(380),   // さらにゆっくり
      ...Array(2).fill(600),   // 最後
    ];

    let index = 0;

    const next = () => {
      if (index < schedule.length) {
        const random = validPosts[Math.floor(Math.random() * validPosts.length)];
        setDisplayCity(random.title);
        timeoutRef.current = setTimeout(next, schedule[index]);
        index++;
      } else {
        setDisplayCity(finalPost.title);
        setSelected(finalPost);
        setTimeout(() => setShowCover(true), 300);
        setSpinning(false);
      }
    };

    next();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-8">
      <p
        className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-16"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Where will you go?
      </p>

      {/* スロット */}
      <div
        className="w-64 h-16 border border-neutral-200 flex items-center justify-center mb-12 overflow-hidden"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        <p className="text-2xl font-light tracking-[0.1em] text-neutral-700">
          {displayCity || "－"}
        </p>
      </div>

      {/* ボタン */}
      <button
        onClick={spin}
        disabled={spinning}
        className="text-xs tracking-[0.3em] uppercase text-neutral-400 hover:text-neutral-700 transition disabled:opacity-30"
      >
        {spinning ? "..." : "Spin"}
      </button>

      {/* カバー写真 */}
      {selected && (
        <div
          className="mt-16 w-full max-w-md cursor-pointer"
          style={{
            opacity: showCover ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
          onClick={() => router.push(`/posts/${selected.slug}`)}
        >
          <div className="relative aspect-[3/2] overflow-hidden">
            <img
              src={selected.cover}
              alt={selected.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p
                className="text-white/80 text-sm tracking-[0.1em] uppercase"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {selected.country}
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-400 tracking-[0.1em] text-center uppercase">
            tap to enter
          </p>
        </div>
      )}
    </main>
  );
}