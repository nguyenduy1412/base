import {
  type ViewProps,
  type StyleProp,
  type ViewStyle,
  type DimensionValue,
} from "react-native";

export interface SkeletonProps extends ViewProps {
  className?: string;

  width?: DimensionValue;

  height?: DimensionValue;

  radius?: number | "square" | "round";

  colorMode?: "light" | "dark";

  direction?: "ltr" | "rtl";

  duration?: number;

  style?: StyleProp<ViewStyle>;
}
