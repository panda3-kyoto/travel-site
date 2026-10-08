"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Book = {
  isbn: string;
  title: string;
  author: string;
};

// ISBN-13(ハイフンなし)をここに追加
const isbns: string[] = [
  "9784062749046",
  "9784062749053", // ダンス
  "9784062002417",
  "9784022607744", // インド
  "9784101235295",
  "9784101235301", // 深夜
  "9784048726306",
  "9784048727150", // 尾崎
  "9784167667023",
  "9784103834120", // ばなな
  "9784904855027", // ハンガン
  "9784093886444", // タヒ
];

export default function BookPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      if (isbns.length === 0) {
        setLoading(false);
        return;
      }
      const res = await fetch(`/api/books?isbns=${isbns.join(",")}`);
      const data = await res.json();
      setBooks(Array.isArray(data) ? data.filter((b: any) => !b.error) : []);
      setLoading(false);
    };
    fetchBooks();
  }, []);

  // 著者ごとにまとめる（最初に出てきた順）
  const groups: { author: string; books: Book[] }[] = [];
  for (const book of books) {
    const author = book.author.replace(/,/g, " ").trim() || "—";
    let g = groups.find((x) => x.author === author);
    if (!g) {
      g = { author, books: [] };
      groups.push(g);
    }
    g.books.push(book);
  }
groups.sort((a, b) => a.author.localeCompare(b.author, "ja"));
  return (
    <main className="min-h-screen bg-white text-neutral-900 px-8 py-8 md:px-12 md:py-10">
      <header className="mb-16 flex items-center justify-between">
        <h1 className="text-sm tracking-[0.12em] uppercase">Book</h1>
        <Link href="/" className="text-sm text-neutral-500">Home</Link>
      </header>

      {loading ? (
        <p className="text-xs text-neutral-400 tracking-[0.1em]">Loading...</p>
      ) : (
        <section className="max-w-2xl space-y-14">
          {groups.map((g) => (
            <div key={g.author}>
              <h2
                className="text-xs tracking-[0.2em] text-neutral-400 mb-5"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {g.author}
              </h2>
              <ul className="space-y-3">
                {g.books.map((book) => (
                  <li key={book.isbn}>
                    <a
                      href={`https://www.amazon.co.jp/s?k=${book.isbn}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-light tracking-[0.04em] text-neutral-800 transition hover:opacity-60"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {book.title.replace(/\.\s*/g, " ")}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}