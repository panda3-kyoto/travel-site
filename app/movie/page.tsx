"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

// TMDBのIDをここに追加
const movieIds = [
  "21057", //海がきこえる
  "47002", //love letter
  "588182", //コンパートメントno.6
  "11104",    // 恋する惑星
  "25538",    // ヤンヤン
  "843", //in the mood for love
  "11220", //天使の涙
  "965150", //aftersun
  "76", //before sunrise
  "80", //before sunset
  "1362949", //場所はいつも
  "25657", //かもめ食堂
  "14784", //落下の王国
  "804", //ローマの休日
  "2767", //ポンヌフの恋人
  "149870", //風立ちぬ
  "736146", //ヤクザと家族
  "1188258", //18*2
  "1545264", //港のひかり
  "13", //forest gump
  "601", //E.T.
  "1328862", //ファーストキス
  "1275240", //ナミビアの砂漠
 "911430", //F1
 "416144", //ホテルムンバイ
 "882569", //コヴェナント
 "625", //キリングフィールド
 "433247", //最初に父が殺された
 "1361156", //今日の空
 "3638", //幸せのレシピ
 "20453", //3idiots
 "579974", //RRR
];

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(`/api/tmdb?ids=${movieIds.join(",")}`);
      const data = await res.json();
      setMovies(data.filter(Boolean));
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-8 py-8 md:px-12 md:py-10">
      <header className="mb-16 flex items-center justify-between">
        <h1 className="text-sm tracking-[0.12em] uppercase">Movie</h1>
        <Link href="/" className="text-sm text-neutral-500">Home</Link>
      </header>

      {loading ? (
        <p className="text-xs text-neutral-400 tracking-[0.1em]">Loading...</p>
      ) : (
        <section className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="block">
              <div className="aspect-[2/3] overflow-hidden bg-neutral-100">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-xs text-neutral-400">{movie.title}</p>
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs text-neutral-700 tracking-[0.04em]">{movie.title}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}