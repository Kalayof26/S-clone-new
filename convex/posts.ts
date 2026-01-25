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
