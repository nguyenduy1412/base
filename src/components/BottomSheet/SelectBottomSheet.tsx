import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Check } from "lucide-react-native";
import { forwardRef } from "react";
import { View } from "react-native";
import { withUniwind } from "uniwind";

import { AppBottomSheet } from "@/components/BottomSheet";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";

const CheckIcon = withUniwind(Check);

export type SelectBottomSheetOption = {
  label: string;
  value: string;
};

type SelectBottomSheetProps = {
  title: string;
  options: SelectBottomSheetOption[];
  selectedValue?: string;
  onSelect: (option: SelectBottomSheetOption) => void;
};

export const SelectBottomSheet = forwardRef<
  BottomSheetModal,
  SelectBottomSheetProps
>(function SelectBottomSheet({ title, options, selectedValue, onSelect }, ref) {
  return (
    <AppBottomSheet ref={ref} title={title}>
      <View className="gap-3">
        {options.map((option) => {
          const selected = option.value === selectedValue;

          return (
            <Button
              key={option.value}
              color="white"
              isShadow={false}
              activeOpacity={0.85}
              onPress={() => onSelect(option)}
              className={`w-full h-11.25 rounded-xl border px-4 py-0 ${
                selected
                  ? "border-primary bg-secondary-soft"
                  : "border-input-border bg-white"
              }`}
            >
              <View className="w-full flex-row items-center justify-between">
                <Text
                  variant="body15Regular"
                  className="leading-5.5 text-label"
                >
                  {option.label}
                </Text>

                {selected ? (
                  <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <CheckIcon
                      size={16}
                      colorClassName="accent-white"
                      strokeWidth={2.5}
                    />
                  </View>
                ) : null}
              </View>
            </Button>
          );
        })}
      </View>
    </AppBottomSheet>
  );
});

SelectBottomSheet.displayName = "SelectBottomSheet";
