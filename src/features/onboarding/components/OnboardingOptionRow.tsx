import { Button } from "@/components/Button";
import { Check } from "lucide-react-native";
import { memo, ReactNode } from "react";
import { Text, View } from "react-native";

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
      className={`w-full h-11.25 rounded-xl border px-4 py-0 
                ${selected ? "border-[#3B7A57] bg-[#EBF2EE]" : "border-[#D7DAD9] bg-white"}
                `}
    >
      <View className="w-full flex-row items-center justify-between">
        {leftElement}

        <Text className="text-[15px] leading-5.5 text-[#49504D]">{label}</Text>

        {selected ? (
          <View className="h-6 w-6 items-center justify-center rounded-full bg-[#3B7A57]">
            <Check size={16} color="#FFFFFF" strokeWidth={2.5} />
          </View>
        ) : null}
      </View>
    </Button>
  );
};

export default memo(OnboardingOptionRow);
