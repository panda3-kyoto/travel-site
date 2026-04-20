import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 px-8 py-8 md:px-12 md:py-10">
      <header className="mb-20 flex items-center justify-between">
        <Link href="/" className="text-sm tracking-[0.12em] uppercase">
          Travel Notes
        </Link>
      </header>

      <section className="max-w-2xl">
        {/* 写真プレースホルダー */}
        <div className="mb-12 w-48 h-48 overflow-hidden">
  <img
    src="/images/about/profile.jpeg"
    alt="Profile"
    className="w-full h-full object-cover"
  />
</div>

        <h1 className="text-3xl font-light tracking-[0.04em] mb-2">สมชาย</h1>
        <p className="text-sm text-neutral-400 tracking-[0.08em] mb-12">Somchai</p>

        <div className="space-y-6 text-sm leading-8 text-neutral-600">
          <p>旅する大学院生。バックパッカー旅が好き。
            </p>somchaiとはタイで「太郎」的に使われる名前で「男らしい」みたいな意味らしい。<p></p>
          <p>
            気の向くままに旅をして、気の向くままに写真を撮っている。
            このサイトは、そんな旅の記録。
          </p>
        </div>

        <div className="mt-16 space-y-4">
          <p className="text-xs text-neutral-400 tracking-[0.12em] uppercase mb-6">Gear</p>
          <div className="space-y-2 text-sm text-neutral-600">
            <p>Canon EOS Kiss X10</p>
            <p>iPhone 16</p>
          </div>
        </div>
      </section>
    </main>
  );
}