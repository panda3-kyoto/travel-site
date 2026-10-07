"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Album = {
  id: number;
  name: string;
  artist: string;
  cover: string;
  url: string;
};

// Apple MusicのアルバムURLをここに貼る
const appleMusicUrls: string[] = [
  // "https://music.apple.com/jp/album/blonde/1146195596",
  "https://music.apple.com/jp/album/yosuga-hitorideni/1566127850",
  "https://music.apple.com/jp/album/%E3%82%86%E3%82%81/805520623",
  "https://music.apple.com/jp/album/yolk-on-rice/1849610704",
  "https://music.apple.com/jp/album/%E6%99%82%E9%96%93%E7%9A%84%E7%94%A2%E7%89%A9/1403702902",
  "https://music.apple.com/jp/album/museum-of-my-mess/1751466462",
  "https://music.apple.com/jp/album/tokyo-remastered/1441622154",
  "https://music.apple.com/jp/album/watashi/1891672402",
  "https://music.apple.com/jp/album/the-essential-mamalaid-rag/1535512359",
  "https://music.apple.com/jp/album/debussy-clair-de-lune-recital-pieces-vol-1/1245076800",
  "https://music.apple.com/jp/album/ballads/1440747672",
  "https://music.apple.com/jp/album/indigo-chiheisen/1440746376",
  "https://music.apple.com/jp/album/license/379222283",
  "https://music.apple.com/jp/album/%E6%99%82%E4%BB%A3%E3%81%AF%E5%83%95%E3%82%89%E3%81%AB%E9%9B%A8%E3%82%92%E9%99%8D%E3%82%89%E3%81%97%E3%81%A6%E3%82%8B/379194345",
  "https://music.apple.com/jp/album/%E5%8D%81%E4%B8%83%E6%AD%B3%E3%81%AE%E5%9C%B0%E5%9B%B3/1537557575",
  "https://music.apple.com/jp/album/%E6%98%A0%E5%B8%B6%E3%81%99%E3%82%8B%E7%85%99/1660688950",
  "https://music.apple.com/jp/album/%E8%8A%B1%E8%90%BD%E7%9F%A5%E5%A4%9A%E5%B0%91/6773237682",
  "https://music.apple.com/jp/album/my-favorite-things/1768132762",
  "https://music.apple.com/jp/album/kind-of-love/1374960897",
  "https://music.apple.com/jp/album/shhh-its-under-my-bed/1771608912",
  "https://music.apple.com/jp/album/1996/926730741",
  "https://music.apple.com/jp/album/waltz-for-debby-remastered-live/1440747830",
  "https://music.apple.com/jp/album/fant%C3%B4me/1428766398",
  "https://music.apple.com/jp/album/the-14th-moon-jyuyon-banme-no-tsuki/1436012327",
  "https://music.apple.com/jp/album/cobalt-hour/1436010473",
  "https://music.apple.com/jp/album/wine-no-nioi/720533227",
  "https://music.apple.com/jp/album/%E6%B5%B7%E3%81%8C%E3%81%8D%E3%81%93%E3%81%88%E3%82%8B-%E3%82%B5%E3%82%A6%E3%83%B3%E3%83%89%E3%83%88%E3%83%A9%E3%83%83%E3%82%AF/667817326",
  "https://music.apple.com/jp/album/indigo-chiheisen/1440746376",
  "https://music.apple.com/jp/album/%E3%82%A2%E3%83%AA%E3%82%B9%E3%81%A8%E3%83%86%E3%83%AC%E3%82%B9/1046570023",
  "https://music.apple.com/jp/album/prema/1819419299",
  "https://music.apple.com/jp/album/quit-quietly/1830256521",
  "https://music.apple.com/jp/album/nekoto-allergie/1440797361",
  "https://music.apple.com/jp/album/ruby-pop/1779727929",
  "https://music.apple.com/jp/album/rush/1659658389",
  "https://music.apple.com/jp/album/the-land-is-inhospitable-and-so-are-we/1697335341",
  "https://music.apple.com/jp/album/bewitched/1690607869",
  "https://music.apple.com/jp/album/imamo-wasureranneyo-disc-1/1719234480",
  "https://music.apple.com/jp/album/kishou-tenketsu-ii/212270979",
  "https://music.apple.com/jp/album/sand-castle/1537258994",
  ""


];

const albumIds = appleMusicUrls.map((u) => u.split("/").pop()!.split("?")[0]);

export default function MusicPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      if (albumIds.length === 0) {
        setLoading(false);
        return;
      }
      const res = await fetch(`/api/music?ids=${albumIds.join(",")}`);
      const data = await res.json();
      setAlbums(Array.isArray(data) ? data : []);
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
        <section className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {albums.map((album) => (
            <a
              key={album.id}
              href={album.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="aspect-square overflow-hidden bg-neutral-100">
                <img
                  src={album.cover}
                  alt={album.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:opacity-80"
                />
              </div>
              <p className="mt-2 text-xs text-neutral-700 tracking-[0.04em]">{album.name}</p>
              <p className="mt-1 text-xs text-neutral-400">{album.artist}</p>
            </a>
          ))}
        </section>
      )}
    </main>
  );
}