import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../../../../../data/posts";

type Props = {
  params: Promise<{ slug: string; item: string }>;
};

export function generateStaticParams() {
  return posts.flatMap((post) =>
    post.information.map((entry) => ({
      slug: post.slug,
      item: entry.slug,
    }))
  );
}

export default async function InformationItemPage({ params }: Props) {
  const { slug, item } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return notFound();
  const infoItem = post.information.find((entry) => entry.slug === item);
  if (!infoItem) return notFound();
  return (
    <main className="min-h-screen bg-white text-neutral-900 px-8 py-8 md:px-12 md:py-10">
      <header className="mb-12 flex items-center justify-between">
        <Link href={`/posts/${post.slug}/information`} className="text-sm tracking-[0.12em] uppercase">
          Information
        </Link>
        <Link href="/" className="text-sm text-neutral-500">
          Home
        </Link>
      </header>
      <article className="mx-auto max-w-5xl">
        <img src={infoItem.image} alt={infoItem.alt} className="block w-full h-auto" />
        <div className="mt-10 max-w-2xl">
          <p className="text-sm text-neutral-400">
            {post.title} / {infoItem.category}
          </p>
          <h1 className="mt-2 text-2xl font-light tracking-[0.03em]">{infoItem.title}</h1>
          <p className="mt-5 text-sm leading-8 text-neutral-600">{infoItem.note}</p>
        </div>
      </article>
    </main>
  );
}