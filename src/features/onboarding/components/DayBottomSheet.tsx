import { AppBottomSheet } from "@/components/BottomSheet";
import Text from "@/components/Text";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef, memo } from "react";
import { View } from "react-native";
import CheckBox from "@/components/CheckBox";
import { BIRTHDAYS } from "../constants/birthdays";
import BottomSheetItem from "./BottomSheetItem";
import OnboardingFooter from "./OnboardingFooter";

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
      <AppBottomSheet ref={ref}>
        <View className="px-5 pb-safe flex-1">
          <View className="py-2.5">
            <Text variant="body32Semibold">{title}</Text>
          </View>
          <View className="h-3" />

          <BottomSheetFlatList
            data={BIRTHDAYS}
            keyExtractor={(item) => item.value}
            className="flex-1"
            style={{ flex: 1 }}
            contentContainerClassName="pb-4"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
            renderItem={({ item, index }) => {
              const isSelected = item.value === selectedValue;
              const isLasted = index === BIRTHDAYS.length - 1;

              return (
                <BottomSheetItem
                  item={item}
                  isSelected={isSelected}
                  isLasted={isLasted}
                  //   matchedIndices={item.matchedIndices}
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
            }}
          />

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
