import { memo, useMemo } from "react";

import Icon from "@/assets/svg/Icon";
import { SelectBottomSheet } from "@/components/BottomSheet/SelectBottomSheet";
import { Text } from "@/components/Text";
import Tooltip from "@/components/Tooltip";
import OnboardingScreen from "@/features/onboarding/components/OnboardingScreen";
import OnboardingSelectField from "@/features/onboarding/components/OnboardingSelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ChevronDown } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import {
  GROOMING_FREQUENCY,
  ONBOARDING_TOTAL_STEPS,
} from "@/features/onboarding/constants/onboarding";
import {
  HEALTH_CONDITIONS,
  healthAndHabitsFormValues,
  healthAndHabitsSchema,
} from "@/features/onboarding/schemas/onboarding";
import { useOnboardingStore } from "@/store/onboardingStore";
import {
  FieldConfig,
  useSharedBottomSheet,
} from "../../hooks/useSharedBottomSheet";
import OnboardingFooter from "../OnboardingFooter";
import OnboardingSelectButton from "../OnboardingSelectButton";

export interface HealthAndHabitsStepProps {
  onBack?: () => void;
  onContinue?: () => void;
}

const FIELD_CONFIGS: FieldConfig<healthAndHabitsFormValues>[] = [
  {
    name: "groomingFrequency",
    label: "Grooming frequency",
    options: GROOMING_FREQUENCY,
  },
  {
    name: "trainingLevel",
    label: "Training level",
    options: GROOMING_FREQUENCY,
  },
  { name: "treats", label: "Treats", options: GROOMING_FREQUENCY },
  { name: "insurance", label: "Insurance", options: GROOMING_FREQUENCY },
  {
    name: "whereYourShop",
    label: "Where your shop",
    options: GROOMING_FREQUENCY,
  },
  {
    name: "monthlySpendOnDog",
    label: "Monthly spend on dog",
    options: GROOMING_FREQUENCY,
  },
];

const HealthAndHabitsStep = ({
  onBack,
  onContinue,
}: HealthAndHabitsStepProps) => {
  const { _ } = useLingui();
  const schema = useMemo(() => healthAndHabitsSchema(_), [_]);
  const healthAndHabits = useOnboardingStore((state) => state.healthAndHabits);
  const setHealthAndHabits = useOnboardingStore(
    (state) => state.setHealthAndHabits,
  );
  const identity = useOnboardingStore((state) => state.identity);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<healthAndHabitsFormValues>({
    defaultValues: healthAndHabits,
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

  // onContinue?.();
  const onSubmit = (values: healthAndHabitsFormValues) => {
    setHealthAndHabits(values);
    onContinue?.();
  };

  return (
    <OnboardingScreen
      currentStep={3}
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
          {t`${identity.dogName}’s Health & Habits`}
        </Text>

        <Controller
          control={control}
          name="healthConditions"
          render={({ field: { onChange, value }, fieldState }) => {
            const toggleCondition = (
              condition: (typeof HEALTH_CONDITIONS)[number],
            ) => {
              if (condition === "None") {
                onChange(value.includes("None") ? [] : ["None"]);
                return;
              }

              const conditionsWithoutNone = value.filter(
                (item) => item !== "None",
              );
              onChange(
                value.includes(condition)
                  ? conditionsWithoutNone.filter((item) => item !== condition)
                  : [...conditionsWithoutNone, condition],
              );
            };

            return (
              <View className="gap-2">
                <View className="flex-row items-center gap-1">
                  <Text variant="caption14Regular" className="text-label">
                    {t`Health conditions`}
                  </Text>
                  <Text variant="caption13Regular" className="text-error">
                    *
                  </Text>
                  <Tooltip
                    content={t`Surface relevant resources `}
                    placement="auto"
                    arrowAlignment="auto"
                    accessibilityLabel="Show health conditions information"
                  >
                    <Icon name="Infomation" size={16} />
                  </Tooltip>
                </View>

                <View className="flex-row flex-wrap gap-2">
                  {HEALTH_CONDITIONS.map((condition, index) => {
                    const isSelected = value.includes(condition);

                    return (
                      <View key={`${condition}-${index}`}>
                        <OnboardingSelectButton
                          item={condition}
                          isSelected={isSelected}
                          toggleCondition={toggleCondition}
                        />
                      </View>
                    );
                  })}
                </View>

                {fieldState.error ? (
                  <Text variant="caption13Regular" className="text-error">
                    {fieldState.error.message}
                  </Text>
                ) : null}
              </View>
            );
          }}
        />

        <Controller
          control={control}
          name="groomingFrequency"

          render={() => (
            <OnboardingSelectField
              required
              requireInformation
              tooltipContent={t`Helps us connect you with the right groomers in [Neighborhood] and surface grooming deals that match your schedule`}
              label={`Grooming frequency`}
              // label={t`Grooming frequency`}
              placeholder={t`Select grooming frequency`}
              value={getSelectedLabel("groomingFrequency")}
              error={errors.groomingFrequency?.message}
              onPress={() => openSheet("groomingFrequency")}
              rightIcon={<ChevronDown size={24} strokeWidth={2} />}
            />
          )}
        />

        <Controller
          control={control}
          name="trainingLevel"
          render={() => (
            <OnboardingSelectField
              required
              requireInformation
              tooltipContent={t`Helps us recommend the right training events, classes, and trainer profiles in [Neighborhood]`}
              label={t`Training level`}
              placeholder={t`Select training level`}
              value={getSelectedLabel("trainingLevel")}
              error={errors.trainingLevel?.message}
              onPress={() => openSheet("trainingLevel")}
              rightIcon={<ChevronDown size={24} strokeWidth={2} />}
            />
          )}
        />
        {/*  */}
        <Controller
          control={control}
          name="treats"
          render={() => (
            <OnboardingSelectField
              required
              requireInformation
              tooltipContent={t`Helps us recommend treats and rewards [Dog Name] will actually enjoy during training and play`}
              label={t`Treats`}
              placeholder={t`Select treats`}
              value={getSelectedLabel("treats")}
              error={errors.treats?.message}
              onPress={() => openSheet("treats")}
              rightIcon={<ChevronDown size={24} strokeWidth={2} />}
            />
          )}
        />

        <Controller
          control={control}
          name="insurance"
          render={() => (
            <OnboardingSelectField
              required
              requireInformation
              tooltipContent={t`Helps us show the most relevant vet resources and coverage options in your area. We'll never spam you`}
              label={t`Insurance`}
              placeholder={t`Select insurance`}
              value={getSelectedLabel("insurance")}
              error={errors.insurance?.message}
              onPress={() => openSheet("insurance")}
              rightIcon={<ChevronDown size={24} strokeWidth={2} />}
            />
          )}
        />

        <Controller
          control={control}
          name="whereYourShop"
          render={() => (
            <OnboardingSelectField
              required
              requireInformation
              tooltipContent={t`Helps us connect you with the best local deals and brands in [Neighborhood]. We work with partners who offer real discounts to Dogspotting members`}
              label={t`Where your shop`}
              placeholder={t`Select where your shop`}
              value={getSelectedLabel("whereYourShop")}
              error={errors.whereYourShop?.message}
              onPress={() => openSheet("whereYourShop")}
              rightIcon={<ChevronDown size={24} strokeWidth={2} />}
            />
          )}
        />
        <Controller
          control={control}
          name="monthlySpendOnDog"
          render={() => (
            <OnboardingSelectField
              required
              requireInformation
              tooltipContent={t`Helps us show you the discounts and deals that match your budget`}
              label={t`Monthly spend on dog`}
              placeholder={t`Select monthly spend on dog`}
              value={getSelectedLabel("monthlySpendOnDog")}
              error={errors.monthlySpendOnDog?.message}
              onPress={() => openSheet("monthlySpendOnDog")}
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

export default memo(HealthAndHabitsStep);
