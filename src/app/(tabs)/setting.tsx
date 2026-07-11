import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SettingScreen = () => {
  const { top } = useSafeAreaInsets();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      router.replace("/(auth)");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again.";
      Alert.alert("Unable to log out", message);
    } finally {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut]);

  return (
    <View className="flex-1 bg-background px-5" style={{ paddingTop: top + 24 }}>
      <Text variant="heading32Semibold">Settings</Text>

      <Button
        title="Log out"
        color="background"
        isShadow={false}
        isLoading={isLoggingOut}
        onPress={handleLogout}
        className=" mb-8 w-full rounded-xl border border-error"
        textClassName="text-error"
      />
    </View>
  );
};

export default SettingScreen;
