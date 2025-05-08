"use client";

import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Image from "next/image";
import React, { useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function ViewIncident() {
  const { incidentId } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const incident = useQuery(api.incidents.getIncidentById, {
    incidentId: incidentId as Id<"incidents">,
  });

  const markReviewed = useMutation(api.incidents.markIncidentReviewed);

  const handleMarkReviewed = async () => {
    try {
      await markReviewed({ incidentId: incidentId as Id<"incidents"> });
      toast("Incident marked as Reviewed !");
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (!incident) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="w-screen px-10 pt-3 bg-white  flex flex-col items-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold text-gray-800">Incident Details</h1>

      <div className="flex flex-col justify-center rounded-xl shadow-lg bg-zinc-100 p-3 px-6 pb-5 gap-3">
        <div className="text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">Description :</span>{" "}
            {incident.description}
          </p>
          <p>
            <span className="font-semibold">Location :</span>{" "}
            {incident.location}
          </p>
          {incident.victimName && (
            <p>
              <span className="font-semibold">Victim Name :</span>{" "}
              {incident.victimName}
            </p>
          )}
          <p>
            <span className="font-semibold">Accused Name :</span>{" "}
            <span className="text-red-400 font-semibold">
              {incident.accusedName}
            </span>
          </p>
          <p>
            <span className="font-semibold">Status:</span> {incident.status}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Evidence Images</h2>
          {incident.urls && incident.urls.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {incident.urls.map((url: string, idx: number) => (
                <Image
                  key={idx}
                  src={url}
                  alt={`Evidence ${idx + 1}`}
                  width={200}
                  height={200}
                  className="rounded-lg border shadow cursor-pointer"
                  onClick={() => {
                    setPhotoIndex(idx);
                    setLightboxOpen(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No evidence files provided.</p>
          )}
        </div>

        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={photoIndex}
            slides={incident.urls.map((url: string) => ({ src: url }))}
            plugins={[Download]}
          />
        )}
      </div>
      <Button
        variant="default"
        onClick={handleMarkReviewed}
        disabled={incident.status !== "pending"}
        className="cursor-pointer"
      >
        Mark as Reviewed
      </Button>
    </div>
  );
}
