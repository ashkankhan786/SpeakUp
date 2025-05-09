import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createOrganizationMembership = mutation({
  args: {
    organizationId: v.id("organizations"),
    adminId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingMembership = await ctx.db
      .query("organization_membership")
      .filter((q) =>
        q.and(
          q.eq(q.field("organizationId"), args.organizationId),
          q.eq(q.field("adminId"), args.adminId)
        )
      )
      .first();

    if (existingMembership) {
      throw new Error("Membership already exists");
    }

    const id = await ctx.db.insert("organization_membership", {
      organizationId: args.organizationId,
      adminId: args.adminId,
    });
    return id;
  },
});

export const getOrganizationsByAdminId = query({
  args: {
    adminId: v.string(),
  },
  handler: async (ctx, args) => {
    const organizations = await ctx.db
      .query("organization_membership")
      .filter((q) => q.eq(q.field("adminId"), args.adminId))
      .collect();
    const organizationIds = organizations.map((org) => org.organizationId);
    return organizationIds;
  },
});

export const deleteOrganizationMembershipByOrgId = mutation({
  args: {
    organizationId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const membership = await ctx.db
      .query("organization_membership")
      .filter((q) => q.eq(q.field("organizationId"), args.organizationId))
      .first();
    if (!membership) {
      throw new Error("Membership not found");
    }
    await ctx.db.delete(membership._id);
  },
});
