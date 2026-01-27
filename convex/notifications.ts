import { query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthenticatedUser } from "./users";

export const getNotifications = query({
    args: {},
    handler: async (ctx) => {
        const user = await getAuthenticatedUser(ctx);

        const notifications = await ctx.db
            .query("notifications")
            .withIndex("by_receiver", (q) => q.eq("receiverId", user._id))
            .order("desc")
            .collect();

        return Promise.all(
            notifications.map(async (n) => {
                const sender = await ctx.db.get(n.senderId);
                const post = n.postId ? await ctx.db.get(n.postId) : null;
                const comment = n.commentId ? await ctx.db.get(n.commentId) : null;

                return {
                    ...n,
                    sender,
                    post,
                    comment,
                };
            })
        );
    },
});
