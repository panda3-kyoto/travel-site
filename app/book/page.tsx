"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Book = {
  isbn: string;
  title: string;
  author: string;
  cover: string;
};

// ISBN-13(ハイフンなし)をここに追加
const isbns: string[] = [
  // "978-4-06-274904-69784101001012",
  "9784062749046",
  "9784062749053", //ダンス
  "9784062002417",
  "9784022607744",//インド
  "9784101235295",
  "9784101235301",//深夜
  "9784048726306",
  "9784048727150",//尾崎
  "9784167667023",
  "9784103834120",//ばなな
  "9784904855027",//ハンガン
  "9784093886444"//タヒ
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
      setBooks(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchBooks();
  }, []);

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-8 py-8 md:px-12 md:py-10">
      <header className="mb-16 flex items-center justify-between">
        <h1 className="text-sm tracking-[0.12em] uppercase">Book</h1>
        <Link href="/" className="text-sm text-neutral-500">Home</Link>
      </header>

      {loading ? (
        <p className="text-xs text-neutral-400 tracking-[0.1em]">Loading...</p>
      ) : (
        <section className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {books.map((book) => (
            <div key={book.isbn}>
              <div className="aspect-[2/3] overflow-hidden bg-neutral-100">
                {book.cover ? (
                  <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-2">
                    <p className="text-xs text-neutral-400 text-center">{book.title}</p>
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs text-neutral-700 tracking-[0.04em]">{book.title}</p>
              <p className="mt-1 text-xs text-neutral-400">{book.author}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}