import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

export type PostProps = {
    post: {
        _id: string;
        imageUrl: string;
        caption?: string;
        likesCount: number;
        commentsCount: number;
        createdAt: number;
    };
    isLiked: boolean;
};

export default function Post({ post, isLiked }: PostProps) {
    const toggleLike = useMutation(api.posts.toggleLike);

    const [liked, setLiked] = useState(isLiked);
    const [likesCount, setLikesCount] = useState(post.likesCount);

    const handleLike = async () => {
        setLiked((prev) => !prev);
        setLikesCount((prev) => (liked ? prev - 1 : prev + 1));

        try {
            const newState = await toggleLike({ postId: post._id });
            setLiked(newState);
        } catch {
            setLiked(isLiked);
            setLikesCount(post.likesCount);
        }
    };

    return (
        <View>
            <Image source={{ uri: post.imageUrl }} style={{ height: 400 }} />

            <Pressable onPress={handleLike}>
                <Ionicons
                    name={liked ? "heart" : "heart-outline"}
                    size={28}
                    color={liked ? "red" : "white"}
                />
            </Pressable>

            <Text>{likesCount} likes</Text>

            {post.caption && <Text>{post.caption}</Text>}

            <Text>
                View all {post.commentsCount} comments
            </Text>

            <Text>
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
            </Text>
        </View>
    );
}
