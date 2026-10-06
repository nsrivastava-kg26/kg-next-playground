"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";

export default function Contact() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-24">
        <h1 className="text-5xl font-semibold">Talk to a human</h1>
        <div className="mt-10 rounded-2xl border border-[#2e2a4a] bg-[#1d1a2e] p-8">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
