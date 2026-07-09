import Button from "@/components/Button";
import { auth$ } from "@/store/auth";
import type { User } from "@supabase/supabase-js";
import { router } from "expo-router";
import { View } from "react-native";

const LoginScreen = () => {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Button
        title="Login"
        className="h-10"
        onPress={() => {
          auth$.user.set({
            id: "1",
            aud: "authenticated",
            role: "authenticated",
            email: "test@example.com",
            created_at: new Date().toISOString(),
            app_metadata: {},
            user_metadata: {},
          } as User);
          router.push("/(tabs)");
        }}
      />
    </View>
  );
};

export default LoginScreen;
