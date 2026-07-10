import { Button } from "@/components/Button";
import { t } from "@lingui/core/macro";
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
          title={label ?? t`Continue`}
          color={"primary"}
          disabled={disabled}
          variant="body14Semibold"
          onPress={onPress}
          isShadow={false}
          className="h-12 rounded-xl"
        />
      </View>
    </>
  );
};

export default memo(OnboardingFooter);
