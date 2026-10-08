import Link from "next/link";

export const revalidate = 60;

type NoteItem = { id: string; title: string; date: string };

async function getNotes(): Promise<NoteItem[]> {
  const res = await fetch(
    `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: { property: "Published", checkbox: { equals: true } },
        sorts: [{ property: "Date", direction: "descending" }],
        page_size: 100,
      }),
    }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.results.map((p: any) => {
    const titleProp = Object.values(p.properties).find((v: any) => v.type === "title") as any;
    return {
      id: p.id,
      title: titleProp?.title?.map((t: any) => t.plain_text).join("") ?? "",
      date: p.properties.Date?.date?.start ?? "",
    };
  });
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-8 py-8 md:px-12 md:py-10">
      <header className="mb-20 flex items-center justify-between">
        <Link href="/" className="text-sm tracking-[0.12em] uppercase">
          Travel Notes
        </Link>
      </header>

      <section className="max-w-2xl">
        <h1 className="text-3xl font-light tracking-[0.04em] mb-16">雑記</h1>
        <div className="space-y-12">
          {notes.map((note) => (
            <Link key={note.id} href={`/notes/${note.id}`} className="block group">
              <p className="text-xs text-neutral-400 tracking-[0.08em] mb-2">{note.date}</p>
              <h2 className="text-lg font-light tracking-[0.03em] text-neutral-800 group-hover:opacity-60 transition">
                {note.title}
              </h2>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}