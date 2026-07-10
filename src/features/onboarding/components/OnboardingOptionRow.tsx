import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { Check } from "lucide-react-native";
import { memo, ReactNode } from "react";
import { View } from "react-native";
import { withUniwind } from "uniwind";

const CheckIcon = withUniwind(Check);

export interface OnboardingOptionRowProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  leftElement?: ReactNode;
}

const OnboardingOptionRow = ({
  label,
  selected,
  onPress,
  leftElement,
}: OnboardingOptionRowProps) => {
  return (
    <Button
      color="white"
      isShadow={false}
      activeOpacity={0.85}
      onPress={onPress}
      className={`h-11.25 rounded-xl border px-4 py-0 
                ${
                  selected
                    ? "border-primary bg-secondary-soft"
                    : "border-input-border bg-white"
                }
                `}
    >
      <View className="w-full flex-row items-center justify-between">
        {leftElement}

        <Text variant="body15Regular" className="leading-5.5 text-label">
          {label}
        </Text>

        {selected ? (
          <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
            <CheckIcon size={16} colorClassName="accent-white" strokeWidth={2.5} />
          </View>
        ) : null}
      </View>
    </Button>
  );
};

export default memo(OnboardingOptionRow);
