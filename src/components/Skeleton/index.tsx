import { cn } from "@/utils/cn";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { DimensionValue, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export type SkeletonProps = {
  colorMode?: "light" | "dark";
  direction?: "ltr" | "rtl";
  duration?: number;
  className?: string;
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export function Skeleton({
  colorMode = "light",
  direction = "ltr",
  duration = 1500,
  className,
}: SkeletonProps) {
  const progress = useSharedValue(0);

  const shimmerColor =
    colorMode === "dark" ? "rgb(51, 51, 51)" : "rgb(205, 205, 205)";
  const shimmerTransparent =
    colorMode === "dark" ? "rgba(51, 51, 51, 0)" : "rgba(205, 205, 205, 0)";
  const gradientColors: [string, string, ...string[]] = [
    shimmerTransparent,
    shimmerColor,
    shimmerTransparent,
    shimmerColor,
  ];

  const totalSegments = 3;
  const translateStart = -((totalSegments - 1) / totalSegments) * 100;

  useEffect(() => {
    progress.value = 0;
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.linear }),
      -1,
      false,
    );
  }, [duration, progress]);

  const animatedGradientStyle = useAnimatedStyle(() => {
    const startVal = direction === "rtl" ? 0 : translateStart;
    const endVal = direction === "rtl" ? translateStart : 0;

    const translateVal = interpolate(
      progress.value,
      [0, 1],
      [startVal, endVal],
    );
    return {
      transform: [
        {
          translateX: `${translateVal.toString()}%` as unknown as number,
        },
      ],
    };
  });

  return (
    <View
      className={cn(
        "relative w-full h-5 rounded-lg overflow-hidden",
        colorMode === "dark" ? "bg-[rgb(17,17,17)]" : "bg-[rgb(250,250,250)]",
        className,
      )}
    >
      <AnimatedLinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          StyleSheet.absoluteFill,
          {
            width: `${(totalSegments * 100).toString()}%` as DimensionValue,
          },
          animatedGradientStyle,
        ]}
      />
    </View>
  );
}
