// components/SelectBottomSheet.tsx
import { AppBottomSheet } from "@/components/BottomSheet";
import Text from "@/components/Text";
import CheckBox from "@/components/CheckBox";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef, memo } from "react";
import { View } from "react-native";
import { SelectOption } from "../constants/onboarding";
import BottomSheetItem from "./BottomSheetItem";
import OnboardingFooter from "./OnboardingFooter";

interface SelectBottomSheetProps {
  title?: string;
  options: SelectOption[]; // nhận từ ngoài, không hardcode
  selectedValue?: string;
  onSelect: (value: string) => void;
  onDone: () => void;
}

const SelectBottomSheet = forwardRef<BottomSheetModal, SelectBottomSheetProps>(
  ({ title, options, selectedValue, onSelect, onDone }, ref) => {
    return (
      <AppBottomSheet ref={ref} enableDynamicSizing={true}>
        <View className="px-5 pb-safe">
          <View className="py-2.5">
            <Text variant="body32Semibold">{title}</Text>
          </View>
          <View className="h-3" />

          <View className="pb-4">
            {options.map((item, index) => {
              const isSelected = item.value === selectedValue;
              const isLasted = index === options.length - 1;
              return (
                <BottomSheetItem
                  key={item.value}
                  item={item}
                  isSelected={isSelected}
                  isLasted={isLasted}
                  onPress={onSelect}
                  leftElement={
                    <CheckBox isCircle isSelected={isSelected} size={18} />
                  }
                  centerElement={
                    <View>
                      <Text variant="body16Regular">{item.label}</Text>
                    </View>
                  }
                />
              );
            })}
          </View>

          <OnboardingFooter label="Done" disabled={false} onPress={onDone} />
        </View>
      </AppBottomSheet>
    );
  },
);

SelectBottomSheet.displayName = "SelectBottomSheet";
export default memo(SelectBottomSheet);
