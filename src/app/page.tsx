"use client";
import Image from "next/image";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Working from "./_components/Working";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-100 text-[#F1f5f9]">
      <Navbar />
      <Hero />
      <Working />
      <Footer />
    </div>
  );
}
