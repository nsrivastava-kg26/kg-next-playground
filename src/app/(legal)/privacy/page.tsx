import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy policy</h1>
      <p>Placeholder copy for a fictional company. Replace with your real policy before launch.</p>
      <h2>What we collect</h2>
      <p>Contact form submissions and newsletter sign-ups, used only to reply to you.</p>
      <h2>Cookies</h2>
      <p>
        One first-party cookie assigns an A/B test bucket for the home page. No third-party
        trackers.
      </p>
    </>
  );
}
