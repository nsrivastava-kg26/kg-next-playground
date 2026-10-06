"use client";

import { useState } from "react";

export default function ContactForm({ demo }: { demo?: boolean }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email.includes("@")) return setError("Bad email");
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ ...form, topic: demo ? "demo" : "sales" }),
    });
    if (res.ok) setSent(true);
  }

  if (sent) return <p className="py-10 text-center text-lg">Thanks! We will be in touch.</p>;

  const input = "w-full rounded-xl border border-[#3a3560] bg-[#14121f] px-4 py-3 text-sm";
  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <input placeholder="Name" className={input} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Work email" className={input} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Company" className={input} onChange={(e) => setForm({ ...form, company: e.target.value })} />
      <textarea placeholder="Message" className={input + " min-h-32"} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      {error && <p style={{ color: "#ff8a7a" }}>{error}</p>}
      <button className="rounded-full bg-[#8b6cf6] py-3 font-medium">{demo ? "Request demo" : "Send message"}</button>
    </form>
  );
}
