import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");

  if (!ids) return NextResponse.json({ error: "No ids" }, { status: 400 });

  const apiKey = process.env.TMDB_API_KEY;

  const results = await Promise.all(
    ids.split(",").map(async (id) => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ja-JP`,
        { cache: "no-store" }
      );
      return res.json();
    })
  );

  return NextResponse.json(results);
}