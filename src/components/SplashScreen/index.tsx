import { SPLASH } from "@/assets/images";
import { memo, useCallback, useEffect } from "react";
import { ImageBackground, View } from "react-native";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";
import AnimatedPaw from "./AnimatedPaw";

const UniwindImageBackground = withUniwind(ImageBackground);

export const SPLASH_DURATION = 3000;
const PAW_STAGGER_RATIO = 0.55;

const PAWS = [
  { width: 30, height: 25, centerX: 39.7, centerY: 11.1, rotate: -146.5 },
  { width: 43, height: 36, centerX: 43, centerY: 88, rotate: -137.5 },
  { width: 51, height: 44, centerX: 133, centerY: 114.9, rotate: -141.6 },
  { width: 51, height: 44, centerX: 104.3, centerY: 222.7, rotate: -170.5 },
  { width: 67, height: 57, centerX: 207.8, centerY: 302.7, rotate: 160.6 },
] as const;

const PAW_ANIM_DURATION = Math.round(
  SPLASH_DURATION / ((PAWS.length - 1) * PAW_STAGGER_RATIO + 1),
);
const PAW_STAGGER = Math.round(PAW_ANIM_DURATION * PAW_STAGGER_RATIO);

type SplashScreenProps = {
  onFinish?: () => void;
};

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const { top: safeTop } = useSafeAreaInsets();

  const handleLayout = useCallback(() => {
    ExpoSplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFinish?.();
    }, SPLASH_DURATION);

    return () => clearTimeout(timeout);
  }, [onFinish]);

  return (
    <UniwindImageBackground
      source={SPLASH}
      className="flex-1 bg-primary"
      resizeMode="cover"
      onLayout={handleLayout}
    >
      <View className="flex-1">
        {PAWS.map((paw, index) => (
          <AnimatedPaw
            key={index}
            {...paw}
            safeTop={safeTop}
            delay={index * PAW_STAGGER}
            duration={PAW_ANIM_DURATION}
          />
        ))}
      </View>
    </UniwindImageBackground>
  );
};

export default memo(SplashScreen);
