import { View, Text } from "react-native";

export default function Comment({ comment }: any) {
    return (
        <View style={{ padding: 8 }}>
            <Text style={{ fontWeight: "600" }}>{comment.content}</Text>
        </View>
    );
}
