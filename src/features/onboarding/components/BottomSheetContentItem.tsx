import Button from "@/components/Button";
import Text from "@/components/Text";
import { memo, ReactNode } from "react";
import { View } from "react-native";

export const BREEDS: BottomSheetContentItemData[] = [
  {
    label: "LabradorRetriever",
    icon: "LabradorRetriever",
    isSelected: false,
  },
  {
    label: "GoldenRetriever",
    icon: "GolderRetriever",
    isSelected: false,
  },
  {
    label: "GermanShepherd",

    icon: "GermanShepherd",
    isSelected: false,
  },
  {
    label: "AlaskanMalamute",
    icon: "AlaskanMalamute",
    isSelected: false,
  },
  {
    label: "Samoyed",
    icon: "Samoyed",
    isSelected: false,
  },
];

export interface BottomSheetContentItemData {
  icon?: ReactNode;
  label?: string;
  isSelected: boolean;
}

export interface BottomSheetContentItemrops {
  item: BottomSheetContentItemData;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const BottomSheetContentItem = ({
  item,
  leftIcon,
  rightIcon,
}: BottomSheetContentItemrops) => {
  return (
    <Button
      color="white"
      isShadow={false}
      className="px-0 rounded-none h-14 border-[#F2F3F2] border-b"
    >
      <View className="w-full flex-row items-center justify-center ">
        <View className="flex-row items-center justify-start gap-2">
          {leftIcon}

          <View className="flex-1">
            <Text variant="body16Regular" className="text-label">
              {item?.label}
            </Text>
          </View>

          {rightIcon}
        </View>
      </View>
    </Button>
  );
};

export default memo(BottomSheetContentItem);
