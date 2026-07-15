import { AVATAR_PROFILE } from "@/assets/images";
import Header from "@/components/Header";
import ImageComponent from "@/components/Image/ImageComponent";
import { ROUTE_GROUPS } from "@/constants/routes";
import { queryClient } from "@/lib/react-query";
import { supabase } from "@/lib/supabase";
import { auth$ } from "@/store/auth";
import { router } from "expo-router";
import { Settings } from "lucide-react-native";
import { useCallback } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { withUniwind } from "uniwind";
const SettingsIcon = withUniwind(Settings);
const ProfileScreen = () => {
  const handleLogout = useCallback(() => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          try {
            await supabase.auth.signOut();
          } catch (error) {
            console.warn("Logout failed", error);
          } finally {
            auth$.user.set(null);
            auth$.session.set(null);
            queryClient.clear();
            router.replace(ROUTE_GROUPS.AUTH);
          }
        },
      },
    ]);
  }, []);
  return (
    <View className="flex-1 bg-blue-500 px-5 pt-safe">
      <Header
        showBackButton={false}
        title="Profile"
        right={
          <TouchableOpacity
            className="w-9 h-9 items-center rounded-full justify-center bg-white"
            onPress={handleLogout}
          >
            <SettingsIcon size={24} colorClassName="accent-black" />
          </TouchableOpacity>
        }
      />
      <View className="items-center justify-center">
        <ImageComponent
          source={AVATAR_PROFILE}
          className="w-35 h-35 rounded-full"
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
