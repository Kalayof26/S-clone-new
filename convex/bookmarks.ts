import { mutation, query } from "convex/server";
import { v } from "convex/values";
import { getAuthenticatedUser } from "./users";

export const toggleBookmark = mutation({
    args: {
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        const user = await getAuthenticatedUser(ctx);

        const existing = await ctx.db
            .query("bookmarks")
            .withIndex("by_user_and_post", (q) =>
                q.eq("userId", user._id).eq("postId", args.postId)
            )
            .unique();

        if (existing) {
            await ctx.db.delete(existing._id);
            return false;
        }

        await ctx.db.insert("bookmarks", {
            userId: user._id,
            postId: args.postId,
        });

        return true;
    },
});

export const getBookmarkedPosts = query({
    handler: async (ctx) => {
        const user = await getAuthenticatedUser(ctx);

        return await ctx.db
            .query("bookmarks")
            .withIndex("by_user", (q) => q.eq("userId", user._id))
            .collect();
    },
});