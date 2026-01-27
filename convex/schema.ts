import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        clerkId: v.string(),
        username: v.string(),
        fullname: v.string(),
        bio: v.optional(v.string()),
        avatarUrl: v.optional(v.string()),
        followers: v.number(),
        following: v.number(),
    }).index("by_clerk_id", ["clerkId"]),

    posts: defineTable({
        userId: v.id("users"),
        content: v.string(),
        imageUrl: v.optional(v.string()),
        likes: v.number(),
        comments: v.number(),
        createdAt: v.number(),
    }).index("by_user", ["userId"]),

    follows: defineTable({
        followerId: v.id("users"),
        followingId: v.id("users"),
    }).index("by_both", ["followerId", "followingId"]),

    notifications: defineTable({
        userId: v.id("users"),
        fromUserId: v.id("users"),
        type: v.string(),
        createdAt: v.number(),
    }),
});
