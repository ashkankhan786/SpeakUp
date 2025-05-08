"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import Navbar from "./_components/Navbar";

function page() {
  const [orgs, setOrgs] = useState<any[] | undefined>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [accessCode, setAccessCode] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const organizations: any[] | undefined = useQuery(
    api.organizations.getOrganizations,
    {}
  );
  const handleAccessClick = (id: string) => {
    // Handle the access code logic here
    console.log("Access code:", accessCode[id]);
    router.push(`/${id}/report`);
  };
  useEffect(() => {
    console.log("organizations", organizations);
  }, [organizations]);

  useEffect(() => {
    if (!organizations || searchText.length === 0) {
      setOrgs(organizations);
      return;
    }
    const filteredOrg: any[] = organizations?.filter(
      (org) => org?.title.toLowerCase().indexOf(searchText.toLowerCase()) != -1
    );
    setOrgs(filteredOrg);
    console.log("filtered");
  }, [searchText, organizations]);

  return (
    <div className="flex flex-col w-screen">
      <Navbar searchText={searchText} setSearchText={setSearchText} />
      <div className="flex flex-col items-center justify-start gap-3 mt-10 px-20 md:px-32 lg:px-44">
        {orgs?.length === 0 && <h1>No organizations found.</h1>}
        {orgs?.map((org) => {
          return (
            <div
              className="flex items-center justify-between border-2 px-4 md:px-8 lg:px-16 py-2 bg-neutral-100 border-neutral-300 shadow-md rounded-md w-full"
              key={org._id}
            >
              <div className="flex flex-col items-start justify-between gap-3">
                <h1 className="font-semibold text-lg">{org.title}</h1>
                <p className="text-gray-500 font-semibold text-sm">
                  Type : {org.type}
                </p>
              </div>
              <div className="flex flex-col items-start justify-center gap-3 py-2">
                <Input
                  placeholder="Enter access code here"
                  value={accessCode[org._id] || ""}
                  onChange={(e) => {
                    setAccessCode((prev) => ({
                      ...prev,
                      [org._id]: e.target.value,
                    }));
                  }}
                />
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  disabled={
                    accessCode[org._id]?.length < 5 ||
                    accessCode[org._id] !== org.accessCode
                  }
                  onClick={() => handleAccessClick(org._id)}
                >
                  Access
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page;
