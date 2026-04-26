"use client";

import Image from "next/image";
import Link from "next/link";
import { posts } from "../data/posts";
import { useEffect, useState } from "react";

export default function Home() {
  const [phase, setPhase] = useState<"text" | "fading" | "done">("done");

  useEffect(() => {
    if (sessionStorage.getItem("visited")) return;
    sessionStorage.setItem("visited", "true");
    setPhase("text");
    const t1 = setTimeout(() => setPhase("fading"), 2000);
    const t2 = setTimeout(() => setPhase("done"), 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      {phase !== "done" && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
          style={{
            opacity: phase === "fading" ? 0 : 1,
            transition: phase === "fading" ? "opacity 1.4s ease-in-out" : "none",
          }}
        >
          <p style={{
            color: "#bbbbbb",
            fontFamily: "var(--font-serif)",
            letterSpacing: "0.5em",
            fontSize: "11px",
            textTransform: "uppercase",
          }}>
            Welcome to
          </p>
          <h1 style={{
            marginTop: "16px",
            color: "#999999",
            fontFamily: "var(--font-serif)",
            letterSpacing: "0.3em",
            fontSize: "18px",
            fontWeight: 300,
            textTransform: "uppercase",
          }}>
            My Museum
          </h1>
        </div>
      )}

      {/* メインコンテンツ */}
      <main className="min-h-screen bg-white text-neutral-900 px-6 py-6 md:px-8 md:py-8">
        <header className="mb-10 flex items-center justify-between">
          <h1 className="text-sm tracking-[0.12em] uppercase">Travel Notes</h1>
          <Link href="/world-map" className="text-sm text-neutral-500">World Map</Link>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {posts.map((post, index) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="block">
              <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100">
                <div
                  className="absolute inset-0 drift"
                  style={{
                    animationDuration: `${12 + index * 2}s`,
                    animationDelay: `${index * 0.4}s`,
                  }}
                >
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={post.slug === "delhi"}
                  />
                </div>
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-white/80 text-lg tracking-[0.08em] font-light">{post.title}</h2>
                    <p className="mt-1 text-white/60 text-sm tracking-[0.06em]">{post.country}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}