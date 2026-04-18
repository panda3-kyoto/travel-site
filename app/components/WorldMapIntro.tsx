"use client";

import { useEffect, useState } from "react";
import { Plane } from "lucide-react";

export default function WorldMapIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"globe" | "plane" | "text" | "done">("globe");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("plane"), 50);
    const t2 = setTimeout(() => setPhase("text"), 3500);
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 5500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      style={{
        opacity: phase === "done" ? 0 : 1,
        transition: phase === "done" ? "opacity 0.8s ease-in-out" : "none",
        pointerEvents: phase === "done" ? "none" : "all",
      }}
    >
      {/* 地球 */}
      <div
        style={{
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          overflow: "hidden",
          opacity: 0.6,
        }}
      >
        <img
          src="/images/earth.jpeg"
          alt="Earth"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* 飛行機 */}
      <div
        style={{
          position: "absolute",
          top: "calc(50% - 16px)",
          left: phase === "plane" || phase === "text"
            ? "calc(100% + 60px)"
            : "calc(0% - 60px)",
          transition: phase === "plane"
            ? "left 5s cubic-bezier(0.3, 0, 0.2, 1)"
            : "none",
        }}
      >
        <Plane
          size={28}
          color="#333333"
          strokeWidth={1}
          style={{ opacity: 0.5, transform: "rotate(45deg)" }}
        />
      </div>

      {/* テキスト */}
      <div
  style={{
    position: "absolute",
    bottom: "28%",
    left: "50%",
    transform: "translateX(-50%)",
    opacity: phase === "text" ? 1 : 0,
    transition: "opacity 1s ease-in-out",
    textAlign: "center",
    whiteSpace: "nowrap",
  }}
>
  <p style={{
    color: "#aaaaaa",
    letterSpacing: "0.4em",
    fontSize: "14px",
    textTransform: "uppercase",
    fontFamily: "var(--font-serif)",
  }}>
    World Map
  </p>
</div>
    </div>
  );
}