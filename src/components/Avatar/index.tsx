import DogAvatar from "@/assets/svg/DogAvatar.svg";
import { cn } from "@/utils/cn";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "lucide-react-native";
import { memo, useCallback } from "react";
import { Alert, Pressable, View } from "react-native";
import { withUniwind } from "uniwind";

const CameraIcon = withUniwind(Camera);

export interface AvatarProps {
  url?: string;
  onChange?: (uri: string) => void;
  size?: number;
  containerClassName?: string;
  iconClassName?: string;
  disabled?: boolean;
}
const Avatar = ({
  url,
  onChange,
  size = 20,
  containerClassName,
  iconClassName,
  disabled = false,
}: AvatarProps) => {
  const iconSize = size * 0.35;

  const handlePickImage = useCallback(async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Photo permission required",
        "Please allow photo library access to choose your dog's avatar.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      onChange?.(result.assets[0].uri);
    }
  }, [onChange]);

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePickImage}
      style={{
        width: size,
        height: size,
        alignSelf: "center",
      }}
      className={cn("rounded-full", containerClassName)}
    >
      <View className="overflow-hidden rounded-full">
        {url ? (
          <Image
            source={{ uri: url }}
            style={{ width: size, height: size }}
            contentFit="cover"
          />
        ) : (
          <DogAvatar width={size} height={size} />
        )}
      </View>
      <View
        pointerEvents="none"
        style={{
          width: iconSize,
          height: iconSize,
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
        className={cn(
          "rounded-full bg-secondary justify-center items-center ",
          iconClassName,
        )}
      >
        <CameraIcon
          size={iconSize * 0.65}
          colorClassName="accent-white"
          strokeWidth={iconSize * 0.04}
        />
      </View>
    </Pressable>
  );
};

export default memo(Avatar);
