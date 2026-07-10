import { BACKGROUND_RUN } from "@/assets/images";
import ImageComponent from "@/components/Image/ImageComponent";
import { Text } from "@/components/Text";
import SignInFormComponent from "@/features/auth/components/SignInFormComponent";
import SignUpFormComponent from "@/features/auth/components/SignUpFormComponent";
import { t } from "@lingui/core/macro";
import { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const HEIGHT_DURATION = 100;

const AuthScreen = () => {
  const [form, setForm] = useState<"sign-in" | "sign-up">("sign-in");
  const contentHeight = useSharedValue(0);

  const handleNextForm = () => {
    setForm((prev) => (prev === "sign-in" ? "sign-up" : "sign-in"));
  };

  const handleContentLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;

    if (contentHeight.value === 0) {
      contentHeight.value = height;
      return;
    }

    contentHeight.value = withTiming(height, { duration: HEIGHT_DURATION });
  };

  const containerStyle = useAnimatedStyle(() => ({
    height: contentHeight.value > 0 ? contentHeight.value : undefined,
    overflow: "hidden",
  }));

  return (
    <View className="flex-1 bg-background">
      <View className="absolute inset-x-0 top-0 h-1/2 w-full overflow-hidden">
        <ImageComponent
          source={BACKGROUND_RUN}
          className="h-full w-full"
          contentFit="cover"
          contentPosition="top"
        />
        <View className="absolute pt-25 px-5">
          <Text className="text-white text-3xl font-bold">
            {t`Welcome to Dogspotting`}
          </Text>
          <Text
            variant="body14Regular"
            className="text-white leading-[14.4px] mt-4"
          >
            {t`Log in your account to continue`}
          </Text>
        </View>
      </View>

      <View className="flex-1 justify-center px-5">
        <View className="rounded-[20px] py-7 px-5 bg-background shadow-md">
          <Animated.View style={containerStyle}>
            <View onLayout={handleContentLayout}>
              {form === "sign-in" ? (
                <SignInFormComponent onNextForm={handleNextForm} />
              ) : (
                <SignUpFormComponent onNextForm={handleNextForm} />
              )}
            </View>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default AuthScreen;
