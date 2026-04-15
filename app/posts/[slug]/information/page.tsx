import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, type InfoItem } from "../../../../data/posts";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function getWidthClass(size: InfoItem["size"]) {
  if (size === "small") return "w-[55%]";
  if (size === "medium") return "w-[78%]";
  return "w-full";
}

function getAlignClass(index: number) {
  return index % 2 === 0 ? "ml-0" : "ml-auto";
}

export default function InformationPage({ params }: Props) {
  const { slug } = params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-8 py-8 md:px-12 md:py-10">
      <header className="mb-20 flex items-center justify-between">
        <Link href={`/posts/${post.slug}`} className="text-sm tracking-[0.12em] uppercase">
          {post.title}
        </Link>
        <Link href="/" className="text-sm text-neutral-500">
          Home
        </Link>
      </header>

      <section className="mb-24 max-w-2xl">
        <p className="mb-3 text-sm text-neutral-400">{post.country}</p>
        <h1 className="text-3xl font-light tracking-[0.04em] md:text-4xl">
          Information
        </h1>

        <div className="mt-8 space-y-4 text-sm leading-8 text-neutral-600">
          <p>Restaurants, cafés, shops, and fragments of the city worth keeping.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl columns-1 gap-x-16 md:columns-2">
        {post.information.map((item, index) => (
          <div key={item.slug} className="mb-16 break-inside-avoid">
            <div className={`${getWidthClass(item.size)} ${getAlignClass(index)}`}>
              <Link
                href={`/posts/${post.slug}/information/${item.slug}`}
                className="group block"
              >
                <div className="translate-y-0 transition duration-700 ease-in-out group-hover:-translate-y-1">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="block h-auto w-full transition duration-700 group-hover:opacity-95"
                    loading="lazy"
                  />
                </div>

                <div className="mt-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-neutral-400">
                    {item.category}
                  </p>
                  <p className="mt-1 text-sm text-neutral-700">{item.title}</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}