import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function Navbar() {
  const router = useRouter();
  return (
    <div className="flex justify-end items-center mb-8 relative border-b-2 shadow-sm py-4 p-4 px-5 md:px-8 lg:px-8 ">
      <Image
        src="/logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="mix-blend-multiply absolute -top-3 left-3"
        onClick={() => router.push("/")}
      />
      <div className="space-x-2">
        <Button onClick={() => router.push("/create-organization")}>
          Create Organization
        </Button>
        <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
