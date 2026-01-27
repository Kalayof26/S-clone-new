import { View, Text, FlatList, Image } from "react-native";
import { useQuery, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/notifications.styles";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsScreen() {
    const { isAuthenticated } = useConvexAuth();

    const notifications = useQuery(
        api.notifications.getNotifications,
        isAuthenticated ? {} : "skip"
    );

    if (!notifications) {
        return (
            <View style={styles.centered}>
                <Text style={{ color: "#777" }}>No notifications</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={notifications}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
                const icon =
                    item.type === "like"
                        ? "heart"
                        : item.type === "comment"
                            ? "chatbubble"
                            : "person-add";

                const color =
                    item.type === "like"
                        ? "red"
                        : item.type === "comment"
                            ? "#3B82F6"
                            : "#8B5CF6";

                return (
                    <View style={styles.notificationItem}>
                        <View style={styles.avatarWrapper}>
                            <Image
                                source={{ uri: item.sender?.imageUrl }}
                                style={styles.avatar}
                            />
                            <View style={[styles.iconBadge, { backgroundColor: color }]}>
                                <Ionicons name={icon} size={10} color="#fff" />
                            </View>
                        </View>

                        <View style={styles.content}>
                            <Text style={styles.text}>
                                <Text style={styles.username}>
                                    {item.sender?.username}
                                </Text>{" "}
                                {item.type === "like" && "liked your post"}
                                {item.type === "comment" && "commented your post"}
                                {item.type === "follow" && "started following you"}
                            </Text>

                            <Text style={styles.time}>
                                {formatDistanceToNow(item.createdAt)} ago
                            </Text>
                        </View>
                    </View>
                );
            }}
        />
    );
}
