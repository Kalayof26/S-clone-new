import { query } from './_generated/server';
import { v } from 'convex/values';

export const getPosts = query(async ({ db, auth }) => {
    const user = auth.getUserIdentity();
    if (!user) return [];

    const posts = await db
        .query('posts')
        .order('desc')
        .collect();

    return Promise.all(
        posts.map(async (post) => {
            const author = await db.get(post.userId);
            const like = await db
                .query('likes')
                .withIndex('by_user_and_post', (q) => q.eq('userId', user.userId).eq('postId', post._id))
                .first();

            const bookmark = await db
                .query('bookmarks')
                .withIndex('by_user_and_post', (q) => q.eq('userId', user.userId).eq('postId', post._id))
                .first();

            return {
                ...post,
                author,
                isLiked: !!like,
                isBookmarked: !!bookmark,
            };
        })
    );
});
