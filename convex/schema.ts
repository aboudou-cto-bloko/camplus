import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  voices: defineTable({
    ecole: v.string(),
    sources: v.array(v.string()),
    manques: v.array(v.string()),
    interets: v.array(v.string()),
    plateforme: v.string(),
    suggestion: v.optional(v.string()),
    rejoindre: v.boolean(),
    whatsapp: v.optional(v.string()),
    email: v.optional(v.string()),
  }),
});
