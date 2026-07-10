import { animations } from "@/assets/animation";
import { Text } from "@/components/Text";
import { theme$ } from "@/store/theme";
import { cn } from "@/utils/cn";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useCSSVariable } from "uniwind";
import LottieView from "../Lottie";
import {
  fallbackColors,
  getShadowClass,
} from "./helpers";
import { type ButtonProps } from "./types";

export const Button = React.forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  ButtonProps
>(function Button(
  {
    className,
    textClassName,
    variant = "body16Bold",
    title,
    isShadow = true,
    isLoading = false,
    disabled = false,
    onPress,
    onLongPress,
    children,
    style,
    activeOpacity = 0.8,
    color = "primary",
    ...props
  },
  ref,
) {
  const isDisabled = disabled || isLoading;
  const isDark = theme$.mode.get() === "dark";

  const bgClass = `bg-${color}`;

  const cssVarName = `--color-${color}`;
  const resolvedBgColor = useCSSVariable(cssVarName) as string;
  const bgColorHex = resolvedBgColor ?? fallbackColors[color] ?? "#E23A36";

  const shadowClass = isShadow
    ? cn("shadow-md", getShadowClass(color, isDark, bgColorHex))
    : "";

  return (
    <TouchableOpacity
      ref={ref}
      disabled={isDisabled}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={activeOpacity}
      style={style}
      className={cn(
        "w-full rounded-full flex-row items-center justify-center px-6 py-3 android:disabled:opacity-60 ios:disabled:opacity-80 web:disabled:opacity-80 transition-all overflow-hidden relative",
        shadowClass,
        bgClass,
        className,
      )}
      {...props}
    >
      <View
        className={cn(
          "flex-row items-center justify-center w-full",
          isLoading && "opacity-0",
        )}
      >
        {children ? (
          children
        ) : (
          <Text
            variant={variant}
            className={cn("text-white text-center", textClassName)}
          >
            {title}
          </Text>
        )}
      </View>

      {isLoading && (
        <View
          pointerEvents="none"
          className="absolute inset-0 flex-row items-center justify-center pointer-events-none"
        >
          <LottieView
            autoPlay
            loop
            source={animations.spinner}
            className="w-[35px] h-[35px]"
          />
        </View>
      )}
    </TouchableOpacity>
  );
});

Button.displayName = "Button";

export default Button;
export * from "./types";
