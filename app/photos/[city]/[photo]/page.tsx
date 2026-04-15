import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../../../../data/posts";

type Props = {
  params: { city: string; photo: string };
};

export function generateStaticParams() {
  return posts.flatMap((post) =>
    post.photos.map((item) => ({
      city: post.slug,
      photo: item.slug,
    }))
  );
}

export default function PhotoPage({ params }: Props) {
  const { city, photo } = params;

  const cityData = posts.find((p) => p.slug === city);
  if (!cityData) return notFound();

  const photoData = cityData.photos.find((item) => item.slug === photo);
  if (!photoData) return notFound();

  const [title, ...body] = photoData.note;

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-8 py-8 md:px-12 md:py-10">
      <header className="mb-12 flex items-center justify-between">
        <Link href={`/posts/${cityData.slug}`} className="text-sm tracking-[0.12em] uppercase">
          {cityData.title}
        </Link>
        <Link href="/" className="text-sm text-neutral-500">
          Home
        </Link>
      </header>

      <article className="mx-auto max-w-5xl">
        <img
          src={photoData.image}
          alt={photoData.alt}
          className="block w-full h-auto"
        />

        <div className="mt-10 max-w-2xl">
          <p className="text-sm text-neutral-400">
            {cityData.title} / {cityData.country}
          </p>

          <h1 className="mt-2 text-lg tracking-[0.03em] text-neutral-800">
            {title}
          </h1>

          <div className="mt-4 space-y-3 text-sm leading-8 text-neutral-600">
            {body.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}