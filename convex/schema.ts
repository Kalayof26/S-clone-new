// convex/tables.ts
import { z } from "zod"; // використовуємо zod для типів, так рекомендує Convex

export const Post = z.object({
    userId: z.string(),
    imageUrl: z.string(),
    caption: z.string(),
    createdAt: z.date(),
});

export const User = z.object({
    clerkId: z.string(),
    fullname: z.string(),
    username: z.string(),
    image: z.string(),
});

export const Like = z.object({
    userId: z.string(),
    postId: z.string(),
});

export const Bookmark = z.object({
    userId: z.string(),
    postId: z.string(),
});



