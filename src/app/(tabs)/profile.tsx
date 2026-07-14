import { AVATAR_PROFILE } from "@/assets/images";
import Header from "@/components/Header";
import ImageComponent from "@/components/Image/ImageComponent";
import { Settings } from "lucide-react-native";
import { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import { withUniwind } from "uniwind";
const SettingsIcon = withUniwind(Settings);
const ProfileScreen = () => {
  const handleNavigateToSettings = useCallback(() => {
    // router.push("/settings");
  }, []);
  return (
    <View className="flex-1 bg-blue-500 px-5 pt-safe">
      <Header
        showBackButton={false}
        title="Profile"
        right={
          <TouchableOpacity
            className="w-9 h-9 items-center rounded-full justify-center bg-white"
            onPress={handleNavigateToSettings}
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
