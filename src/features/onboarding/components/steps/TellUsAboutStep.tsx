import { memo, useMemo } from "react";

import { SelectBottomSheet } from "@/components/BottomSheet/SelectBottomSheet";
import { Text } from "@/components/Text";
import OnboardingScreen from "@/features/onboarding/components/OnboardingScreen";
import OnboardingSelectField from "@/features/onboarding/components/OnboardingSelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ChevronDown } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

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
import {
  FieldConfig,
  useSharedBottomSheet,
} from "../../hooks/useSharedBottomSheet";
import OnboardingFooter from "../OnboardingFooter";

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
  const { _ } = useLingui();
  const schema = useMemo(() => tellUsAboutSchema(_), [_]);
  const tellUsAbout = useOnboardingStore((state) => state.tellUsAbout);
  const setTellUsAbout = useOnboardingStore((state) => state.setTellUsAbout);
  const identity = useOnboardingStore((state) => state.identity);
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<tellUsAboutFormValues>({
    defaultValues: tellUsAbout,
    mode: "onChange",
    resolver: zodResolver(schema),
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
    onContinue?.();
  };

  return (
    <OnboardingScreen
      currentStep={2}
      totalSteps={ONBOARDING_TOTAL_STEPS}
      canGoBack={true}
      onBack={onBack}
      footer={
        <OnboardingFooter
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        />
      }
    >
      <View className="gap-5 flex-1">
        <View className="h-0" />

        <Text
          variant="heading32Semibold"
          className="mb-2 font-serif text-[32px] leading-9.5 text-text-heading"
        >
          {t`Tell us about ${identity.dogName}`}
        </Text>

        <Controller
          control={control}
          name="age"

          render={() => (
            <OnboardingSelectField
              required
              requireInformation
              tooltipContent={t`Match with similar dogs nearby`}
              label={t`Age`}
              placeholder={t`Select age`}
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
              requireInformation
              tooltipContent={t`Recommend parks and events`}
              label={t`Size`}
              placeholder={t`Select size`}
              value={getSelectedLabel("size")}
              error={errors.size?.message}
              onPress={() => openSheet("size")}
              rightIcon={<ChevronDown size={24} strokeWidth={2} />}
            />
          )}
        />
        {/*  */}
        <Controller
          control={control}
          name="foodType"
          render={() => (
            <OnboardingSelectField
              required
              requireInformation
              tooltipContent={t`Personalise rewards and alerts`}
              label={t`Food Type`}
              placeholder={t`Select food type`}
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
              requireInformation
              tooltipContent={t`Match compatible dogs`}
              label={t`Vibe`}
              placeholder={t`Select vibe`}
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
              requireInformation
              tooltipContent={t`Show relevant content`}
              label={t`Home`}
              placeholder={t`Select home`}
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
