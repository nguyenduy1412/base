import { type TextVariant } from "@/components/Text";
import {
  type TextInputProps as RNTextInputProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

export interface TextInputProps extends Omit<RNTextInputProps, "style"> {
  label?: string;
  labelClassName?: string;
  labelVariant?: TextVariant;
  className?: string;
  containerClassName?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  placeholderTextColorClassName?: string;
  inputContainerClassName?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  error?: string;
  errorClassName?: string;
  required?: boolean;
  innerShadow?: boolean;
  iconError?: React.ReactNode;
  type?:
    | "text"
    | "password"
    | "email"
    | "phone"
    | "number"
    | "url"
    | "search"
    | (string & {});
}
