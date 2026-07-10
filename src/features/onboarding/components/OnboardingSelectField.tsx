import { ReactNode, memo } from "react";
import { View } from "react-native";

import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

export interface OnboardingSelectFieldProps {
  label: string;
  placeholder: string;
  value?: string;
  required?: boolean;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onPress?: () => void;
  className?: string;
  containerClassName?: string;
  errorClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
}

const OnboardingSelectField = ({
  label,
  placeholder,
  value,
  required,
  error,
  leftIcon,
  rightIcon,
  onPress,
  className,
  containerClassName,
  errorClassName,
  labelClassName,
  valueClassName,
}: OnboardingSelectFieldProps) => {
  const hasValue = Boolean(value);

  return (
    <View className={cn("w-full gap-2", containerClassName)}>
      <View className="flex-row gap-1">
        <Text
          variant="body14Regular"
          className={cn("text-label", labelClassName)}
        >
          {label}
        </Text>
        {required ? (
          <Text variant="body13Regular" className="text-error">
            *
          </Text>
        ) : null}
      </View>

      <Button
        color="white"
        isShadow={false}
        activeOpacity={0.85}
        onPress={onPress}
        className={cn(
          "h-12 rounded-xl border px-4 py-0",
          error ? "border-error" : "border-input-border",
          className,
        )}
      >
        <View className="w-full flex-row items-center gap-3">
          {leftIcon ? <View className="h-6 w-6">{leftIcon}</View> : null}

          <Text
            variant="body15Regular"
            numberOfLines={1}
            className={cn(
              "flex-1 leading-5.5",
              hasValue ? "text-text-heading" : "text-placeholder",
              valueClassName,
            )}
          >
            {hasValue ? value : placeholder}
          </Text>

          {rightIcon ? <View className="h-6 w-6">{rightIcon}</View> : null}
        </View>
      </Button>

      {error ? (
        <Text
          variant="body13Regular"
          className={cn("text-error", errorClassName)}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default memo(OnboardingSelectField);
