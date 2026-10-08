import { NextResponse } from "next/server";

type Info = { title: string; author: string };

async function googleInfo(isbn: string): Promise<Info | null> {
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_BOOKS_KEY}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const info = data.items?.[0]?.volumeInfo;
    if (!info?.title) return null;
    return {
      title: info.title as string,
      author: (info.authors?.[0] ?? "") as string,
    };
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isbns = searchParams.get("isbns");
  if (!isbns) return NextResponse.json({ error: "No isbns" }, { status: 400 });

  const list = isbns.split(",");
  const res = await fetch(`https://api.openbd.jp/v1/get?isbn=${list.join(",")}`, {
    cache: "no-store",
  });
  const data = await res.json();

  const results = await Promise.all(
    list.map(async (isbn: string, i: number) => {
      const s = data?.[i]?.summary;
      if (s?.title) {
        return {
          isbn,
          title: s.title as string,
          author: ((s.author ?? "") as string).replace(/,?\s*\d{4}-?\s*$/, ""),
        };
      }
      // openBDに無ければ Google Books で探す
      const g = await googleInfo(isbn);
      if (g) return { isbn, ...g };
      return { isbn, error: "not found" };
    })
  );

  return NextResponse.json(results);
}