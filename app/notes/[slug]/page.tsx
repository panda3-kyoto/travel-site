import Link from "next/link";
import { notFound } from "next/navigation";
import { notes } from "../../../data/notes";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  if (!note) return notFound();

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
        <p className="text-xs text-neutral-400 tracking-[0.08em] mb-4">
          {note.date}
        </p>
        <h1 className="text-3xl font-light tracking-[0.04em] mb-12">
          {note.title}
        </h1>

        {note.image && (
          <img
            src={note.image}
            alt={note.title}
            className="w-full h-auto mb-12"
          />
        )}

        <div className="space-y-6 text-sm leading-8 text-neutral-600">
          {note.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}