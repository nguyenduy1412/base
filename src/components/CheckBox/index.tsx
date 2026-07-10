import { Check } from "lucide-react-native";
import { memo } from "react";
import { View } from "react-native";

export interface CheckBoxProps {
  isSelected: boolean;
  isCircle?: boolean;
}

const CheckBox = ({ isSelected, isCircle }: CheckBoxProps) => {
  const isRadio = Boolean(isCircle);

  const boxClassName = isRadio
    ? isSelected
      ? "h-[15px] w-[15px] rounded-full border border-primary"
      : "h-[16.5px] w-[16.5px] rounded-full border border-text-strong"
    : isSelected
      ? "h-[15px] w-[15px] rounded-[4px] border-2 border-primary bg-primary"
      : "h-[15px] w-[15px] rounded-[4px] border-2 border-border bg-white";

  return (
    <View className="h-5 w-5 items-center justify-center">
      <View className={`items-center justify-center ${boxClassName}`}>
        {isSelected && isRadio ? (
          <View className="h-[11px] w-[11px] rounded-full bg-primary" />
        ) : null}

        {isSelected && !isRadio ? (
          <Check size={8} color="#FFFFFF" strokeWidth={3} />
        ) : null}
      </View>
    </View>
  );
};

export default memo(CheckBox);
