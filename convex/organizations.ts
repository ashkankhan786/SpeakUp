import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrganization = mutation({
  args: {
    title: v.string(),
    type: v.string(),
    accessCode: v.string(),
  },
  handler: async (ctx, args) => {
    const orgId = await ctx.db.insert("organizations", {
      title: args.title,
      type: args.type,
      accessCode: args.accessCode,
      createdAt: Date.now(),
    });
    return orgId;
  },
});

export const getOrganizations = query({
  handler: async (ctx, db) => {
    const organizations = await ctx.db.query("organizations").collect();
    return organizations;
  },
});

export const getOrganizationById = query({
  args: {
    organizationId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const organization = await ctx.db
      .query("organizations")
      .filter((q) => q.eq(q.field("_id"), args.organizationId))
      .first();
    if (!organization) {
      throw new Error("Organization not found");
    }
    return organization;
  },
});

export const getOrganizationsByIds = query({
  args: {
    organizationIds: v.array(v.id("organizations")),
  },
  handler: async (ctx, args) => {
    const results = [];
    for (const id of args.organizationIds) {
      const org = await ctx.db.get(id);
      if (org) results.push(org);
    }
    return results;
  },
});

export const deleteOrganization = mutation({
  args: {
    organizationId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const organization = await ctx.db
      .query("organizations")
      .filter((q) => q.eq(q.field("_id"), args.organizationId))
      .first();
    if (!organization) {
      throw new Error("Organization not found");
    }
    await ctx.db.delete(organization._id);
    return organization._id;
  },
});
