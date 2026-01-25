import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        clerkId: v.string(),
        fullname: v.string(),
        imageUrl: v.string(),
    }).index("by_clerk_id", ["clerkId"]),

    posts: defineTable({
        userId: v.id("users"),
        imageUrl: v.string(),
        caption: v.optional(v.string()),
        likesCount: v.number(),
        commentsCount: v.number(),
        createdAt: v.number(),
    }).index("by_created_at", ["createdAt"]),

    likes: defineTable({
        userId: v.id("users"),
        postId: v.id("posts"),
    })
        .index("by_user_post", ["userId", "postId"])
        .index("by_post", ["postId"]),

    notifications: defineTable({
        userId: v.id("users"),
        fromUserId: v.id("users"),
        postId: v.optional(v.id("posts")),
        type: v.literal("like"),
        createdAt: v.number(),
    }).index("by_user", ["userId"]),
});
