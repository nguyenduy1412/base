import Button from "@/components/Button";
import { memo, ReactNode } from "react";
import { View } from "react-native";

import Text from "@/components/Text";
import { cn } from "@/utils/cn";
import { Calendar } from "lucide-react-native";
import type { SelectOption } from "../constants/onboarding";

export interface BottomSheetItemProps {
  item: SelectOption;
  isSelected?: boolean;
  isLasted?: boolean;
  matchedIndices?: number[];
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  centerElement?: ReactNode;
  className?: string;
  onPress: (value: string) => void;
}

const BottomSheetItem = ({
  item,
  isSelected,
  isLasted,
  matchedIndices,
  leftElement,
  rightElement,
  centerElement,
  className,
  onPress,
}: BottomSheetItemProps) => {
  const handleSetBirthDay = () => {
    onPress(item?.value);
  };

  return (
    <>
      <Button
        color="white"
        isShadow={false}
        activeOpacity={0.85}
        onPress={handleSetBirthDay}
        className={cn(
          `h-14 rounded-[12px] border-[0.75px] px-4 py-3 mb-3`,
          isSelected ? "border-secondary bg-divider" : "border-border",
          className,
        )}
      >
        <View className="w-full flex-row items-center  justify-between">
          <View className="min-w-0 flex-1 flex-row items-center gap-3">
            <View pointerEvents="none">{leftElement}</View>

            <View className="min-w-0 flex-1">{centerElement}</View>
          </View>

          <View pointerEvents="none">{rightElement}</View>
        </View>
      </Button>
      {isSelected && !isLasted ? (
        <Button
          color="white"
          isShadow={false}
          activeOpacity={0.85}
          onPress={handleSetBirthDay}
          className={cn(
            `h-14 rounded-[12px] border-[0.75px] px-4 py-3 mb-3`,
            isSelected ? "border-border" : "border-border",
            className,
          )}
        >
          <View className="w-full flex-row items-center  justify-between">
            <View className="min-w-0 flex-1 flex-row items-center gap-3">
              <View className="min-w-0 flex-1">
                <Text variant="body16Regular" className="text-placeholder">
                  {item.label === "I know the exact date"
                    ? "Select birthday (DD/MM/YYYY)"
                    : item.label === "Just the year"
                      ? "Select year (YYYY)"
                      : null}
                </Text>
              </View>
            </View>

            <Calendar size={24} strokeWidth={2} />
          </View>
        </Button>
      ) : null}
    </>
  );
};

export default memo(BottomSheetItem);
