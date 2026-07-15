import {
  BlurMask,
  Canvas,
  Circle,
  Group,
  Path,
  RoundedRect,
  Shadow,
  SweepGradient,
  interpolateColors,
  rect,
  rrect,
  vec,
} from "@shopify/react-native-skia";
import type { BottomTabBarProps } from "expo-router/build/layouts/Tabs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View, type LayoutChangeEvent } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  useAnimatedReaction,
  useDerivedValue,
  useFrameCallback,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { TAB_ACTIVE_COLOR, TAB_INACTIVE_COLOR } from "./constants/colors";
import {
  ICON_STROKE_WIDTH,
  ICON_VIEWBOX,
  TAB_COUNT,
  TAB_ICONS,
  TAB_ICON_PATHS,
} from "./constants/icons";

const ACTIVE_COLOR = TAB_ACTIVE_COLOR;
const SHADOW_COLOR = "rgba(0, 0, 0, 0.1)";
const INACTIVE_COLOR = TAB_INACTIVE_COLOR;
const PILL_COLOR = "rgba(255, 255, 255, 0.5)";
const PILL_INNER_SHADOW = "rgba(0, 0, 0, 0.1)";
const PILL_RIM_POSITIONS = [0, 0.125, 0.375, 0.625, 0.875, 1];
const PILL_RIM_COLORS = [
  "rgba(255, 255, 255, 0.5)",
  "rgba(255, 255, 255, 0.95)",
  "rgba(255, 255, 255, 0.15)",
  "rgba(255, 255, 255, 0.95)",
  "rgba(255, 255, 255, 0.15)",
  "rgba(255, 255, 255, 0.5)",
];
const LENS_DARKEN = 0.04;
const BUBBLE_REST_FILL = "rgba(0, 0, 0, 0.07)";
const BUBBLE_GLASS_FILL = `rgba(0, 0, 0, ${LENS_DARKEN})`;

const BAR_H = 56;
const BAR_MARGIN_X = 20;
const PAD_V = 32;
const CANVAS_H = BAR_H + PAD_V * 2;
const BAR_BOTTOM = 32;
const BAR_CY = PAD_V + BAR_H / 2;

const ICON_SIZE = 28;
const CREATE_D = 40;
const CREATE_STROKE = 2.5;

const IDLE_W = 64;
const IDLE_H = 46;
const SCALE_X = 1.5;
const SCALE_Y = 1.5;
const BAR_PRESS_DELTA = 6;
const MAX_PULL = 14;
const MAX_STRETCH = 0.7;
const SQUASH_X = 0;
const SQUASH_Y = 2.4;
const VELOCITY_DEADZONE = 500;
const VELOCITY_REF = 2400;

const SPRING_SLIDE = { duration: 650, dampingRatio: 0.85 };
const PRESS_UP_MS = 120;
const PRESS_DOWN_MS = 100;
const LIQUID_MS = 300;
const SPRING_STRETCH = { damping: 16, stiffness: 90, mass: 0.9 };

const RIM_POSITIONS = [
  0, 0.065, 0.125, 0.185, 0.25, 0.375, 0.5, 0.565, 0.625, 0.685, 0.75, 0.875, 1,
];

const rimStops = (
  peak: number,
  shoulder: number,
  trough: number,
  mid: number,
) =>
  [
    trough,
    shoulder,
    peak,
    shoulder,
    trough,
    mid,
    trough,
    shoulder,
    peak,
    shoulder,
    trough,
    mid,
    trough,
  ].map((a) => `rgba(255, 255, 255, ${a})`);

const RIM_CRISP_COLORS = rimStops(0.95, 0.3, 0.1, 0.18);
const RIM_GLOW_COLORS = rimStops(0.6, 0.22, 0.06, 0.18);

const slotCenterX = (width: number, index: number) => {
  "worklet";
  const slot = (width - BAR_MARGIN_X * 2) / TAB_COUNT;
  return BAR_MARGIN_X + slot * (index + 0.5);
};

const slotFromX = (width: number, x: number) => {
  "worklet";
  const slot = (width - BAR_MARGIN_X * 2) / TAB_COUNT;
  const index = Math.floor((x - BAR_MARGIN_X) / slot);
  return Math.min(TAB_COUNT - 1, Math.max(0, index));
};

const bubbleSize = (press: number, stretch: number) => {
  "worklet";
  const sx = 1 + stretch * SQUASH_X;
  const sy = 1 + stretch * SQUASH_Y;
  return {
    w: IDLE_W * (1 + (SCALE_X - 1) * press) * sx,
    h: (IDLE_H * (1 + (SCALE_Y - 1) * press)) / sy,
  };
};

const stretchFromVelocity = (velocityX: number) => {
  "worklet";
  const speed = Math.abs(velocityX);
  if (speed <= VELOCITY_DEADZONE) return 0;
  const t = (speed - VELOCITY_DEADZONE) / (VELOCITY_REF - VELOCITY_DEADZONE);
  return Math.min(MAX_STRETCH, t);
};

const rubberBand = (value: number, min: number, max: number) => {
  "worklet";
  if (value < min) {
    const d = min - value;
    return min - MAX_PULL * (1 - 1 / (d / MAX_PULL + 1));
  }
  if (value > max) {
    const d = value - max;
    return max + MAX_PULL * (1 - 1 / (d / MAX_PULL + 1));
  }
  return value;
};

type BarBackgroundProps = {
  pillRRect: ReturnType<typeof rrect>;
  width: number;
  pillColor?: string;
};

const BarBackground = ({
  pillRRect,
  width,
  pillColor = PILL_COLOR,
}: BarBackgroundProps) => (
  <>
    <RoundedRect rect={pillRRect} color={pillColor}>
      <Shadow dx={0} dy={8} blur={6} color={SHADOW_COLOR} />
      <Shadow dx={0} dy={-8} blur={6} color={SHADOW_COLOR} />
      <Shadow dx={3} dy={2} blur={5} color="rgba(255, 255, 255, 0.3)" inner />
      <Shadow dx={-3} dy={-3} blur={1} color="rgba(255, 255, 255, 0.5)" inner />
      <Shadow dx={0} dy={0} blur={5} color={PILL_INNER_SHADOW} inner />
    </RoundedRect>

    <RoundedRect rect={pillRRect} style="stroke" strokeWidth={1.5}>
      <SweepGradient
        c={vec(width / 2, BAR_CY)}
        colors={PILL_RIM_COLORS}
        positions={PILL_RIM_POSITIONS}
      />
    </RoundedRect>
  </>
);

type TabIconsProps = {
  width: number;
  color: string;
  skipPrimary?: boolean;
};

const TabIcons = ({ width, color, skipPrimary }: TabIconsProps) => (
  <>
    {TAB_ICONS.map((tab, i) => {
      const cx = slotCenterX(width, i);
      const scale = ICON_SIZE / ICON_VIEWBOX;
      const transform = [
        { translateX: cx - ICON_SIZE / 2 },
        { translateY: BAR_CY - ICON_SIZE / 2 },
        { scale },
      ];

      if (tab.primary) {
        if (skipPrimary) return null;
        return (
          <Group key={tab.name}>
            <Circle cx={cx} cy={BAR_CY} r={CREATE_D / 2} color={ACTIVE_COLOR} />
            <Group transform={transform}>
              {TAB_ICON_PATHS[i].map((path, j) => (
                <Path
                  key={j}
                  path={path}
                  style="stroke"
                  strokeWidth={CREATE_STROKE / scale}
                  strokeCap="round"
                  strokeJoin="round"
                  color="#ffffff"
                />
              ))}
            </Group>
          </Group>
        );
      }

      return (
        <Group key={tab.name} transform={transform}>
          {TAB_ICON_PATHS[i].map((path, j) => (
            <Path
              key={j}
              path={path}
              style="stroke"
              strokeWidth={ICON_STROKE_WIDTH}
              strokeCap="round"
              strokeJoin="round"
              color={color}
            />
          ))}
        </Group>
      );
    })}
  </>
);

const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const [width, setWidth] = useState(0);

  const slots = useMemo(
    () =>
      TAB_ICONS.map((tab) => {
        const routeIndex = state.routes.findIndex((r) => r.name === tab.name);
        return routeIndex === -1
          ? null
          : { route: state.routes[routeIndex], routeIndex };
      }),
    [state.routes],
  );

  const activeSlot = useMemo(() => {
    const i = slots.findIndex((s) => s && s.routeIndex === state.index);
    return i === -1 ? 0 : i;
  }, [slots, state.index]);

  const widthSV = useSharedValue(0);
  const bubbleX = useSharedValue(0);
  const press = useSharedValue(0);
  const liquid = useSharedValue(0);
  const stretch = useSharedValue(0);
  const prevBubbleX = useSharedValue(0);
  const committed = useSharedValue(false);
  const isDragging = useSharedValue(false);
  const activeSlotSV = useSharedValue(activeSlot);

  useEffect(() => {
    activeSlotSV.value = activeSlot;
  }, [activeSlot, activeSlotSV]);

  const handleTabPress = useCallback(
    (slotIndex: number) => {
      const slot = slots[slotIndex];
      if (!slot) return;
      const { route, routeIndex } = slot;
      const isFocused = state.index === routeIndex;
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    },
    [slots, state.index, navigation],
  );

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setWidth(w);
    widthSV.value = w;
  };

  const settleAndNavigate = (w: number, index: number) => {
    "worklet";
    committed.value = true;
    press.value = withSequence(
      withTiming(1, { duration: PRESS_UP_MS }),
      withTiming(0, { duration: PRESS_DOWN_MS }),
    );
    liquid.value = withSequence(
      withTiming(1, { duration: LIQUID_MS }),
      withTiming(0, { duration: LIQUID_MS }),
    );
    bubbleX.value = withSpring(slotCenterX(w, index), SPRING_SLIDE);
    scheduleOnRN(handleTabPress, index);
  };

  const gesture = Gesture.Pan()
    .minDistance(0)
    .onBegin((e) => {
      const w = widthSV.value;
      isDragging.value = true;
      committed.value = false;
      stretch.value = 0;
      press.value = withTiming(1, { duration: PRESS_UP_MS });
      liquid.value = withTiming(1, { duration: LIQUID_MS });
      bubbleX.value = withSpring(
        slotCenterX(w, slotFromX(w, e.x + BAR_MARGIN_X)),
        SPRING_SLIDE,
      );
    })
    .onUpdate((e) => {
      const w = widthSV.value;
      bubbleX.value = rubberBand(
        e.x + BAR_MARGIN_X,
        slotCenterX(w, 0),
        slotCenterX(w, TAB_COUNT - 1),
      );
    })
    .onEnd((e) => {
      const w = widthSV.value;
      const x = rubberBand(
        e.x + BAR_MARGIN_X,
        slotCenterX(w, 0),
        slotCenterX(w, TAB_COUNT - 1),
      );
      settleAndNavigate(w, slotFromX(w, x));
    })
    .onFinalize(() => {
      isDragging.value = false;
      if (!committed.value) {
        press.value = withTiming(0, { duration: PRESS_DOWN_MS });
        liquid.value = withTiming(0, { duration: LIQUID_MS });
      }
    });

  const tap = Gesture.Tap()
    .maxDistance(20)
    .maxDuration(100000)
    .onEnd((e) => {
      const w = widthSV.value;
      settleAndNavigate(w, slotFromX(w, e.x + BAR_MARGIN_X));
    });

  const composed = Gesture.Race(gesture, tap);

  useAnimatedReaction(
    () => ({
      w: widthSV.value,
      slot: activeSlotSV.value,
      dragging: isDragging.value,
    }),
    (curr, prev) => {
      if (curr.w === 0 || curr.dragging) return;
      if (prev && curr.w === prev.w && curr.slot === prev.slot) return;
      bubbleX.value = withSpring(slotCenterX(curr.w, curr.slot), SPRING_SLIDE);
    },
  );

  useFrameCallback((frame) => {
    const dt = frame.timeSincePreviousFrame ?? 16;
    const velocity =
      dt > 0 ? ((bubbleX.value - prevBubbleX.value) / dt) * 1000 : 0;
    prevBubbleX.value = bubbleX.value;
    stretch.value = withSpring(stretchFromVelocity(velocity), SPRING_STRETCH);
  });

  const bubbleRRect = useDerivedValue(() => {
    const { w, h } = bubbleSize(liquid.value, stretch.value);
    return rrect(
      rect(bubbleX.value - w / 2, BAR_CY - h / 2, w, h),
      h / 2,
      h / 2,
    );
  });

  const bubbleCenter = useDerivedValue(() => vec(bubbleX.value, BAR_CY));
  const bubbleFill = useDerivedValue(() =>
    interpolateColors(
      liquid.value,
      [0, 1],
      [BUBBLE_REST_FILL, BUBBLE_GLASS_FILL],
    ),
  );
  const crispOpacity = useDerivedValue(() => liquid.value);
  const glowOpacity = useDerivedValue(() => liquid.value);
  const barTransform = useDerivedValue(() => {
    const pillW = widthSV.value - BAR_MARGIN_X * 2;
    const sx = pillW > 0 ? 1 + (BAR_PRESS_DELTA / pillW) * press.value : 1;
    const sy = 1 + (BAR_PRESS_DELTA / 2 / BAR_H) * press.value;
    return [{ scaleX: sx }, { scaleY: sy }];
  });

  const pillRRect = useMemo(
    () =>
      rrect(
        rect(BAR_MARGIN_X, PAD_V, width - BAR_MARGIN_X * 2, BAR_H),
        BAR_H / 2,
        BAR_H / 2,
      ),
    [width],
  );

  return (
    <View pointerEvents="box-none" style={styles.wrapper} onLayout={onLayout}>
      <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
        {width > 0 && (
          <>
            <Group clip={bubbleRRect} invertClip>
              <Group transform={barTransform} origin={vec(width / 2, BAR_CY)}>
                <BarBackground pillRRect={pillRRect} width={width} />
              </Group>
            </Group>

            <Group clip={bubbleRRect}>
              <BarBackground pillRRect={pillRRect} width={width} />
              <RoundedRect rect={bubbleRRect} color={bubbleFill} />
            </Group>

            <Group transform={barTransform} origin={vec(width / 2, BAR_CY)}>
              <TabIcons width={width} color={INACTIVE_COLOR} />
            </Group>
            <Group clip={bubbleRRect}>
              <Group transform={barTransform} origin={vec(width / 2, BAR_CY)}>
                <TabIcons width={width} color={ACTIVE_COLOR} skipPrimary />
              </Group>
            </Group>

            <Group opacity={glowOpacity}>
              <RoundedRect rect={bubbleRRect} style="stroke" strokeWidth={3}>
                <SweepGradient
                  c={bubbleCenter}
                  colors={RIM_GLOW_COLORS}
                  positions={RIM_POSITIONS}
                />
                <BlurMask blur={1.5} style="normal" />
              </RoundedRect>
            </Group>

            <Group opacity={crispOpacity}>
              <RoundedRect rect={bubbleRRect} style="stroke" strokeWidth={1}>
                <SweepGradient
                  c={bubbleCenter}
                  colors={RIM_CRISP_COLORS}
                  positions={RIM_POSITIONS}
                />
              </RoundedRect>
            </Group>
          </>
        )}
      </Canvas>

      <GestureDetector gesture={composed}>
        <View style={styles.touchArea} />
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: BAR_BOTTOM - PAD_V,
    height: CANVAS_H,
  },
  touchArea: {
    position: "absolute",
    left: BAR_MARGIN_X,
    right: BAR_MARGIN_X,
    top: PAD_V,
    height: BAR_H,
  },
});

export default CustomTabBar;
