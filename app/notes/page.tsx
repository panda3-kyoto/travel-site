import Link from "next/link";
import { notes } from "../../data/notes";

export default function NotesPage() {
  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-8 py-8 md:px-12 md:py-10">
      <header className="mb-20 flex items-center justify-between">
        <Link href="/" className="text-sm tracking-[0.12em] uppercase">
          Travel Notes
        </Link>
      </header>

      <section className="max-w-2xl">
        <h1 className="text-3xl font-light tracking-[0.04em] mb-16">Notes</h1>
        <div className="space-y-12">
          {sorted.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="block group"
            >
              <p className="text-xs text-neutral-400 tracking-[0.08em] mb-2">
                {note.date}
              </p>
              <h2 className="text-lg font-light tracking-[0.03em] text-neutral-800 group-hover:opacity-60 transition">
                {note.title}
              </h2>
              <p className="mt-2 text-sm text-neutral-500 leading-7">
                {note.body[0]}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}