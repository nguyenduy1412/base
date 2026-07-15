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
  AGES_RANGE,
  HEAR_ABOUT_US,
  ONBOARDING_TOTAL_STEPS,
} from "@/features/onboarding/constants/onboarding";
import {
  oneThingAboutYouFormValues,
  oneThingAboutYouSchema,
} from "@/features/onboarding/schemas/onboarding";
import { useOnboardingStore } from "@/store/onboardingStore";
import {
  FieldConfig,
  useSharedBottomSheet,
} from "../../hooks/useSharedBottomSheet";
import OnboardingFooter from "../OnboardingFooter";
import OnboardingTextField from "../OnboardingTextField";

export interface OneThingAboutYouStepProps {
  onBack?: () => void;
  onContinue?: () => void;
}

const FIELD_CONFIGS: FieldConfig<oneThingAboutYouFormValues>[] = [
  {
    name: "yourAgeRange",
    label: "Your age range",
    options: AGES_RANGE,
  },
  {
    name: "howDidYouHearAboutDogspotting",
    label: "How did you hear about Dogspotting?",
    options: HEAR_ABOUT_US,
  },
];

const OneThingAboutYouStep = ({
  onBack,
  onContinue,
}: OneThingAboutYouStepProps) => {
  const { _ } = useLingui();
  const schema = useMemo(() => oneThingAboutYouSchema(_), [_]);
  const oneThingAboutYou = useOnboardingStore(
    (state) => state.oneThingAboutYou,
  );
  const setOneThingAboutYou = useOnboardingStore(
    (state) => state.setOneThingAboutYou,
  );
  const identity = useOnboardingStore((state) => state.identity);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<oneThingAboutYouFormValues>({
    defaultValues: oneThingAboutYou,
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
  const onSubmit = (values: oneThingAboutYouFormValues) => {
    setOneThingAboutYou(values);
    onContinue?.();
  };

  return (
    <OnboardingScreen
      currentStep={4}
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

        <View>
          <Text
            variant="heading32Regular"
            className="mb-2.5 font-serif text-[32px] leading-9.5 text-text-heading"
          >
            {t`One tiny thing about you`}
          </Text>
          <Text variant="caption14Regular" className="mb-2.5 text-description">
            {t`Everything else in Dogspotting belongs to ${identity.dogName}. This is the only question that's about you. `}
          </Text>
        </View>

        <Controller
          control={control}
          name="firstName"
          render={({ field: { onBlur, onChange, value } }) => (
            <OnboardingTextField
              label="First name"
              required
              placeholder="Enter first name"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.firstName?.message}
              autoCapitalize="words"
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field: { onBlur, onChange, value } }) => (
            <OnboardingTextField
              label="Last name"
              required
              placeholder="Enter last name"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.lastName?.message}
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          control={control}
          name="yourAgeRange"

          render={() => (
            <OnboardingSelectField
              required
              requireInformation
              label={`Your age range`}
              placeholder={t`Select your age range`}
              value={getSelectedLabel("yourAgeRange")}
              error={errors.yourAgeRange?.message}
              onPress={() => openSheet("yourAgeRange")}
              rightIcon={<ChevronDown size={24} strokeWidth={2} />}
            />
          )}
        />

        <Controller
          control={control}
          name="howDidYouHearAboutDogspotting"
          render={() => (
            <OnboardingSelectField
              required
              requireInformation

              label={t`How did you hear about Dogspotting`}
              placeholder={t`Select how did you hear about Dogspotting`}
              value={getSelectedLabel("howDidYouHearAboutDogspotting")}
              error={errors.howDidYouHearAboutDogspotting?.message}
              onPress={() => openSheet("howDidYouHearAboutDogspotting")}
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

export default memo(OneThingAboutYouStep);
