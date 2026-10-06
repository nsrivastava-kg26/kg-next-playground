"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  return (
    <footer className="mt-24 border-t border-[#2e2a4a]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2">
        <div>
          <p className="font-semibold">Lumen</p>
          <p className="mt-3 text-sm text-[#a7a2cc]">Join 12K+ engineers getting our monthly note.</p>
          <div className="mt-4 flex gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-64 rounded-xl border border-[#3a3560] bg-transparent px-4 py-2"
            />
            <button
              onClick={() => setMsg(email.includes("@") ? "Thanks!" : "Invalid email")}
              className="rounded-full bg-[#8b6cf6] px-5"
            >
              Subscribe
            </button>
          </div>
          <p className="mt-2 text-sm">{msg}</p>
        </div>
        <div className="flex gap-10 text-sm text-[#a7a2cc]">
          <div className="flex flex-col gap-2">
            <a href="/pricing">Pricing</a>
            <a href="/demo">Book a demo</a>
          </div>
          <div className="flex flex-col gap-2">
            <a href="/blog">Blog</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="flex flex-col gap-2">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-[#6f6a96]">© Lumen Labs (fictional). Built by PixelRush.</p>
    </footer>
  );
}
