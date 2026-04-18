"use client";

import { useState } from "react";
import Link from "next/link";
import { posts } from "../../data/posts";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const countryPosts = posts.reduce((acc, post) => {
  if (!acc[post.countryCode]) {
    acc[post.countryCode] = { name: post.country, code: post.countryCode, posts: [] };
  }
  acc[post.countryCode].posts.push(post);
  return acc;
}, {} as Record<string, { name: string; code: string; posts: typeof posts }>);

const visitedCodes = Object.keys(countryPosts);

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const countryCodeToNumeric: Record<string, string> = {
    IN: "356",
    TH: "764",
    VN: "704",
    UZ: "860",
    TJ: "762",
    TR: "792",
    TW: "158",
    KH: "116",
    MY: "458",
    JP: "392",
  };

const numericToCode: Record<string, string> = Object.fromEntries(
  Object.entries(countryCodeToNumeric).map(([k, v]) => [v, k])
);

export default function WorldMapPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedData = selected ? countryPosts[selected] : null;

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-8 py-8 md:px-12 md:py-10">
<section className="mb-8 w-full flex items-center justify-between">
  <h1 className="text-sm tracking-[0.12em] uppercase">World Map</h1>
  <Link href="/" className="text-sm text-neutral-500">Home</Link>
</section>

      <div className="relative w-full">
        {/* 地図 */}
        <div
          className="transition-opacity duration-500"
          style={{ opacity: selected ? 0.2 : 1 }}
        >
          <ComposableMap
            projectionConfig={{ scale: 147 }}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const code = numericToCode[geo.id];
                  const isVisited = code && visitedCodes.includes(code);
                  const isSelected = code && selected === code;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        if (isVisited) setSelected(isSelected ? null : code);
                      }}
                      style={{
                        default: {
                          fill: isSelected ? "#171717" : isVisited ? "#555555" : "none",
                          stroke: "#cccccc",
                          strokeWidth: 0.5,
                          outline: "none",
                          cursor: isVisited ? "pointer" : "default",
                        },
                        hover: {
                          fill: isVisited ? "#171717" : "none",
                          stroke: "#cccccc",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        pressed: {
                          fill: isVisited ? "#171717" : "none",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* オーバーレイ */}
        {selectedData && (
  <div
    className="absolute inset-0 flex items-center justify-center"
    onClick={() => setSelected(null)}
  >
    <div
      className="bg-white px-12 py-10 max-w-2xl w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-xs text-neutral-400 tracking-[0.12em] uppercase mb-6">
        {selectedData.name}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {selectedData.posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block relative aspect-[3/2] overflow-hidden"
          >
            <img
              src={post.cover}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xs tracking-[0.08em] text-neutral-700">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <button
        onClick={() => setSelected(null)}
        className="mt-8 text-xs text-neutral-400 tracking-[0.12em] uppercase hover:text-neutral-600 transition"
      >
        Close
      </button>
    </div>
  </div>
)}
{/* モバイル用国リスト */}
<div className="mt-12 md:hidden">
  <p className="text-xs text-neutral-400 tracking-[0.12em] uppercase mb-6">Index</p>
  <div className="grid grid-cols-2 gap-3">
    {Object.entries(countryPosts).sort(([a], [b]) => a.localeCompare(b)).map(([code, data]) => (
      <button
        key={code}
        onClick={() => setSelected(selected === code ? null : code)}
        className={`text-left px-4 py-3 border text-sm transition ${
          selected === code
            ? "border-neutral-900 text-neutral-900"
            : "border-neutral-200 text-neutral-500 hover:border-neutral-400"
        }`}
      >
        {data.name}
      </button>
    ))}
  </div>

  {selectedData && (
    <div className="mt-6">
      <p className="text-xs text-neutral-400 tracking-[0.12em] uppercase mb-4">
        {selectedData.name}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {selectedData.posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block relative aspect-[3/2] overflow-hidden"
          >
            <img
              src={post.cover}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xs tracking-[0.08em] text-neutral-700">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )}
</div>
      </div>
    </main>
  );
}