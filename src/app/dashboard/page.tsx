"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Id } from "../../../convex/_generated/dataModel";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Navbar from "./_components/Navbar";
import { Organizations } from "../find-organization/page";

export interface Incident {
  _id: Id<"incidents">;
  accusedName: string;
  description: string;
  evidenceFiles?: [];
  location: string;
  organizationId: Id<"organizations">;
  reporterName?: string;
  status: "Pending" | "Reviewed";
  _creationTime: Date;
}

function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [selectedOrg, setSelectedOrg] = useState<Organizations | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adminId, setAdminId] = useState<string>("");
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (status === "loading") {
      return;
    } else if (status === "unauthenticated") {
      router.replace("/");
    } else {
      console.log("Session data:", session);
    }
  }, [status, router]);
  const createAdmin = useMutation(api.admins.createAdmin);

  useEffect(() => {
    if (!session) return;
    const createAdminIfNotExists = async () => {
      try {
        const newUserId = await createAdmin({
          userId: session.user.id,
          name: session.user.name,
          email: session.user.email,
        });
        setAdminId(newUserId);
        console.log("User id :", newUserId);
      } catch (error) {
        console.log("Error creating admin:", error);
      }
    };
    createAdminIfNotExists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, createAdmin]);

  const organizationsIds = useQuery(
    api.organization_membership.getOrganizationsByAdminId,
    { adminId: adminId }
  ) as Id<"organizations">[] | undefined;
  useEffect(() => {
    console.log("Organizations IDs:", organizationsIds);
  }, [organizationsIds]);

  const organizations = useQuery(
    api.organizations.getOrganizationsByIds,
    organizationsIds && organizationsIds.length > 0
      ? {
          organizationIds: organizationsIds as Id<"organizations">[],
        }
      : "skip"
  ) as Organizations[] | undefined;

  useEffect(() => {
    console.log("Organizations:", organizations);
  }, [organizations]);

  const incidents = useQuery(
    api.incidents.getIncidents,
    selectedOrg?._id ? { organizationId: selectedOrg._id } : "skip"
  ) as Incident[] | undefined;

  const handleOrgClick = (org: Organizations) => {
    setSelectedOrg(org);
    setDialogOpen(true);
  };

  const deleteOrganization = useMutation(api.organizations.deleteOrganization);
  const deleteMembership = useMutation(
    api.organization_membership.deleteOrganizationMembershipByOrgId
  );
  const handleOrganizationDelete = (org: Organizations) => {
    deleteOrganization({
      organizationId: org._id,
    });
    deleteMembership({
      organizationId: org._id,
    });
    router.refresh();
  };

  return (
    <div className="w-screen relative">
      <Navbar />
      <div className="w-full px-4 md:px-8 lg:px-14">
        <h1 className="text-2xl font-bold mb-3">Your Organizations</h1>
        {organizationsIds === undefined ? (
          <p>Loading...</p>
        ) : organizationsIds?.length === 0 || organizationsIds === null ? (
          <p className="text-gray-500">No organizations created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {organizations?.map((org) => (
              <div
                key={org._id}
                className="border p-4 rounded-md hover:shadow-md transition flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h2
                    className="text-xl font-semibold cursor-pointer"
                    onClick={() => handleOrgClick(org)}
                  >
                    {org.title}
                  </h2>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Trash2 size={20} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your organization and all the incidents
                          reported in it.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleOrganizationDelete(org)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-sm">Type: {org.type}</p>
                  <p className="text-gray-500 text-sm">
                    Access Code : {org.accessCode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isClient && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="w-[70vw] max-w-[70vw] h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-4">
                Incidents in {selectedOrg?.title}
              </DialogTitle>
              {incidents === undefined ? (
                `Loading incidents...`
              ) : incidents?.length === 0 ? (
                `No incidents reported in this organization.`
              ) : (
                <ul className="space-y-2">
                  {incidents.map((incident) => (
                    <li
                      key={incident._id}
                      className="border p-3 rounded hover:bg-gray-100 cursor-pointer"
                      onClick={() => router.push(`/view/${incident._id}`)}
                    >
                      <p className="font-medium">
                        Accused : {incident.accusedName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {incident.description.slice(0, 60)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          Location: {incident.location}
                        </p>
                        <p className="text-sm text-gray-500">
                          Status : {incident.status}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default Dashboard;
