import {
  type TouchableOpacityProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { type TextVariant } from "@/components/Text";

export type ButtonColor =
  | "primary"
  | "text"
  | "background"
  | "background-element"
  | "background-selected"
  | "text-secondary"
  | "login-button"
  | "white"
  | "blue";

export interface ButtonProps extends Omit<TouchableOpacityProps, "style"> {
  className?: string;
  textClassName?: string;
  variant?: TextVariant; // maps to the variant prop of Text
  title?: string;
  isShadow?: boolean;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  color?: ButtonColor;
}
