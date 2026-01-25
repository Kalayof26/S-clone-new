import { mutation, query } from "convex/server";
import { v } from "convex/values";
import { getAuthenticatedUser } from "./users";

export const addComment = mutation({
    args: {
        postId: v.id("posts"),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await getAuthenticatedUser(ctx);

        await ctx.db.insert("comments", {
            userId: user._id,
            postId: args.postId,
            content: args.content,
            createdAt: Date.now(),
        });

        const post = await ctx.db.get(args.postId);
        if (post) {
            await ctx.db.patch(post._id, {
                comments: post.comments + 1,
            });

            if (post.userId !== user._id) {
                await ctx.db.insert("notifications", {
                    userId: post.userId,
                    fromUserId: user._id,
                    postId: post._id,
                    type: "comment",
                    createdAt: Date.now(),
                });
            }
        }
    },
});

export const getComments = query({
    args: {
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("comments")
            .withIndex("by_post", (q) => q.eq("postId", args.postId))
            .order("desc")
            .collect();
    },
});
