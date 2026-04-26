"use client";

import Link from "next/link";
import { useState } from "react";
import { posts } from "../data/posts";

const groupedByCountry = posts.reduce((acc, post) => {
  if (!acc[post.country]) {
    acc[post.country] = [];
  }
  acc[post.country].push(post);
  return acc;
}, {} as Record<string, typeof posts>);

const sortedCountries = Object.keys(groupedByCountry).sort();

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-8 bg-white">
        <button
          onClick={() => setOpen(true)}
          className="flex flex-col gap-1.5 group"
        >
          <span className="block w-5 h-px bg-neutral-900 transition group-hover:opacity-60" />
          <span className="block w-5 h-px bg-neutral-900 transition group-hover:opacity-60" />
          <span className="block w-5 h-px bg-neutral-900 transition group-hover:opacity-60" />
        </button>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-8 py-8">
          <button
            onClick={() => setOpen(false)}
            className="flex flex-col gap-1.5 group mb-12"
          >
            <span className="block w-5 h-px bg-neutral-900 transition group-hover:opacity-60" />
            <span className="block w-5 h-px bg-neutral-900 transition group-hover:opacity-60" />
            <span className="block w-5 h-px bg-neutral-900 transition group-hover:opacity-60" />
          </button>

          <nav className="space-y-8">
            <div>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.12em] uppercase text-neutral-900 hover:opacity-60 transition"
              >
                Home
              </Link>
            </div>

            <div>
              <Link
                href="/world-map"
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.12em] uppercase text-neutral-900 hover:opacity-60 transition"
              >
                World Map
              </Link>
            </div>

            <div>
              <Link
                href="/random"
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.12em] uppercase text-neutral-900 hover:opacity-60 transition"
              >
                Random
              </Link>
            </div>

            <div>
              <Link
                href="/themes"
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.12em] uppercase text-neutral-900 hover:opacity-60 transition"
              >
                Themes
              </Link>
            </div>

            <div>
              <Link
                href="/notes"
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.12em] uppercase text-neutral-900 hover:opacity-60 transition"
              >
                Notes
              </Link>
            </div>

            <div>
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.12em] uppercase text-neutral-900 hover:opacity-60 transition"
              >
                About
              </Link>
            </div>

            <div>
              <p className="text-xs text-neutral-400 tracking-[0.12em] uppercase mb-4">
                Index
              </p>
              <div className="space-y-3">
                {sortedCountries.map((country) => {
                  const countryPosts = groupedByCountry[country];
                  return (
                    <div key={country}>
                      <button
                        onClick={() => {
                          setOpen(false);
                          window.location.href = `/country/${countryPosts[0].countryCode.toLowerCase()}`;
                        }}
                        className="flex items-center justify-between w-full text-sm text-neutral-700 hover:text-neutral-900 transition"
                      >
                        <span>{country}</span>
                      </button>
                      {expandedCountry === country && (
                        <div className="mt-2 ml-3 space-y-2">
                          {countryPosts.map((post) => (
                            <Link
                              key={post.slug}
                              href={`/posts/${post.slug}`}
                              onClick={() => setOpen(false)}
                              className="block text-xs text-neutral-500 hover:text-neutral-900 transition"
                            >
                              {post.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}