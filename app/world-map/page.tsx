"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { posts } from "../../data/posts";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import WorldMapIntro from "../components/WorldMapIntro";

const countryPosts = posts.reduce((acc, post) => {
  if (!acc[post.countryCode]) {
    acc[post.countryCode] = { name: post.country, code: post.countryCode, posts: [] };
  }
  acc[post.countryCode].posts.push(post);
  return acc;
}, {} as Record<string, { name: string; code: string; posts: typeof posts }>);

const visitedCodes = Object.keys(countryPosts);

const GEO_URL = "/world-110m.json";

const countryCodeToNumeric: Record<string, string> = {
  IN: "356", TH: "764", VN: "704", UZ: "860", TJ: "762",
  TR: "792", TW: "158", KH: "116", MY: "458", JP: "392",
};

const numericToCode: Record<string, string> = Object.fromEntries(
  Object.entries(countryCodeToNumeric).map(([k, v]) => [v, k])
);

type CountryCenter = {
  center: [number, number];
  zoom: number;
};

const countryCenters: Record<string, CountryCenter> = {
  IN: { center: [78, 22], zoom: 4 },
  TH: { center: [101, 15], zoom: 6 },
  VN: { center: [106, 16], zoom: 5 },
  UZ: { center: [63, 41], zoom: 6 },
  TJ: { center: [71, 39], zoom: 8 },
  TR: { center: [35, 39], zoom: 5 },
  TW: { center: [121, 24], zoom: 10 },
  KH: { center: [105, 12], zoom: 8 },
  MY: { center: [110, 4], zoom: 6 },
  JP: { center: [136, 36], zoom: 5 },
};

const defaultView: CountryCenter = { center: [30, 20], zoom: 1 };

export default function WorldMapPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<CountryCenter>(defaultView);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const animRef = useRef<number | undefined>(undefined);
  const router = useRouter();
  const selectedData = selected ? countryPosts[selected] : null;

  useEffect(() => {
    const target = selected ? countryCenters[selected] : defaultView;
    const fromCenter: [number, number] = [...currentView.center] as [number, number];
    const fromZoom = currentView.zoom;
    let start: number | null = null;
    const duration = 1600;

    if (animRef.current) cancelAnimationFrame(animRef.current);

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setCurrentView({
        center: [
          fromCenter[0] + (target.center[0] - fromCenter[0]) * ease,
          fromCenter[1] + (target.center[1] - fromCenter[1]) * ease,
        ] as [number, number],
        zoom: fromZoom + (target.zoom - fromZoom) * ease,
      });

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [selected]);

  return (
    <>
      {showIntro && <WorldMapIntro onComplete={() => setShowIntro(false)} />}

      <main
        className="min-h-screen bg-white text-neutral-900 px-8 py-8 md:px-12 md:py-10"
        style={{
          opacity: showIntro ? 0 : 1,
          transition: "opacity 1.2s ease-in-out",
        }}
      >
        <section className="mb-8 w-full flex items-center justify-between">
          <h1 className="text-sm tracking-[0.12em] uppercase">World Map</h1>
          <div className="flex items-center gap-6">
            {selected && (
              <button
                onClick={() => setSelected(null)}
                className="text-xs text-neutral-400 tracking-[0.12em] uppercase hover:text-neutral-600 transition"
              >
                ← Back
              </button>
            )}
            <Link href="/" className="text-sm text-neutral-500">Home</Link>
          </div>
        </section>

        <div
          className="relative w-full"
          onClick={() => {
            if (selected) setSelected(null);
          }}
        >
          <ComposableMap
            projectionConfig={{ scale: 147 }}
            style={{ width: "100%", height: "auto" }}
            height={400}
          >
            <ZoomableGroup
              center={currentView.center}
              zoom={currentView.zoom}
              onMoveEnd={() => {}}
              filterZoomEvent={() => false}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isVisited) setSelected(isSelected ? null : code);
                        }}
                        style={{
                          default: {
                            fill: isSelected ? "#cccccc" : isVisited ? "#aaaaaa" : "#eeeeee",
                            stroke: "#ffffff",
                            strokeWidth: 0.5,
                            outline: "none",
                            cursor: isVisited ? "pointer" : "default",
                          },
                          hover: {
                            fill: isVisited ? "#555555" : "#eeeeee",
                            stroke: "#ffffff",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {selected && selectedData?.posts.map((post) => {
                if (!post.coordinates) return null;
                const isHovered = hoveredCity === post.slug;
                return (
                  <Marker
                    key={post.slug}
                    coordinates={[post.coordinates.lng, post.coordinates.lat]}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/posts/${post.slug}`);
                    }}
                    onMouseEnter={() => setHoveredCity(post.slug)}
                    onMouseLeave={() => setHoveredCity(null)}
                  >
                    <circle
                      r={2 / currentView.zoom}
                      fill="#171717"
                      style={{ cursor: "pointer" }}
                    />
                    {isHovered && (
                      <text
                        textAnchor="middle"
                        y={-6 / currentView.zoom}
                        style={{
                          fontSize: `${7 / currentView.zoom}px`,
                          fill: "#171717",
                          opacity: 0.7,
                          cursor: "pointer",
                          letterSpacing: "0.05em",
                          pointerEvents: "none",
                        }}
                      >
                        {post.title}
                      </text>
                    )}
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>

         {/* モバイル用国リスト */}
<div className="mt-12 md:hidden">
  <p className="text-xs text-neutral-400 tracking-[0.12em] uppercase mb-6">Index</p>
  <div className="space-y-2">
    {Object.entries(countryPosts).sort(([a], [b]) => a.localeCompare(b)).map(([code, data]) => (
      <div key={code}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelected(selected === code ? null : code);
          }}
          className={`w-full text-left px-4 py-3 border text-sm transition ${
            selected === code
              ? "border-neutral-900 text-neutral-900"
              : "border-neutral-200 text-neutral-500 hover:border-neutral-400"
          }`}
        >
          {data.name}
        </button>

        {selected === code && (
          <div className="mt-2 mb-2 grid grid-cols-2 gap-2">
            {data.posts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="block relative aspect-[3/2] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
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
        )}
      </div>
    ))}
  </div>
</div>
</div>
      </main>
    </>
  );
}