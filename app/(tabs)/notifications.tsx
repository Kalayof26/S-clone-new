import { View, Text } from "react-native";
import { COLORS, Fonts } from "../../constants/theme";

export default function NotificationsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background }}>
            <Text style={{ color: COLORS.white, fontFamily: Fonts.rounded }}>Notifications Screen</Text>
        </View>
    );
}
