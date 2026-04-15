import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, type PhotoItem } from "../../../data/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function getWidthClass(size: PhotoItem["size"]) {
  if (size === "small") return "w-[55%]";
  if (size === "medium") return "w-[78%]";
  return "w-full";
}

function getAlignClass(index: number) {
  return index % 2 === 0 ? "ml-0" : "ml-auto";
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return notFound();
  return (
    <main className="min-h-screen bg-white text-neutral-900 px-8 py-8 md:px-12 md:py-10">
      <header className="mb-20 flex items-center justify-between">
        <Link href="/" className="text-sm tracking-[0.12em] uppercase">
          Travel Notes
        </Link>
        <Link href="/posts" className="text-sm text-neutral-500">
          Index
        </Link>
      </header>
      <section className="mb-24 max-w-2xl">
        <p className="mb-3 text-sm text-neutral-400">{post.country}</p>
        <h1 className="text-3xl font-light tracking-wide md:text-4xl">
          {post.title}
        </h1>
        <div className="mt-8 space-y-4 text-sm leading-8 text-neutral-600">
          {post.intro.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href={`/posts/${post.slug}/information`}
            className="text-sm tracking-[0.14em] uppercase text-neutral-300 transition hover:text-neutral-500"
          >
            Information
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-6xl columns-1 gap-x-16 md:columns-2">
        {post.photos.map((photo, index) => (
          <div key={photo.slug} className="mb-16 break-inside-avoid">
            <div className={`${getWidthClass(photo.size)} ${getAlignClass(index)}`}>
              <Link href={`/photos/${post.slug}/${photo.slug}`} className="group block">
                <div className="translate-y-0 transition duration-700 ease-in-out group-hover:-translate-y-1">
                  <img
                    src={photo.image}
                    alt={photo.alt}
                    className="block h-auto w-full transition duration-700 group-hover:opacity-95"
                    loading="lazy"
                  />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}