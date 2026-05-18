import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    ecole: v.string(),
    sources: v.array(v.string()),
    manques: v.array(v.string()),
    interets: v.array(v.string()),
    plateforme: v.string(),
    suggestion: v.optional(v.string()),
    rejoindre: v.boolean(),
    whatsapp: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("voices", {
      ecole: args.ecole,
      sources: args.sources,
      manques: args.manques,
      interets: args.interets,
      plateforme: args.plateforme,
      suggestion: args.suggestion || undefined,
      rejoindre: args.rejoindre,
      whatsapp: args.whatsapp || undefined,
      email: args.email || undefined,
    });
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("voices").order("desc").collect();
  },
});

export const count = query({
  handler: async (ctx) => {
    const all = await ctx.db.query("voices").collect();
    return all.length;
  },
});
