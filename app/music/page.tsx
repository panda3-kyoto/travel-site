"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Album = {
  id: string;
  name: string;
  artists: { name: string }[];
  images: { url: string }[];
  external_urls: { spotify: string };
};

const spotifyUrls = [
  "https://open.spotify.com/album/1WIYarY06JKV0xnH5wfSCK?si=UK9M7ppCTWiV-NkkOq6K6Q",
  "https://open.spotify.com/album/09vb3SEUS4LSx8sh8TKAxg?si=G4IyvawmR0KcjhEVEWF5SA",
  "https://open.spotify.com/album/6kxevwJ9SBDfAsoiZ5MT6n?si=3UfxMskFTpKrFEkCTa1KFA",
  "https://open.spotify.com/album/4d0nnBfxKBJt3evaV4Yssh?si=zBHICygZT-Wv6AnaoQFRHg",
  "https://open.spotify.com/album/0jnjGWmIJYFxCXmyFM9reQ?si=HzQjlae0StqtunCpBRe2_Q",
  "https://open.spotify.com/album/3wLMnrlPtVSADxalu9kIxK?si=tqj1B6T-Q7me8qK3uXqtZA",
];

const albumIds = spotifyUrls.map((url) => url.split("/album/")[1].split("?")[0]);

export default function MusicPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      const chunks: string[][] = [];
      for (let i = 0; i < albumIds.length; i += 20) {
        chunks.push(albumIds.slice(i, i + 20));
      }

      const allAlbums: Album[] = [];
      for (const chunk of chunks) {
        const res = await fetch(`/api/spotify?ids=${chunk.join(",")}`);
        const data = await res.json();
        if (data.albums) {
          allAlbums.push(...data.albums.filter(Boolean));
        }
      }

      setAlbums(allAlbums);
      setLoading(false);
    };

    fetchAlbums();
  }, []);

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-8 py-8 md:px-12 md:py-10">
      <header className="mb-16 flex items-center justify-between">
        <h1 className="text-sm tracking-[0.12em] uppercase">Music</h1>
        <Link href="/" className="text-sm text-neutral-500">Home</Link>
      </header>

      {loading ? (
        <p className="text-xs text-neutral-400 tracking-[0.1em]">Loading...</p>
      ) : (
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {albums.map((album) => (
            <a
              key={album.id}
              href={album.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={album.images[0]?.url}
                  alt={album.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:opacity-80"
                />
              </div>
              <div className="mt-3">
                <p className="text-xs text-neutral-700 tracking-[0.04em]">{album.name}</p>
                <p className="mt-1 text-xs text-neutral-400">{album.artists[0]?.name}</p>
              </div>
            </a>
          ))}
        </section>
      )}
    </main>
  );
}