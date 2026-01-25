import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        clerkId: v.string(),
        fullname: v.string(),
        avatar: v.optional(v.string()),
        posts: v.number(),
    }).index("by_clerk_id", ["clerkId"]),

    posts: defineTable({
        userId: v.id("users"),
        content: v.string(),
        imageUrl: v.optional(v.string()),
        likes: v.number(),
        comments: v.number(),
        createdAt: v.number(),
    }),

    likes: defineTable({
        userId: v.id("users"),
        postId: v.id("posts"),
    })
        .index("by_post", ["postId"])
        .index("by_user_and_post", ["userId", "postId"]),

    comments: defineTable({
        userId: v.id("users"),
        postId: v.id("posts"),
        content: v.string(),
        createdAt: v.number(),
    }).index("by_post", ["postId"]),

    bookmarks: defineTable({
        userId: v.id("users"),
        postId: v.id("posts"),
    })
        .index("by_user", ["userId"])
        .index("by_user_and_post", ["userId", "postId"]),

    notifications: defineTable({
        userId: v.id("users"),
        fromUserId: v.id("users"),
        postId: v.optional(v.id("posts")),
        type: v.string(),
        createdAt: v.number(),
    }),
});
