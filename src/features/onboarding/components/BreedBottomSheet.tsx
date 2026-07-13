import React, { forwardRef } from "react";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { AppBottomSheet } from "@/components/BottomSheet";
import BottomSheetContentItem from "./BottomSheetContentItem";
import Icon from "@/assets/svg/Icon";
import CheckBox from "@/components/CheckBox";
import { View } from "react-native";
import OnboardingFooter from "./OnboardingFooter";
import Text from "@/components/Text";
import OnboardingSearchField from "./OnboardingSearchField";
import { useBreedSearch } from "../hooks/useBreedSearch";

interface BreedBottomSheetProps {
  selectedValue?: string;
  onSelect: (value: string) => void;
  onDone: () => void;
}

const BreedBottomSheet = forwardRef<BottomSheetModal, BreedBottomSheetProps>(
  ({ selectedValue, onSelect, onDone }, ref) => {
    const { breeds, isError, isLoading, query, setQuery } = useBreedSearch();

    const handleDone = () => {
      onDone();
    };

    const handleSelect = (value: string) => {
      onSelect(value);
    };
    return (
      <AppBottomSheet ref={ref}>
        <View className="px-5 pb-safe flex-1">
          <OnboardingSearchField
            label=""
            placeholder="Search breed"
            value={query}
            onChangeText={setQuery}
            containerClassName="mb-4"
          />
          <View className="h-2"></View>

          <BottomSheetFlatList
            data={breeds}
            keyExtractor={(item) => item.value}
            className="flex-1"
            style={{ flex: 1 }}
            contentContainerClassName="pb-4"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
            ListEmptyComponent={
              <View className="items-center py-8">
                <Text variant="body14Regular" className="text-placeholder">
                  {isLoading
                    ? "Loading breeds..."
                    : isError
                      ? "Could not load breeds"
                      : "No breeds found"}
                </Text>
              </View>
            }
            renderItem={({ item }) => {
              const isSelected = item.value === selectedValue;

              return (
                <BottomSheetContentItem
                  item={item}
                  matchedIndices={item.matchedIndices}
                  onPress={handleSelect}
                  leftIcon={<Icon name={item.iconName} />}
                  rightIcon={
                    <CheckBox isCircle isSelected={isSelected} size={18} />
                  }
                />
              );
            }}
          />

          <View className="h-2"></View>

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

BreedBottomSheet.displayName = "BreedBottomSheet";

export default BreedBottomSheet;
