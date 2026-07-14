import { memo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import Tooltip, { Placement } from "react-native-tooltip-2";
import { t } from "@lingui/core/macro";
import Text from "@/components/Text";
import OnboardingScreen from "@/features/onboarding/components/OnboardingScreen";
import OnboardingSelectField from "@/features/onboarding/components/OnboardingSelectField";
import { SelectBottomSheet } from "@/components/BottomSheet/SelectBottomSheet";

import {
  AGES,
  FOOD_TYPES,
  HOMES,
  ONBOARDING_TOTAL_STEPS,
  SIZES,
  VIBES,
} from "@/features/onboarding/constants/onboarding";
import {
  tellUsAboutFormValues,
  tellUsAboutSchema,
} from "@/features/onboarding/schemas/onboarding";
import { useOnboardingStore } from "@/store/onboardingStore";
import OnboardingFooter from "../OnboardingFooter";
import {
  FieldConfig,
  useSharedBottomSheet,
} from "../../hooks/useSharedBottomSheet";

export interface TellUsAboutStepProps {
  onBack?: () => void;
  onContinue?: () => void;
}

const FIELD_CONFIGS: FieldConfig<tellUsAboutFormValues>[] = [
  { name: "age", label: "Age", options: AGES },
  { name: "size", label: "Size", options: SIZES },
  { name: "foodType", label: "Food Type", options: FOOD_TYPES },
  { name: "vibe", label: "Vibe", options: VIBES },
  { name: "home", label: "Home", options: HOMES },
];

const TellUsAboutStep = ({ onBack, onContinue }: TellUsAboutStepProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tellUsAbout = useOnboardingStore((state) => state.tellUsAbout);
  const setTellUsAbout = useOnboardingStore((state) => state.setTellUsAbout);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<tellUsAboutFormValues>({
    defaultValues: tellUsAbout,
    mode: "onChange",
    resolver: zodResolver(tellUsAboutSchema),
  });

  const {
    sheetRef,
    activeField,
    openSheet,
    closeSheet,
    handleSelect,
    getSelectedLabel,
    getSelectedValue,
  } = useSharedBottomSheet(control, setValue, FIELD_CONFIGS);

  const onSubmit = (values: tellUsAboutFormValues) => {
    setTellUsAbout(values);
    // onContinue?.();
  };

  return (
    <OnboardingScreen
      currentStep={2}
      totalSteps={ONBOARDING_TOTAL_STEPS}
      canGoBack={true}
      onBack={onBack}
      footer={
        <OnboardingFooter
          // disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        />
      }
    >
      <View className="gap-5 flex-1">
        <View className="h-0" />

        <Tooltip
          isVisible={isTooltipVisible}
          onClose={() => setIsTooltipVisible(false)}
          placement={Placement.TOP}
          backgroundColor="transparent"
          disableShadow
          arrowSize={{ width: 28, height: 14 }}
          childContentSpacing={6}
          contentStyle={{
            backgroundColor: "#72B7BA",
            borderColor: "#FFFFFF",
            borderRadius: 22,
            borderWidth: 3,
            paddingHorizontal: 28,
            paddingVertical: 14,
          }}
          content={
            <Text variant="body16Regular" className="text-white">
              Personalise rewards and alerts
            </Text>
          }
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Show information about Bella"
            onPress={() => setIsTooltipVisible((visible) => !visible)}
          >
            <Text
              variant="body32Semibold"
              className="mb-2 font-serif text-[32px] leading-9.5 text-text-heading"
            >
              Tell us about Bella
            </Text>
          </Pressable>
        </Tooltip>

        <Controller
          control={control}
          name="age"

          render={() => (
            <OnboardingSelectField
              required
              label={t`Age`}
              placeholder="Select age"
              value={getSelectedLabel("age")}
              error={errors.age?.message}
              onPress={() => openSheet("age")}
              rightIcon={<ChevronDown size={24} strokeWidth={2} />}
            />
          )}
        />

        <Controller
          control={control}
          name="size"
          render={() => (
            <OnboardingSelectField
              required
              label="Size"
              placeholder="Select size"
              value={getSelectedLabel("size")}
              error={errors.size?.message}
              onPress={() => openSheet("size")}
              rightIcon={<ChevronDown size={24} strokeWidth={2} />}
            />
          )}
        />

        <Controller
          control={control}
          name="foodType"
          render={() => (
            <OnboardingSelectField
              required
              label="Food Type"
              placeholder="Select food type"
              value={getSelectedLabel("foodType")}
              error={errors.foodType?.message}
              onPress={() => openSheet("foodType")}
              rightIcon={<ChevronDown size={24} strokeWidth={2} />}
            />
          )}
        />

        <Controller
          control={control}
          name="vibe"
          render={() => (
            <OnboardingSelectField
              required
              label="Vibe"
              placeholder="Select vibe"
              value={getSelectedLabel("vibe")}
              error={errors.vibe?.message}
              onPress={() => openSheet("vibe")}
              rightIcon={<ChevronDown size={24} strokeWidth={2} />}
            />
          )}
        />

        <Controller
          control={control}
          name="home"
          render={() => (
            <OnboardingSelectField
              required
              label="Home"
              placeholder="Select home"
              value={getSelectedLabel("home")}
              error={errors.home?.message}
              onPress={() => openSheet("home")}
              rightIcon={<ChevronDown size={24} strokeWidth={2} />}
            />
          )}
        />

        <SelectBottomSheet
          ref={sheetRef}
          title={activeField?.label ?? ""}
          options={activeField?.options ?? []}
          selectedValue={getSelectedValue(activeField?.name)}
          onConfirm={(value) => handleSelect(value)}
          onDone={closeSheet}
        />

        <View className="h-14" />
      </View>
    </OnboardingScreen>
  );
};

export default memo(TellUsAboutStep);
