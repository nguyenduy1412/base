import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";
import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export const OTP_LENGTH = 6;

type OtpDigitProps = {
  digit?: string;
  index: number;
  isLoading: boolean;
  isActive: boolean;
  isError?: boolean;
};

const OtpDigit = ({
  digit,
  index,
  isLoading,
  isActive,
  isError,
}: OtpDigitProps) => {
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(opacity);

    if (!isLoading) {
      opacity.value = withTiming(1, { duration: 150 });
      return;
    }

    opacity.value = 0.4;
    opacity.value = withRepeat(
      withSequence(
        withDelay(index * 120, withTiming(1, { duration: 150 })),
        withTiming(0.4, { duration: 400 }),
        withDelay(
          (OTP_LENGTH - index - 1) * 120,
          withTiming(0.4, { duration: 0 }),
        ),
      ),
      -1,
    );

    return () => cancelAnimation(opacity);
  }, [index, isLoading, opacity]);

  useEffect(() => {
    cancelAnimation(translateY);

    if (digit) {
      translateY.value = 14;
      translateY.value = withSpring(0, {
        damping: 12,
        stiffness: 220,
        mass: 0.4,
      });
    } else {
      translateY.value = withSequence(
        withTiming(14, { duration: 120 }),
        withTiming(0, { duration: 0 }),
      );
    }
  }, [digit, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View
      className={cn(
        "h-16 w-13 items-center justify-center rounded-lg border",
        isError
          ? "border-error-02 bg-neutral-11"
          : isActive
            ? "border-primary-06 bg-primary-01"
            : digit
              ? "border-border bg-neutral-11"
              : "border-border bg-neutral-12",
      )}
    >
      <Animated.View style={animatedStyle}>
        <Text className={digit ? "text-[24px]" : "text-[24px] text-neutral-10"}>
          {digit ?? "–"}
        </Text>
      </Animated.View>
    </View>
  );
};

export default OtpDigit;
