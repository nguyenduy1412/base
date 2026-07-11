import Button from "@/components/Button";
import { memo, ReactNode } from "react";
import { View } from "react-native";

import type { BreedItem } from "../constants/breeds";
import HighlightedBreedLabel from "./HighlightedBreedLabel";

export interface BottomSheetContentItemProps {
  item: BreedItem;
  matchedIndices?: number[];
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onPress: (value: string) => void;
}

const BottomSheetContentItem = ({
  item,
  matchedIndices,
  leftIcon,
  rightIcon,
  onPress,
}: BottomSheetContentItemProps) => {
  const handleSelect = () => {
    onPress(item?.value);
  };

  return (
    <Button
      color="white"
      isShadow={false}
      activeOpacity={0.85}
      onPress={handleSelect}
      className="h-14 rounded-none border-b border-border px-0 py-0"
    >
      <View className="w-full flex-row items-center justify-between">
        <View className="min-w-0 flex-1 flex-row items-center gap-2">
          {leftIcon}

          <View className="min-w-0 flex-1">
            <HighlightedBreedLabel
              label={item.label}
              matchedIndices={matchedIndices}
            />
          </View>
        </View>

        {rightIcon}
      </View>
    </Button>
  );
};

export default memo(BottomSheetContentItem);
