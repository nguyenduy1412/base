import { AppBottomSheet } from "@/components/BottomSheet";
import CheckBox from "@/components/CheckBox";
import Text from "@/components/Text";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useState } from "react";
import { View } from "react-native";
import { SelectOption } from "@/features/onboarding/constants/onboarding";
import BottomSheetItem from "@/features/onboarding/components/BottomSheetItem";
import OnboardingFooter from "@/features/onboarding/components/OnboardingFooter";

type SelectBottomSheetProps = {
  title?: string;
  options: SelectOption[];
  selectedValue?: string;
  onConfirm: (value: string) => void;
  onDone: () => void;
};

export const SelectBottomSheet = forwardRef<
  BottomSheetModal,
  SelectBottomSheetProps
>(function SelectBottomSheet(
  { title, options, selectedValue, onConfirm, onDone },
  ref,
) {
  const [pendingValue, setPendingValue] = useState<string | undefined>(
    selectedValue,
  );

  const handlePresent = useCallback(() => {
    setPendingValue(selectedValue);
  }, [selectedValue]);

  const handleDone = () => {
    if (pendingValue !== undefined) {
      onConfirm(pendingValue);
    }
    onDone();
  };

  const handleSetPendingValue = useCallback((value: string) => {
    setPendingValue(value);
  }, []);

  return (
    <AppBottomSheet
      ref={ref}
      enableDynamicSizing={true}
      onPresent={handlePresent}
    >
      <View className="px-5 pb-safe">
        {title ? (
          <View className="py-2.5">
            <Text variant="body32Semibold">{title}</Text>
          </View>
        ) : null}
        <View className="h-3" />

        <View className="pb-4">
          {options.map((item) => {
            const isSelected = item.value === pendingValue;

            return (
              <BottomSheetItem
                key={item.value}
                item={item}
                isSelected={isSelected}
                isLasted={true}
                onPress={handleSetPendingValue}
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

        <OnboardingFooter label="Done" disabled={false} onPress={handleDone} />
      </View>
    </AppBottomSheet>
  );
});

SelectBottomSheet.displayName = "SelectBottomSheet";
