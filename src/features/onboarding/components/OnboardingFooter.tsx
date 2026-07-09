import { Button } from "@/components/Button";
import { memo } from "react";
import { View } from "react-native";

export interface OnboardingFooterProps {
  label?: string;
  disabled?: boolean;
  onPress?: () => void;
}

const OnboardingFooter = ({
  label,
  disabled,
  onPress,
}: OnboardingFooterProps) => {
  return (
    <>
      <View className="pb-3">
        <Button
          title={label ?? "Continue"}
          color={"primary"}
          disabled={true}
          variant="body14Semibold"
          onPress={onPress}
          isShadow={false}
        />
      </View>
      <View className="bg-primary h-10 w-full"></View>
    </>
  );
};

export default memo(OnboardingFooter);
