import { mutation, query } from "convex/server";
import { v } from "convex/values";

/* ===================== GET USER PROFILE ===================== */
export const getUserProfile = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.userId);
    },
});

/* ===================== UPDATE PROFILE ===================== */
export const updateProfile = mutation({
    args: {
        fullname: v.string(),
        bio: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) =>
                q.eq("clerkId", identity.subject)
            )
            .unique();

        if (!user) throw new Error("User not found");

        await ctx.db.patch(user._id, {
            fullname: args.fullname,
            bio: args.bio,
        });
    },
});

/* ===================== IS FOLLOWING ===================== */
export const isFollowing = query({
    args: {
        followingId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return false;

        const me = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) =>
                q.eq("clerkId", identity.subject)
            )
            .unique();

        if (!me) return false;

        const follow = await ctx.db
            .query("follows")
            .withIndex("by_both", (q) =>
                q.eq("followerId", me._id).eq("followingId", args.followingId)
            )
            .unique();

        return !!follow;
    },
});

/* ===================== TOGGLE FOLLOW ===================== */
export const toggleFollow = mutation({
    args: {
        followingId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const me = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) =>
                q.eq("clerkId", identity.subject)
            )
            .unique();

        if (!me) throw new Error("User not found");

        const existing = await ctx.db
            .query("follows")
            .withIndex("by_both", (q) =>
                q.eq("followerId", me._id).eq("followingId", args.followingId)
            )
            .unique();

        if (existing) {
            await ctx.db.delete(existing._id);

            await ctx.db.patch(me._id, {
                following: me.following - 1,
            });

            const user = await ctx.db.get(args.followingId);
            if (user) {
                await ctx.db.patch(user._id, {
                    followers: user.followers - 1,
                });
            }
        } else {
            await ctx.db.insert("follows", {
                followerId: me._id,
                followingId: args.followingId,
            });

            await ctx.db.patch(me._id, {
                following: me.following + 1,
            });

            const user = await ctx.db.get(args.followingId);
            if (user) {
                await ctx.db.patch(user._id, {
                    followers: user.followers + 1,
                });

                await ctx.db.insert("notifications", {
                    userId: user._id,
                    fromUserId: me._id,
                    type: "follow",
                    createdAt: Date.now(),
                });
            }
        }
    },
});
