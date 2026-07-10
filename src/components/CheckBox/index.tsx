import { cn } from "@/utils/cn";
import { Check } from "lucide-react-native";
import { memo } from "react";
import { View } from "react-native";
import { withUniwind } from "uniwind";

const CheckIcon = withUniwind(Check);

export interface CheckBoxProps {
  isSelected: boolean;
  isCircle?: boolean;
  className?: string;
  containerClassName?: string;
  iconClassName?: string;
}

const CheckBox = ({
  isSelected,
  isCircle,
  className,
  containerClassName,
  iconClassName,
}: CheckBoxProps) => {
  const isRadio = Boolean(isCircle);

  const boxClassName = isRadio
    ? isSelected
      ? "h-[15px] w-[15px] rounded-full border border-primary"
      : "h-[16.5px] w-[16.5px] rounded-full border border-text-strong"
    : isSelected
      ? "h-[15px] w-[15px] rounded-[4px] border-2 border-primary bg-primary"
      : "h-[15px] w-[15px] rounded-[4px] border-2 border-border bg-white";

  return (
    <View
      className={cn("h-5 w-5 items-center justify-center", containerClassName)}
    >
      <View
        className={cn("items-center justify-center", boxClassName, className)}
      >
        {isSelected && isRadio ? (
          <View
            className={cn(
              "h-[11px] w-[11px] rounded-full bg-primary",
              iconClassName,
            )}
          />
        ) : null}

        {isSelected && !isRadio ? (
          <CheckIcon size={8} colorClassName="accent-white" strokeWidth={5} />
        ) : null}
      </View>
    </View>
  );
};

export default memo(CheckBox);
