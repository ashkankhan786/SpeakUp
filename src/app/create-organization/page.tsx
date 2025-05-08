"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "convex/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { api } from "../../../convex/_generated/api";

function page() {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [accessCode, setAccessCode] = useState<string>("");

  const router = useRouter();

  const createOrganization = useMutation(api.organizations.createOrganization);
  const createOrganizationMembership = useMutation(
    api.organization_membership.createOrganizationMembership
  );
  const { data: session, status } = useSession();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !type.trim()) {
      toast.error("Organization name and type are required.");
      return;
    }
    createOrganization({
      title: name,
      type: type,
      accessCode: accessCode,
    })
      .then((organizationId) => {
        createOrganizationMembership({
          organizationId: organizationId,
          adminId: session?.user?.id as string,
        })
          .then(() => {
            toast.success("Organization created successfully!");
            router.push("/dashboard");
          })
          .catch((error) => {
            toast.error(
              "Failed to create organization membership. Please try again."
            );
          });
      })
      .catch((error) => {
        console.log("Error while creating organization");
        toast.error("Failed to create organization. Please try again.");
      });
  };

  const generateAccessCode = () => {
    const code: string = uuidv4().slice(0, 6);
    setAccessCode(code);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("api/auth/signin?callbackUrl=/create-organization");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <div className="border-b-2 border-b-gray-300 px-4 py-9 flex items-center justify-start shadow-md relative">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="mix-blend-multiply absolute -top-2 left-3"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-center mt-6">
          Create Your Organization
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Fill in the details below to create your organization.
        </p>
        <div className="border-2 border-gray-300 rounded-lg p-6 max-w-md mx-auto mt-8 flex flex-col gap-5 py-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="org">Organization Name</label>
            <Input
              placeholder="Enter your organization name"
              name="org"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="desc">Organization Type</label>
            <Select onValueChange={(value) => setType(value)} defaultValue="">
              <SelectTrigger className="w-[180px] bg-zinc-100 text-zinc-900">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Organization</SelectLabel>
                  <SelectItem value="College">College</SelectItem>
                  <SelectItem value="School">School</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Access Code : {accessCode}</label>
            <Button
              variant="outline"
              onClick={generateAccessCode}
              disabled={accessCode.length !== 0}
            >
              Click here to generate the access code
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="secondary"
              className="cursor-pointer bg-black text-white hover:bg-zinc-800"
              onClick={handleSubmit}
            >
              Create Organization
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
