import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen() {
    return (
        <ScrollView style={styles.container}>

            {/* ГРАДІЄНТНИЙ HEADER */}
            <LinearGradient
                colors={["#1DA1F2", "#0d8ddb"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.header}
            >
                <Text style={styles.username}>@username</Text>
                <Text style={styles.fullname}>User Name</Text>
            </LinearGradient>

            {/* КОНТЕНТ */}
            <View style={styles.content}>
                <Text style={styles.bio}>
                    This is my profile bio.
                    Here is a simple example project.
                </Text>

                {/* ГРАДІЄНТНА КНОПКА */}
                <LinearGradient
                    colors={["#1DA1F2", "#14171A"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </LinearGradient>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        padding: 24,
        paddingTop: 60,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    username: {
        color: "#fff",
        fontSize: 14,
        opacity: 0.9,
    },
    fullname: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 4,
    },
    content: {
        padding: 20,
    },
    bio: {
        fontSize: 14,
        color: "#333",
        marginBottom: 20,
    },
    button: {
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
