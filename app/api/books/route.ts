import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isbns = searchParams.get("isbns");
  if (!isbns) return NextResponse.json({ error: "No isbns" }, { status: 400 });

  const results = await Promise.all(
    isbns.split(",").map(async (isbn) => {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      const info = data.items?.[0]?.volumeInfo;
      if (!info) return null;
      return {
        isbn,
        title: info.title as string,
        author: (info.authors?.[0] ?? "") as string,
        cover: (info.imageLinks?.thumbnail ?? "").replace("http://", "https://"),
      };
    })
  );

  return NextResponse.json(results.filter(Boolean));
}