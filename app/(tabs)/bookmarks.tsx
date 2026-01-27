import { View, FlatList, Image, Dimensions, Text } from "react-native";
import { useQuery, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";

const SIZE = Dimensions.get("window").width / 3;

export default function BookmarksScreen() {
    const { isAuthenticated } = useConvexAuth();

    const bookmarks = useQuery(
        api.bookmarks.getBookmarks,
        isAuthenticated ? {} : "skip"
    );

    if (!bookmarks || bookmarks.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#777" }}>No bookmarks found</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={bookmarks}
            numColumns={3}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <Image
                    source={{ uri: item.post?.imageUrl }}
                    style={{ width: SIZE, height: SIZE }}
                />
            )}
        />
    );
}
