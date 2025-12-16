import { useSignIn } from "@clerk/clerk-expo";
import { View, Button, Text } from "react-native";
import { COLORS } from "../../constants/theme";

export default function LoginScreen() {
    const { signIn } = useSignIn();

    const handleGoogleLogin = async () => {
        if (!signIn) return;
        await signIn.authenticateWithRedirect({ strategy: "oauth_google" } as any);
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background }}>
            <Text style={{ color: COLORS.white, fontSize: 20, marginBottom: 20 }}>Login Screen</Text>
            <Button title="Continue with Google" onPress={handleGoogleLogin} />
        </View>
    );
}
