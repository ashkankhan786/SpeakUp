"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <>
      <section className="flex flex-col md:flex-row items-center px-7 justify-center gap-10 md:gap-0 pb-5 pt-4">
        <div className="flex flex-col items-center justify-center text-center  lg:px-8 md:px-0 px-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mt-20 tracking-tighter lg:tracking-tight">
            SPEAK UP, STAY SAFE.
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-700 max-w-2xl">
            Empowering individuals to report incidents anonymously and protect
            the dignity within organizations.
          </p>
          <div className="mt-8 flex gap-6 md:hidden">
            <Link href="/create-organization">
              <button className="px-6 py-3 bg-black text-white rounded-lg text-base hover:bg-zinc-800 transition">
                Create Organization
              </button>
            </Link>
            <Link href="/find-organization">
              <button className="px-6 py-3 border border-black text-black rounded-lg text-base hover:bg-zinc-900 hover:text-white transition">
                Find Your Organization
              </button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <Image
            src="/girl-mail.png"
            alt="Girl Avatar"
            width={300}
            height={500}
            className=""
          />
        </div>
      </section>
      <div className="w-screen mt-14 md:flex gap-6 hidden items-center justify-center">
        <Link href="/create-organization">
          <button className="px-6 py-3 bg-black text-white rounded-lg text-lg hover:bg-zinc-800 transition">
            Create Organization
          </button>
        </Link>
        <Link href="/find-organization">
          <button className="px-6 py-3 border border-black text-black rounded-lg text-lg hover:bg-zinc-900 hover:text-white transition">
            Find Your Organization
          </button>
        </Link>
      </div>
    </>
  );
}

export default Hero;
