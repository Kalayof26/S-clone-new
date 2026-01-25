import { Modal, FlatList, TextInput, View, Button } from "react-native";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Comment from "./Comment";
import { useState } from "react";

export default function CommentsModal({ postId, visible, onClose }: any) {
    const comments = useQuery(api.comments.getComments, { postId });
    const addComment = useMutation(api.comments.addComment);
    const [text, setText] = useState("");

    return (
        <Modal visible={visible} animationType="slide">
            <FlatList
                data={comments}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <Comment comment={item} />}
            />

            <View style={{ padding: 10 }}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Add comment..."
                />
                <Button
                    title="Post"
                    onPress={() => {
                        addComment({ postId, content: text });
                        setText("");
                    }}
                />
                <Button title="Close" onPress={onClose} />
            </View>
        </Modal>
    );
}
