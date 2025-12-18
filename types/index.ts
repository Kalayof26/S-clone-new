export type PostType = {
    _id: string;
    userId: string;
    imageUrl: string;
    caption: string;
    createdAt: Date;
    author?: UserType;
    isLiked?: boolean;
    isBookmarked?: boolean;
};

export type UserType = {
    _id: string;
    clerkId: string;
    fullname: string;
    username: string;
    image: string;
};
