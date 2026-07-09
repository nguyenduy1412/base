import {
  type ViewProps,
  type StyleProp,
  type ViewStyle,
  type DimensionValue,
} from "react-native";

export interface SkeletonProps extends ViewProps {
  /**
   * Tailwind classNames to apply to the container view.
   * Can be used to set background colors, border radius, width, height, etc.
   */
  className?: string;

  /**
   * Width of the skeleton.
   * Can be a number (pixels) or percentage string.
   */
  width?: DimensionValue;

  /**
   * Height of the skeleton.
   */
  height?: DimensionValue;

  /**
   * Border radius. Can be a number, 'square' (0), or 'round' (large pill).
   */
  radius?: number | "square" | "round";

  /**
   * Color mode for the skeleton theme.
   */
  colorMode?: "light" | "dark";

  /**
   * Direction of the shimmer animation.
   * @default 'ltr'
   */
  direction?: "ltr" | "rtl";

  /**
   * Duration of one full shimmer cycle in milliseconds.
   * @default 1500
   */
  duration?: number;

  /**
   * Optional custom inline styles.
   */
  style?: StyleProp<ViewStyle>;
}
