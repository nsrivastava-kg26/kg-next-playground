"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { CtaBanner, Faq, Features, LogoCloud, Testimonials } from "../components/HomeSections";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <LogoCloud />
      <Features />
      <Testimonials />
      <Faq />
      <CtaBanner />
      <Footer />
    </>
  );
}
