import Icon from "@/assets/svg/Icon";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const PAW_EASING = Easing.bezier(0.22, 0.61, 0.36, 1);

export type AnimatedPawProps = {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  rotate: number;
  delay: number;
  safeTop: number;
  duration: number;
};

const AnimatedPaw = ({
  width,
  height,
  centerX,
  centerY,
  rotate,
  delay,
  safeTop,
  duration,
}: AnimatedPawProps) => {
  const progress = useSharedValue(0);
  const box = Math.ceil(Math.sqrt(width * width + height * height));

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, {
        duration,
        easing: PAW_EASING,
      }),
    );
  }, [delay, duration, progress]);

  const revealStyle = useAnimatedStyle(() => ({
    height: Math.max(box * progress.value, 1),
  }));

  return (
    <View
      style={[
        styles.paw,
        {
          left: centerX - box / 2,
          top: centerY - box / 2 + safeTop,
          width: box,
          height: box,
        },
      ]}
    >
      <Animated.View style={[styles.reveal, { width: box }, revealStyle]}>
        <View style={[styles.pawContent, { width: box, height: box }]}>
          <View
            style={{
              width,
              height,
              transform: [{ rotate: `${-rotate}deg` }],
            }}
          >
            <Icon
              name="paw"
              width={width}
              height={height}
              colorClassName="accent-white"
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default AnimatedPaw;

const styles = StyleSheet.create({
  paw: {
    position: "absolute",
    overflow: "hidden",
  },
  reveal: {
    overflow: "hidden",
  },
  pawContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
