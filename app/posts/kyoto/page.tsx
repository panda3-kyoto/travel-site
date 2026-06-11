"use client";

import Link from "next/link";
import { useState } from "react";

const seasons = [
  {
    slug: "spring",
    label: "Spring",
    labelJa: "春",
    waka: "久方の 光のどけき 春の日に しづ心なく 花の散るらむ",
    wakaAuthor: "紀友則",
  },
  {
    slug: "summer",
    label: "Summer",
    labelJa: "夏",
    waka: "夏の夜は まだ宵ながら 明けぬるを 雲のいづこに 月宿るらむ",
    wakaAuthor: "清原深養父",
  },
  {
    slug: "autumn",
    label: "Autumn",
    labelJa: "秋",
    waka: "ちはやぶる 神代もきかず 龍田川 からくれなゐに 水くくるとは",
    wakaAuthor: "在原業平",
  },
  {
    slug: "winter",
    label: "Winter",
    labelJa: "冬",
    waka: "山里は 冬ぞさびしさ まさりける 人目も草も かれぬと思へば",
    wakaAuthor: "源宗于朝臣",
  },
];

export default function KyotoPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const season = seasons[currentIndex];

  const prev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const next = () => setCurrentIndex((i) => Math.min(i + 1, seasons.length - 1));

  return (
    <div className="fixed inset-0">
      <img
        src={`/images/kyoto/${season.slug}.jpeg`}
        alt={season.label}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        key={season.slug}
      />

      <div className="absolute inset-0 bg-black/15" />

      {/* 中央テキスト＋リンク */}
      <Link
        href={`/posts/kyoto/${season.slug}`}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4"
      >
        <p
          className="text-5xl md:text-7xl font-light tracking-[0.2em] uppercase"
          style={{
            color: "rgba(255,255,255,0.85)",
            fontFamily: "var(--font-serif)",
          }}
        >
          {season.label}
        </p>
        <p
          className="text-lg tracking-[0.1em]"
          style={{
            color: "rgba(255,255,255,0.85)",
            fontFamily: "var(--font-serif)",
          }}
        >
          {season.labelJa}
        </p>

        <div className="mt-6 text-center px-8">
          <p
            className="text-xs md:text-sm leading-7 tracking-[0.1em]"
            style={{
              color: "rgba(255,255,255,0.8)",
              fontFamily: "var(--font-serif)",
            }}
          >
            {season.waka}
          </p>
          <p
            className="mt-2 text-xs md:text-sm tracking-[0.1em]"
            style={{
              color: "rgba(255,255,255,0.8)",
              fontFamily: "var(--font-serif)",
            }}
          >
            — {season.wakaAuthor}
          </p>
        </div>
      </Link>

      {/* 左矢印 */}
      {currentIndex > 0 && (
        <button
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/90 transition text-5xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          ‹
        </button>
      )}

      {/* 右矢印 */}
      {currentIndex < seasons.length - 1 && (
        <button
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/90 transition text-5xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          ›
        </button>
      )}

      {/* ヘッダー */}
      <header className="absolute top-0 left-0 right-0 px-8 py-8 flex items-center justify-between pointer-events-none">
        <span className="text-sm tracking-[0.12em] uppercase text-white/60">
          Kyoto
        </span>
        <Link
          href="/"
          className="text-sm text-white/60 hover:text-white/90 transition pointer-events-auto"
        >
          Home
        </Link>
      </header>

      {/* インジケーター */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
        {seasons.map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full transition-all duration-500"
            style={{
              background: i === currentIndex ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}