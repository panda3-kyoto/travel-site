import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");
  if (!ids) return NextResponse.json({ error: "No ids" }, { status: 400 });

  const res = await fetch(
    `https://itunes.apple.com/lookup?id=${ids}&country=jp`,
    { cache: "no-store" }
  );
  const data = await res.json();

  const albums = (data.results ?? [])
    .filter((r: any) => r.collectionId && r.artworkUrl100)
    .map((r: any) => ({
      id: r.collectionId,
      name: r.collectionName as string,
      artist: r.artistName as string,
      cover: (r.artworkUrl100 as string).replace("100x100", "600x600"),
      url: r.collectionViewUrl as string,
    }));

  return NextResponse.json(albums);
}