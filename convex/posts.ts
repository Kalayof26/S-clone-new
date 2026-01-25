import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthenticatedUser } from "./users";

export const toggleLike = mutation({
    args: {
        postId: v.id("posts"),
    },
    handler: async (ctx, { postId }) => {
        const user = await getAuthenticatedUser(ctx);

        const existingLike = await ctx.db
            .query("likes")
            .withIndex("by_user_post", (q) =>
                q.eq("userId", user._id).eq("postId", postId)
            )
            .unique();

        const post = await ctx.db.get(postId);
        if (!post) throw new Error("Post not found");

        // ❌ UNLIKE
        if (existingLike) {
            await ctx.db.delete(existingLike._id);
            await ctx.db.patch(postId, {
                likesCount: post.likesCount - 1,
            });
            return false;
        }

        // ❤️ LIKE
        await ctx.db.insert("likes", {
            userId: user._id,
            postId,
        });

        await ctx.db.patch(postId, {
            likesCount: post.likesCount + 1,
        });

        if (post.userId !== user._id) {
            await ctx.db.insert("notifications", {
                userId: post.userId,
                fromUserId: user._id,
                postId,
                type: "like",
                createdAt: Date.now(),
            });
        }

        return true;
    },
});

export const deletePost = mutation({
    args: {
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        const user = await getAuthenticatedUser(ctx);
        const post = await ctx.db.get(args.postId);

        if (!post || post.userId !== user._id) {
            throw new Error("Not authorized");
        }

        const likes = await ctx.db
            .query("likes")
            .withIndex("by_post", (q) => q.eq("postId", args.postId))
            .collect();

        for (const like of likes) await ctx.db.delete(like._id);

        const comments = await ctx.db
            .query("comments")
            .withIndex("by_post", (q) => q.eq("postId", args.postId))
            .collect();

        for (const comment of comments) await ctx.db.delete(comment._id);

        const bookmarks = await ctx.db
            .query("bookmarks")
            .withIndex("by_post", (q) => q.eq("postId", args.postId))
            .collect();

        for (const bookmark of bookmarks) await ctx.db.delete(bookmark._id);

        await ctx.db.delete(args.postId);
    },
});

