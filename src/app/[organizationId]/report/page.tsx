"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Id } from "../../../../convex/_generated/dataModel";
import { Organizations } from "@/app/find-organization/page";

const ReportPage = () => {
  const params = useParams();
  const orgId = params.organizationId as Id<"organizations">;
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<string>("");
  const [accusedName, setAccusedName] = useState<string>("");
  const [victimName, setVictimName] = useState<string>("");
  const [evidenceFiles, setEvidenceFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  const organization = useQuery(api.organizations.getOrganizationById, {
    organizationId: orgId as Id<"organizations">,
  }) as Organizations | null;

  const uploadEvidence = useMutation(api.incidents.uploadEvidence);
  const reportIncident = useMutation(api.incidents.reportIncident);

  const handleSubmit = async () => {
    setLoading(true);
    let evidenceFileIds: Id<"_storage">[] = [];
    try {
      if (evidenceFiles && evidenceFiles.length > 0) {
        const uploadUrl: string = await uploadEvidence();

        // Parallel uploads
        const uploads = Array.from(evidenceFiles).map(async (file) => {
          const res = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": file.type },
            body: file,
          });
          if (!res.ok) throw new Error("Upload failed");
          const { storageId }: { storageId: Id<"_storage"> } = await res.json();
          return storageId;
        });

        evidenceFileIds = await Promise.all(uploads);
      }

      const incidentId = await reportIncident({
        organizationId: orgId,
        description,
        location,
        accusedName,
        reporterName: victimName || undefined,
        evidenceFiles: evidenceFileIds.length > 0 ? evidenceFileIds : undefined,
      });

      if (incidentId) {
        setIsDialogOpen(true);
        setDescription("");
        setLocation("");
        setAccusedName("");
        setVictimName("");
        setEvidenceFiles(null);
      } else {
        toast.error("Failed to report incident.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("organization", organization);
  }, [organization]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">
        Report Incident for Org: {organization?.title}
      </h1>

      <div className="space-y-2">
        <label>Description *</label>
        <textarea
          className="w-full p-2 border rounded-md"
          rows={4}
          placeholder="Describe the incident"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label>Location *</label>
        <Input
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label>Accused Name *</label>
        <Input
          placeholder="Name of the accused"
          value={accusedName}
          onChange={(e) => setAccusedName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label>Victim Name (optional)</label>
        <Input
          placeholder="Name of the victim"
          value={victimName}
          onChange={(e) => setVictimName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label>Upload Evidence (optional)</label>
        <Input
          type="file"
          multiple
          onChange={(e) => setEvidenceFiles(e.target.files)}
        />
      </div>

      <Button
        className="mt-4"
        onClick={handleSubmit}
        disabled={!description || !location || !accusedName || loading}
      >
        {loading ? "Submitting..." : "Submit Report"}
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Report Submitted</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-gray-600">
            Your incident report has been successfully submitted. Our team will
            review it shortly.
          </div>
          <DialogFooter className="mt-4">
            <Button onClick={() => router.push(`/find-organization`)}>
              Return to Home
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportPage;
