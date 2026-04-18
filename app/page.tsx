"use client";

import Image from "next/image";
import Link from "next/link";
import { posts } from "../data/posts";
import { useEffect, useState } from "react";

export default function Home() {
  const [phase, setPhase] = useState<"closed" | "knob" | "opening" | "text" | "fading" | "done">("done");
  const [knobRotation, setKnobRotation] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("visited")) return;
    sessionStorage.setItem("visited", "true");
    setPhase("closed");
    const t1 = setTimeout(() => {
      setPhase("knob");
      setKnobRotation(45);
    }, 1000);
    const t2 = setTimeout(() => setPhase("opening"), 1800);
    const t3 = setTimeout(() => setPhase("text"), 3600);
    const t4 = setTimeout(() => setPhase("fading"), 5800);
    const t5 = setTimeout(() => setPhase("done"), 7200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const isOpen = phase === "opening" || phase === "text" || phase === "fading";

  return (
    <>
      {phase !== "done" && (
        <div
          className="fixed inset-0 z-50"
          style={{
            backgroundColor: "white",
            opacity: phase === "fading" ? 0 : 1,
            transition: phase === "fading" ? "opacity 1.4s ease-in-out" : "none",
            perspective: "1000px",
          }}
        >
          {/* 光の演出 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isOpen
                ? "radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)"
                : "none",
              transition: "opacity 2s ease-out",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          {/* テキスト */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              opacity: phase === "text" || phase === "fading" ? 1 : 0,
              transition: "opacity 1.2s ease-in-out",
              zIndex: 2,
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

          {/* 左扉 */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "50%",
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              transform: isOpen ? "rotateY(-105deg)" : "rotateY(0deg)",
              transition: isOpen ? "transform 3.6s cubic-bezier(0.6, 0, 0.15, 1)" : "none",
              zIndex: 10,
            }}
          >
            {/* 扉の表面 */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, #f0f0f0 0%, #ffffff 40%, #f8f8f8 100%)",
              boxShadow: "inset -8px 0 20px rgba(0,0,0,0.08), inset 0 0 40px rgba(0,0,0,0.03)",
            }}>
              {/* 円形ノブ */}
              <div style={{
                position: "absolute",
                right: "28px",
                top: "50%",
                transform: `translateY(-50%) rotate(${knobRotation}deg)`,
                transition: "transform 0.6s ease-in-out",
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #e8c96a, #a07830 50%, #6b4f1a 100%)",
                boxShadow: "2px 2px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,220,100,0.4)",
              }} />
              {/* 装飾線 */}
              <div style={{ position: "absolute", left: "16px", top: "8%", bottom: "8%", width: "0.5px", background: "#e8e8e8" }} />
              <div style={{ position: "absolute", right: "16px", top: "8%", bottom: "8%", width: "0.5px", background: "#e8e8e8" }} />
              <div style={{ position: "absolute", top: "16px", left: "8%", right: "8%", height: "0.5px", background: "#e8e8e8" }} />
              <div style={{ position: "absolute", bottom: "16px", left: "8%", right: "8%", height: "0.5px", background: "#e8e8e8" }} />
            </div>
            {/* 扉の側面（厚み） */}
            <div style={{
              position: "absolute",
              top: 0,
              right: "-16px",
              width: "16px",
              height: "100%",
              background: "linear-gradient(to right, #d0d0d0, #e8e8e8)",
              transform: "rotateY(90deg)",
              transformOrigin: "left center",
            }} />
          </div>

          {/* 右扉 */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              width: "50%",
              transformOrigin: "right center",
              transformStyle: "preserve-3d",
              transform: isOpen ? "rotateY(105deg)" : "rotateY(0deg)",
              transition: isOpen ? "transform 3.6s cubic-bezier(0.6, 0, 0.15, 1)" : "none",
              zIndex: 10,
            }}
          >
            {/* 扉の表面 */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to left, #f0f0f0 0%, #ffffff 40%, #f8f8f8 100%)",
              boxShadow: "inset 8px 0 20px rgba(0,0,0,0.08), inset 0 0 40px rgba(0,0,0,0.03)",
            }}>
              {/* 円形ノブ */}
              <div style={{
                position: "absolute",
                left: "28px",
                top: "50%",
                transform: `translateY(-50%) rotate(${knobRotation}deg)`,
                transition: "transform 0.6s ease-in-out",
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #e8c96a, #a07830 50%, #6b4f1a 100%)",
                boxShadow: "-2px 2px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,220,100,0.4)",
              }} />
              {/* 装飾線 */}
              <div style={{ position: "absolute", left: "16px", top: "8%", bottom: "8%", width: "0.5px", background: "#e8e8e8" }} />
              <div style={{ position: "absolute", right: "16px", top: "8%", bottom: "8%", width: "0.5px", background: "#e8e8e8" }} />
              <div style={{ position: "absolute", top: "16px", left: "8%", right: "8%", height: "0.5px", background: "#e8e8e8" }} />
              <div style={{ position: "absolute", bottom: "16px", left: "8%", right: "8%", height: "0.5px", background: "#e8e8e8" }} />
            </div>
            {/* 扉の側面（厚み） */}
            <div style={{
              position: "absolute",
              top: 0,
              left: "-16px",
              width: "16px",
              height: "100%",
              background: "linear-gradient(to left, #d0d0d0, #e8e8e8)",
              transform: "rotateY(-90deg)",
              transformOrigin: "right center",
            }} />
          </div>
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