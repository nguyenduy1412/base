import Icon from "@/assets/svg/Icon";
import CheckBox from "@/components/CheckBox";
import { memo } from "react";
import { View } from "react-native";
import BottomSheetContentItem, { BREEDS } from "./BottomSheetContentItem";
import OnboardingFooter from "./OnboardingFooter";
import OnboardingSearchField from "./OnboardingSearchField";

export interface BreedBottomSheetContentProps {
  selectedValue?: string;
  onSelect: (value: string) => void;
  onDone: () => void;
}

const BreedBottomSheetContent = ({
  selectedValue,
  onSelect,
  onDone,
}: BreedBottomSheetContentProps) => {
  const handleSelect = (item: string) => {
    onSelect(item);
  };

  return (
    <View className="px-5 pb-safe ">
      <OnboardingSearchField
        label=""
        placeholder="Search breed"
        containerClassName="mb-4"
      />
      <View className="h-2"></View>

      <View>
        {BREEDS.map((item, index) => {
          return (
            <BottomSheetContentItem
              key={index}
              item={item}
              leftIcon={<Icon name={`${item.icon}`} />}
              rightIcon={
                <CheckBox isCircle isSelected={item?.isSelected} size={18} />
              }
            />
          );
        })}
      </View>

      <View className="h-2"></View>

      <OnboardingFooter label="Done" disabled={false} />
    </View>
  );
};

export default memo(BreedBottomSheetContent);
