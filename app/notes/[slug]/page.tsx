import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

const headers = {
  Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
  "Notion-Version": "2022-06-28",
};

async function getPage(id: string) {
  const res = await fetch(`https://api.notion.com/v1/pages/${id}`, { headers });
  if (!res.ok) return null;
  const p = await res.json();
  if (!p.properties?.Published?.checkbox) return null; // 非公開は出さない
  const titleProp = Object.values(p.properties).find((v: any) => v.type === "title") as any;
  return {
    title: titleProp?.title?.map((t: any) => t.plain_text).join("") ?? "",
    date: p.properties.Date?.date?.start ?? "",
  };
}

async function getBlocks(id: string) {
  const res = await fetch(`https://api.notion.com/v1/blocks/${id}/children?page_size=100`, { headers });
  if (!res.ok) return [];
  const data = await res.json();
  return data.results as any[];
}

const text = (b: any) =>
  (b[b.type]?.rich_text ?? []).map((t: any) => t.plain_text).join("");

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return notFound();
  const blocks = await getBlocks(slug);

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-8 py-8 md:px-12 md:py-10">
      <header className="mb-20 flex items-center justify-between">
        <Link href="/notes" className="text-sm tracking-[0.12em] uppercase">
          Notes
        </Link>
        <Link href="/" className="text-sm text-neutral-500">
          Home
        </Link>
      </header>

      <article className="max-w-2xl">
        <p className="text-xs text-neutral-400 tracking-[0.08em] mb-4">{page.date}</p>
        <h1 className="text-3xl font-light tracking-[0.04em] mb-12">{page.title}</h1>

        <div className="space-y-6 text-sm leading-8 text-neutral-600">
          {blocks.map((b) => {
            if (b.type === "paragraph") {
              const t = text(b);
              return t ? <p key={b.id}>{t}</p> : <div key={b.id} className="h-6" />;
            }
            if (b.type === "heading_1" || b.type === "heading_2" || b.type === "heading_3") {
              return (
                <h2 key={b.id} className="pt-4 text-lg font-light text-neutral-800">
                  {text(b)}
                </h2>
              );
            }
            if (b.type === "divider") return <hr key={b.id} className="border-neutral-200" />;
            return null;
          })}
        </div>
      </article>
    </main>
  );
}