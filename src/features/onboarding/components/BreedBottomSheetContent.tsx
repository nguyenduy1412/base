import Icon from "@/assets/svg/Icon";
import CheckBox from "@/components/CheckBox";
import { Text } from "@/components/Text";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { memo } from "react";
import { View } from "react-native";
import { useBreedSearch } from "../hooks/useBreedSearch";
import BottomSheetContentItem from "./BottomSheetContentItem";
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
  const { breeds, isError, isLoading, query, setQuery } = useBreedSearch();

  const handleDone = () => {
    onDone();
  };

  return (
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
              onPress={() => onSelect(item.value)}
              leftIcon={<Icon name={item.iconName} />}
              rightIcon={
                <CheckBox isCircle isSelected={isSelected} size={18} />
              }
            />
          );
        }}
      />

      <View className="h-2"></View>

      <OnboardingFooter label="Done" disabled={false} onPress={handleDone} />
    </View>
  );
};

export default memo(BreedBottomSheetContent);
