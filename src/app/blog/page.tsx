"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then(setPosts);
  }, []);
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-24">
        <h1 className="text-center text-5xl font-semibold">Notes from the trace view</h1>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={"/blog/" + p.slug} className="rounded-2xl border border-[#2e2a4a] bg-[#1d1a2e] p-6">
              <p className="text-xs text-[#6f6a96]">{new Date(p.date).toLocaleDateString()}</p>
              <h2 className="mt-2 text-lg font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm text-[#a7a2cc]">{p.description}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
