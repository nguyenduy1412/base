import { BACKGROUND_RUN } from "@/assets/images";
import ImageComponent from "@/components/Image/ImageComponent";
import { Text } from "@/components/Text";
import AnimatedCorgi from "@/features/auth/components/AnimatedCorgi";
import SignInFormComponent from "@/features/auth/components/SignInFormComponent";
import SignUpFormComponent from "@/features/auth/components/SignUpFormComponent";
import { t } from "@lingui/core/macro";
import { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const HEIGHT_SPRING = {
  damping: 18,
  stiffness: 180,
  mass: 0.8,
};

const LOOK_DURATION = 160;

const MAX_TRACK_CHARS = 22;

const AuthScreen = () => {
  const [form, setForm] = useState<"sign-in" | "sign-up">("sign-in");
  const contentHeight = useSharedValue(0);
  const lookX = useSharedValue(-0.4);
  const lookY = useSharedValue(-0.7);

  const lookUp = () => {
    lookX.value = withTiming(-0.4, { duration: LOOK_DURATION });
    lookY.value = withTiming(-0.7, { duration: LOOK_DURATION });
  };

  const lookAtInput = (length: number) => {
    const progress = Math.min(length / MAX_TRACK_CHARS, 1);
    lookX.value = withTiming(-0.75 + progress * 1.3, {
      duration: LOOK_DURATION,
    });
    lookY.value = withTiming(0.65, { duration: LOOK_DURATION });
  };

  const handleNextForm = () => {
    lookUp();
    setForm((prev) => (prev === "sign-in" ? "sign-up" : "sign-in"));
  };

  const handleInputFocus = (text: string) => {
    lookAtInput(text.length);
  };

  const handleInputBlur = () => {
    lookUp();
  };

  const handleInputChange = (text: string) => {
    lookAtInput(text.length);
  };

  const handleContentLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;

    if (contentHeight.value === 0) {
      contentHeight.value = height;
      return;
    }

    contentHeight.value = withSpring(height, HEIGHT_SPRING);
  };

  const containerStyle = useAnimatedStyle(() => ({
    height: contentHeight.value > 0 ? contentHeight.value : undefined,
    overflow: "hidden",
  }));

  return (
    <View className="flex-1 bg-background">
      <View className="absolute inset-x-0 top-0 h-1/2 w-full">
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

      <View className="absolute inset-x-0 top-68 bottom-0 px-5 pb-8">
        <View className="rounded-[20px] py-7 px-5 bg-background shadow-md">
          <View className="absolute -top-31.25 right-0">
            <AnimatedCorgi size={135} lookX={lookX} lookY={lookY} />
          </View>
          <Animated.View style={containerStyle}>
            <View onLayout={handleContentLayout}>
              {form === "sign-in" ? (
                <SignInFormComponent
                  onNextForm={handleNextForm}
                  onInputFocus={handleInputFocus}
                  onInputBlur={handleInputBlur}
                  onInputChange={handleInputChange}
                />
              ) : (
                <SignUpFormComponent
                  onNextForm={handleNextForm}
                  onInputFocus={handleInputFocus}
                  onInputBlur={handleInputBlur}
                  onInputChange={handleInputChange}
                />
              )}
            </View>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default AuthScreen;
