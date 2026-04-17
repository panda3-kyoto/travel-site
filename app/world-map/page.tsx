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
      <section className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-light tracking-[0.04em]">World Map</h1>
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
              className="bg-white px-12 py-10 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs text-neutral-400 tracking-[0.12em] uppercase mb-6">
                {selectedData.name}
              </p>
              <div className="space-y-4">
                {selectedData.posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="block text-sm text-neutral-700 hover:text-neutral-900 transition"
                  >
                    {post.title}
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
      </div>
    </main>
  );
}