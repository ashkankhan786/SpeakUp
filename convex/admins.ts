import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createAdmin = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existingAdmin = await ctx.db
      .query("admins")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingAdmin) {
      return existingAdmin.userId;
    }
    const id = await ctx.db.insert("admins", {
      userId: args.userId,
      name: args.name,
      email: args.email,
    });
    const newAdmin = await ctx.db.get(id);
    if (!newAdmin) {
      throw new Error("Failed to create admin");
    }
    return newAdmin.userId;
  },
});

export const getAdminByUserId = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const admin = await ctx.db
      .query("admins")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    return admin;
  },
});
