"use client";
import Image from "next/image";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
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
          <Button
            variant="outline"
            className="cursor-pointer bg-zinc-100 text-black hover:border-gray-300 hover:bg-zinc-50 transition ease-in"
            onClick={() => {
              if (status === "authenticated") {
                router.push("/dashboard");
              } else {
                signIn(undefined, { callbackUrl: "/dashboard" });
              }
            }}
          >
            Dashboard
          </Button>
          <Button
            variant="default"
            className=" cursor-pointer "
            onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
          >
            Log in
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
