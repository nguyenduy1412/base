import { ReactNode, memo } from "react";
import { View } from "react-native";

import { Button } from "@/components/Button";
import { Text } from "@/components/Text";

export interface OnboardingSelectFieldProps {
  label: string;
  placeholder: string;
  value?: string;
  required?: boolean;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onPress?: () => void;
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
}: OnboardingSelectFieldProps) => {
  const hasValue = Boolean(value);

  return (
    <View className="w-full gap-2">
      <View className="flex-row gap-1">
        <Text variant="body14Regular" className="text-[#49504D]">
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
        className={`w-full h-12 rounded-xl border px-4 py-0 ${
          error ? "border-[#DC2626]" : "border-[#D7DAD9]"
        }`}
      >
        <View className="w-full flex-row items-center gap-3">
          {leftIcon ? <View className="h-6 w-6">{leftIcon}</View> : null}

          <Text
            variant="body15Regular"
            numberOfLines={1}
            className={`flex-1 leading-5.5 ${
              hasValue ? "text-[#313533]" : "text-[#AFB6B3]"
            }`}
          >
            {hasValue ? value : placeholder}
          </Text>

          {rightIcon ? <View className="h-6 w-6">{rightIcon}</View> : null}
        </View>
      </Button>

      {error ? (
        <Text variant="body13Regular" className="text-[#DC2626]">
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default memo(OnboardingSelectField);
