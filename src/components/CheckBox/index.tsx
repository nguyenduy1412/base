import { cn } from "@/utils/cn";
import { Check } from "lucide-react-native";
import { memo } from "react";
import { Pressable, View } from "react-native";
import { withUniwind } from "uniwind";

const CheckIcon = withUniwind(Check);

export interface CheckBoxProps {
  isSelected: boolean;
  isCircle?: boolean;
  size?: number;
  className?: string;
  disabled?: boolean;
  iconClassName?: string;
  onPress?: () => void;
}

const CheckBox = ({
  isSelected,
  isCircle,
  size = 20,
  className,
  disabled,
  iconClassName,
  onPress,
}: CheckBoxProps) => {
  const isRadio = Boolean(isCircle);
  const boxSize = size;
  const radioDotSize = boxSize * 0.72;
  const checkSize = boxSize * 0.6;
  const borderWidth = isRadio
    ? Math.max(1, boxSize * 0.07)
    : Math.max(2, boxSize * 0.1);
  const checkStrokeWidth = Math.max(3, boxSize * 0.2);

  const boxClassName = isRadio
    ? isSelected
      ? "rounded-full border-primary"
      : "rounded-full border-text-strong"
    : isSelected
      ? "rounded-[4px] border-primary bg-primary"
      : "rounded-[4px] border-border bg-white";
  const isDisabled = Boolean(disabled);

  return (
    <Pressable
      disabled={isDisabled}
      hitSlop={8}
      onPress={onPress}
      style={{ borderWidth, height: boxSize, width: boxSize }}
      className={cn("items-center justify-center", boxClassName, className)}
    >
      {isSelected && isRadio ? (
        <View
          style={{ height: radioDotSize, width: radioDotSize }}
          className={cn("rounded-full bg-primary", iconClassName)}
        />
      ) : null}

      {isSelected && !isRadio ? (
        <CheckIcon
          size={checkSize}
          colorClassName="accent-white"
          strokeWidth={checkStrokeWidth}
        />
      ) : null}
    </Pressable>
  );
};

export default memo(CheckBox);
