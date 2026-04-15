import Link from "next/link";
import { posts } from "../../data/posts";

export default function PostsPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 px-8 py-8 md:px-12 md:py-10">
      <header className="mb-20 flex items-center justify-between">
        <Link href="/" className="text-sm tracking-[0.12em] uppercase">
          Travel Notes
        </Link>
        <p className="text-sm text-neutral-500">Index</p>
      </header>

      <section className="max-w-3xl">
        <h1 className="mb-10 text-3xl font-light tracking-[0.04em] md:text-4xl">
          Posts
        </h1>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block border-b border-neutral-200 pb-4 transition hover:opacity-70"
            >
              <p className="text-sm text-neutral-400">{post.country}</p>
              <h2 className="mt-1 text-lg text-neutral-800">{post.title}</h2>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}