import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getAuthenticatedUser = query({
    args: {},
    handler: async (ctx) => {
        const clerkId = await getAuthUserId(ctx);
        if (!clerkId) throw new Error("Unauthorized");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
            .unique();

        if (!user) throw new Error("User not found");

        return user;
    },
});
