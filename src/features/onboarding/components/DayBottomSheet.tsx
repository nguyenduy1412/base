import { AppBottomSheet } from "@/components/BottomSheet";
import { Text } from "@/components/Text";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef, memo } from "react";
import { View } from "react-native";
import CheckBox from "@/components/CheckBox";
import BottomSheetItem from "./BottomSheetItem";
import OnboardingFooter from "./OnboardingFooter";
import { BIRTHDAYS } from "../constants/onboarding";

export interface DayBottomSheetProps {
  title?: string;
  selectedValue?: string;
  onSelect: (value: string) => void;
  onDone: () => void;
}

const DayBottomSheet = forwardRef<BottomSheetModal, DayBottomSheetProps>(
  ({ title, selectedValue, onSelect, onDone }, ref) => {
    const handleSetBirthDay = (birthdayValue: string) => {
      onSelect(birthdayValue);
    };

    const handleDone = () => {
      onDone();
    };

    return (
      <AppBottomSheet ref={ref} enableDynamicSizing={true}>
        <View className="px-5 pb-safe">
          <View className="py-2.5">
            <Text variant="heading32Semibold">{title}</Text>
          </View>
          <View className="h-3" />

          <View className="pb-4">
            {BIRTHDAYS.map((item, index) => {
              const isSelected = item.value === selectedValue;
              const isLasted = index === BIRTHDAYS.length - 1;

              return (
                <BottomSheetItem
                  key={item.value}
                  item={item}
                  isSelected={isSelected}
                  isLasted={isLasted}
                  onPress={handleSetBirthDay}
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

          <OnboardingFooter
            label="Done"
            disabled={false}
            onPress={handleDone}
          />
        </View>
      </AppBottomSheet>
    );
  },
);

DayBottomSheet.displayName = "DayBottomSheet";

export default memo(DayBottomSheet);
