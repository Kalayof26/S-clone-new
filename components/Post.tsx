import { View, Text, Image, StyleSheet } from "react-native";
import { PostType } from "@/types";

type Props = {
    post: PostType;
};

export default function Post({ post }: Props) {
    return (
        <View style={styles.post}>
            <Text>{post.author?.username}</Text>
            <Image source={{ uri: post.imageUrl }} style={styles.image} />
            <Text>{post.caption}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 20,
        padding: 10,
    },
    image: {
        width: "100%",
        height: 300,
    },
});
