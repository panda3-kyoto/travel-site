import Link from "next/link";
import { notFound } from "next/navigation";

const seasons = [
  { slug: "spring", label: "Spring", labelJa: "春", color: "#c9a0a0", bg: "#fdf6f0" },
  { slug: "summer", label: "Summer", labelJa: "夏", color: "#6a9a7a", bg: "#f0f5f0" },
  { slug: "autumn", label: "Autumn", labelJa: "秋", color: "#c07840", bg: "#fdf0e8" },
  { slug: "winter", label: "Winter", labelJa: "冬", color: "#7090a0", bg: "#f0f4f8" },
];

type Props = {
  params: Promise<{ season: string }>;
};

export function generateStaticParams() {
  return seasons.map((s) => ({ season: s.slug }));
}

export default async function KyotoSeasonPage({ params }: Props) {
  const { season } = await params;
  const seasonData = seasons.find((s) => s.slug === season);
  if (!seasonData) return notFound();

  return (
    <main
      className="min-h-screen px-8 py-8 md:px-12 md:py-10"
      style={{ backgroundColor: seasonData.bg }}
    >
      <header className="mb-20 flex items-center justify-between">
        <Link
          href="/posts/kyoto"
          className="text-sm tracking-[0.12em] uppercase"
          style={{ color: seasonData.color }}
        >
          Kyoto
        </Link>
        <Link href="/" className="text-sm" style={{ color: seasonData.color, opacity: 0.6 }}>
          Home
        </Link>
      </header>

      <section className="max-w-2xl">
        <p className="text-sm mb-3" style={{ color: seasonData.color, opacity: 0.7 }}>
          Kyoto / Japan
        </p>
        <h1
          className="text-3xl font-light tracking-[0.04em] md:text-4xl"
          style={{ color: seasonData.color }}
        >
          {seasonData.label}
          <span className="ml-4 text-lg opacity-60">{seasonData.labelJa}</span>
        </h1>
      </section>

      <section className="mt-16 mx-auto max-w-6xl columns-1 gap-x-16 md:columns-2">
        <p className="text-sm" style={{ color: seasonData.color, opacity: 0.5 }}>
          写真は準備中です。
        </p>
      </section>
    </main>
  );
}