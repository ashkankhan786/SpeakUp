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
    <nav className="w-screen grid grid-cols-3 items-center px-8 py-4 shadow-md relative">
      <div className="w-3 col-span-1">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="mix-blend-multiply absolute -top-2 left-3"
          onClick={() => router.push("/")}
        />
      </div>
      <div className="col-span-2 flex items-center gap-3 md:gap-16 lg:gap-40 ">
        <div className="flex items-center rounded-xl bg-neutral-200 w-full py-2 px-5 text-base gap-3">
          <BiSearch fill="#18181b" size={25} />
          <input
            type="text"
            placeholder="Search your organization"
            className="text-zinc-900 outline-0 w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
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
