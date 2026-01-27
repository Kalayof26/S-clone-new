import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    notificationItem: {
        flexDirection: "row",
        padding: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: "#222",
    },
    avatarWrapper: {
        marginRight: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    iconBadge: {
        position: "absolute",
        bottom: -2,
        right: -2,
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        flex: 1,
    },
    username: {
        color: "#fff",
        fontWeight: "600",
    },
    text: {
        color: "#ccc",
    },
    time: {
        color: "#666",
        fontSize: 12,
        marginTop: 4,
    },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
