import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of service",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <h1>Terms of service</h1>
      <p>Placeholder copy for a fictional company. Replace with your real terms before launch.</p>
      <h2>Use of the service</h2>
      <p>Lumen is a reference codebase. Nothing here is a real offer of service.</p>
    </>
  );
}
