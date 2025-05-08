import { url } from "inspector";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const uploadEvidence = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const reportIncident = mutation({
  args: {
    organizationId: v.id("organizations"),
    description: v.string(),
    location: v.string(),
    accusedName: v.string(),
    reporterName: v.optional(v.string()),
    evidenceFiles: v.optional(v.array(v.id("_storage"))),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("incidents", {
      organizationId: args.organizationId,
      description: args.description,
      location: args.location,
      accusedName: args.accusedName,
      reporterName: args.reporterName ?? null,
      createdAt: Date.now(),
      evidenceFiles: args.evidenceFiles ?? [],
      status: "pending",
    });
    return id;
  },
});

export const getIncidents = query({
  args: {
    organizationId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const incidents = await ctx.db
      .query("incidents")
      .filter((q) => q.eq(q.field("organizationId"), args.organizationId))
      .collect();

    const incidentsWithUrls = await Promise.all(
      incidents.map(async (incident) => ({
        ...incident,
        ...(incident.evidenceFiles.length > 0
          ? {
              url: await ctx.storage.getUrl(incident.evidenceFiles[0]),
            }
          : {}),
      }))
    );
    return incidentsWithUrls;
  },
});

export const getIncidentById = query({
  args: {
    incidentId: v.id("incidents"),
  },
  handler: async (ctx, args) => {
    const incident = await ctx.db.get(args.incidentId);
    if (!incident) {
      throw new Error("Incident not found");
    }
    const urls = await Promise.all(
      incident.evidenceFiles.map((fileId: Id<"_storage">) =>
        ctx.storage.getUrl(fileId)
      )
    );
    return {
      ...incident,
      urls,
    };
  },
});

export const markIncidentReviewed = mutation({
  args: {
    incidentId: v.id("incidents"),
  },
  handler: async (ctx, { incidentId }) => {
    const incident = await ctx.db.get(incidentId);
    if (!incident) throw new Error("Incident not found");

    await ctx.db.patch(incidentId, {
      status: "Reviewed",
    });
  },
});
