import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    header: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    profileInfo: {
        paddingHorizontal: 16,
    },
    avatar: {
        width: 86,
        height: 86,
        borderRadius: 43,
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 16,
    },
    statItem: {
        alignItems: "center",
    },
    statNumber: {
        color: "#fff",
        fontWeight: "700",
    },
    statLabel: {
        color: "#888",
    },
    name: {
        color: "#fff",
        fontWeight: "600",
        marginTop: 8,
    },
    bio: {
        color: "#ccc",
        marginTop: 4,
    },
    actions: {
        flexDirection: "row",
        marginTop: 12,
    },
    button: {
        flex: 1,
        padding: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#333",
        alignItems: "center",
        marginRight: 8,
    },
    buttonText: {
        color: "#fff",
    },
    gridItem: {
        width: "33.33%",
        aspectRatio: 1,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#000",
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#333",
        padding: 10,
        borderRadius: 6,
        color: "#fff",
        marginBottom: 12,
    },
});
