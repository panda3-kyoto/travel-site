"use client";

import Image from "next/image";
import Link from "next/link";
import { posts } from "../data/posts";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const allCovers = posts
  .map((p) => p.cover)
  .concat(posts.flatMap((p) => p.photos.filter((ph) => ph.orientation === "landscape").map((ph) => ph.image)));
const shuffled = [...allCovers].sort(() => Math.random() - 0.5);
const randomCoversMobile = shuffled.slice(0, 14);
const randomCoversDesktop = shuffled.slice(0, 24);

const countryOrder: string[] = [];
const groupedByCountry: Record<string, typeof posts> = {};

for (const post of posts) {
  if (!groupedByCountry[post.country]) {
    groupedByCountry[post.country] = [];
    countryOrder.push(post.country);
  }
  groupedByCountry[post.country].push(post);
}

export default function Home() {
  const [phase, setPhase] = useState<"text" | "fading" | "done">("text");
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    if (sessionStorage.getItem("visited")) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("visited", "true");
    const t1 = setTimeout(() => setPhase("fading"), 5000);
    const t2 = setTimeout(() => {
      setPhase("done");
      if (window.innerWidth < 768) router.push("/explore");
    }, 6400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const randomCovers = isMobile ? randomCoversMobile : randomCoversDesktop;

  return (
    <>
      {phase !== "done" && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{
            opacity: phase === "fading" ? 0 : 1,
            transition: phase === "fading" ? "opacity 1.4s ease-in-out" : "none",
          }}
        >
          {/* 背景グリッド */}
          <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-6 content-start gap-0">
            {randomCovers.map((src, i) => (
              <div key={i} className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-white/60" />

          {/* テキスト */}
          <div className="relative z-10 flex flex-col items-center">
<p style={{
  color: "rgba(255,255,255,0.7)",
  fontFamily: "var(--font-serif)",
  letterSpacing: "0.5em",
  fontSize: "11px",
  textTransform: "uppercase",
}}>
  Welcome to
</p>
<h1 style={{
  marginTop: "16px",
  color: "rgba(255,255,255,0.85)",
  fontFamily: "var(--font-serif)",
  letterSpacing: "0.3em",
  fontSize: "18px",
  fontWeight: 300,
  textTransform: "uppercase",
}}>
  My Museum
</h1>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-white text-neutral-900 px-6 py-6 md:px-8 md:py-8">
        <header className="mb-10 flex items-center justify-between">
          <h1 className="text-sm tracking-[0.12em] uppercase">Travel Notes</h1>
          <Link href="/world-map" className="text-sm text-neutral-500">World Map</Link>
        </header>

        {/* PC：グリッドレイアウト */}
        <section className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {posts.map((post, index) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="block">
              <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100">
                <div
                  className="absolute inset-0 bg-black/40"
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
                    sizes="(max-width: 1200px) 50vw, 33vw"
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

        {/* スマホ：国別横スクロール */}
        <div className="md:hidden space-y-10">
          {countryOrder.map((country) => (
            <section key={country}>
              <p className="text-xs text-neutral-400 tracking-[0.12em] uppercase mb-4">
                {country}
              </p>
              <div
                className="flex gap-3 overflow-x-auto pb-2"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {groupedByCountry[country].map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="flex-shrink-0 block"
                    style={{ width: "60vw" }}
                  >
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
                          sizes="60vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <h2 className="text-white/80 text-sm tracking-[0.08em] font-light">
                            {post.title}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}