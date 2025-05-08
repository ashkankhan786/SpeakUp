"use client";
import Image from "next/image";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
function Navbar({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();
  return (
    <nav className="w-screen px-8 py-4 shadow-md relative flex items-center justify-between">
      <div className="w-3">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="mix-blend-multiply absolute -top-2 left-3"
          onClick={() => router.push("/")}
        />
      </div>
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center justify-center gap-3">
          <button
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-zinc-800 transition cursor-pointer text-nowrap"
            onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
          >
            Log in
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-zinc-800 transition cursor-pointer text-nowrap">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
