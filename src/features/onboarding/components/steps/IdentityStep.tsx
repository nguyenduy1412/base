import { zodResolver } from "@hookform/resolvers/zod";
import { useLingui } from "@lingui/react";
import { ChevronDown, Search } from "lucide-react-native";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import Avatar from "@/components/Avatar";
import { Text } from "@/components/Text";
import OnboardingScreen from "@/features/onboarding/components/OnboardingScreen";
import OnboardingSelectField from "@/features/onboarding/components/OnboardingSelectField";
import OnboardingTextField from "@/features/onboarding/components/OnboardingTextField";

import Icon from "@/assets/svg/Icon";
import { useBottomSheetField } from "@/features/onboarding/hooks/useBottomSheetField";

import {
  BIRTHDAYS,
  BREEDS,
  ONBOARDING_TOTAL_STEPS,
} from "@/features/onboarding/constants/onboarding";
import {
  identityFormValues,
  identitySchema,
} from "@/features/onboarding/schemas/onboarding";
import { useOnboardingStore } from "@/store/onboardingStore";
import BreedBottomSheet from "../BreedBottomSheet";
import DayBottomSheet from "../DayBottomSheet";
import OnboardingFooter from "../OnboardingFooter";

interface IdentityStepProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function IdentityStep({
  onContinue,
  onBack,
}: IdentityStepProps) {
  const { _ } = useLingui();
  const schema = useMemo(() => identitySchema(_), [_]);
  const identity = useOnboardingStore((state) => state.identity);
  const setIdentity = useOnboardingStore((state) => state.setIdentity);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<identityFormValues>({
    defaultValues: identity,
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const {
    value: primaryBreed,
    selectedOption: selectedPrimaryBreed,
    sheetRef: primaryBreedSheetRef,
    openSheet: openPrimaryBreedSheet,
    closeSheet: closePrimaryBreedSheet,
    handleSetValue: handleSetPrimaryBreed,
  } = useBottomSheetField({
    control,
    setValue,
    name: "primaryBreed",
    options: BREEDS,
  });

  const {
    value: secondaryBreed,
    selectedOption: selectedSecondaryBreed,
    sheetRef: secondaryBreedSheetRef,
    openSheet: openSecondaryBreedSheet,
    closeSheet: closeSecondaryBreedSheet,
    handleSetValue: handleSetSecondaryBreed,
  } = useBottomSheetField({
    control,
    setValue,
    name: "secondaryBreed",
    options: BREEDS,
  });

  const {
    value: birthday,
    selectedOption: selectedBirthday,
    sheetRef: birthdaySheetRef,
    openSheet: openBirthdaySheet,
    closeSheet: closeBirthdaySheet,
    handleSetValue: handleSetBirthDay,
  } = useBottomSheetField({
    control,
    setValue,
    name: "birthday",
    options: BIRTHDAYS,
  });

  const {
    value: gotchaday,
    selectedOption: selectedGotchaday,
    sheetRef: gotchadaySheetRef,
    openSheet: openGotchadaySheet,
    closeSheet: closeGotchadaySheet,
    handleSetValue: handleSelectGotchaday,
  } = useBottomSheetField({
    control,
    setValue,
    name: "gotchaday",
    options: BIRTHDAYS,
  });

  const onSubmit = (values: identityFormValues) => {
    setIdentity(values);
    onContinue();
  };

  return (
    <OnboardingScreen
      currentStep={1}
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
        <View className="h-3" />

        <Text
          variant="heading32Semibold"
          className="mb-5 font-serif text-[32px] leading-9.5 text-text-heading"
        >
          Time to meet the real star!
        </Text>

        <Controller
          control={control}
          name="avatarUri"
          render={({ field: { onChange, value } }) => (
            <Avatar size={140} url={value} onChange={onChange} />
          )}
        />

        <Controller
          control={control}
          name="dogName"
          render={({ field: { onBlur, onChange, value } }) => (
            <OnboardingTextField
              label="Dog name"
              required
              placeholder="Enter your dog name"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.dogName?.message}
              autoCapitalize="words"
            />
          )}
        />

        <Controller
          control={control}
          name="username"
          render={({ field: { onBlur, onChange, value } }) => (
            <OnboardingTextField
              label="Username"
              required
              placeholder="Enter username"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.username?.message}
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          control={control}
          name="primaryBreed"
          render={({ field: { value } }) => (
            <OnboardingSelectField
              label="Primary breed"
              required
              placeholder="Search breed..."
              value={selectedPrimaryBreed?.label ?? value}
              error={errors.primaryBreed?.message}
              onPress={openPrimaryBreedSheet}
              rightIcon={<Search className="text-icon" strokeWidth={2} />}
              leftIcon={
                selectedPrimaryBreed?.label ? (
                  <Icon name={selectedPrimaryBreed.iconName} />
                ) : null
              }
            />
          )}
        />

        <Controller
          control={control}
          name="secondaryBreed"
          render={({ field: { value } }) => (
            <OnboardingSelectField
              label="Secondary breed"
              placeholder="Search breed..."
              value={selectedSecondaryBreed?.label ?? value}
              onPress={openSecondaryBreedSheet}
              error={errors.secondaryBreed?.message}
              rightIcon={<Search className="text-icon" strokeWidth={2} />}
              leftIcon={
                selectedSecondaryBreed?.label ? (
                  <Icon name={selectedSecondaryBreed.iconName} />
                ) : null
              }
            />
          )}
        />

        <Controller
          control={control}
          name="birthday"
          render={({ field: { value } }) => (
            <OnboardingSelectField
              label="Birthday"
              placeholder="Select birthday"
              value={selectedBirthday?.label ?? value}

              error={errors.birthday?.message}
              rightIcon={<ChevronDown size={24} strokeWidth={2} />}
              onPress={openBirthdaySheet}
            />
          )}
        />
        <Controller
          control={control}
          name="gotchaday"
          render={({ field: { value } }) => (
            <OnboardingSelectField
              label="Gotcha Day"
              placeholder="Select Gotcha Day"
              value={selectedGotchaday?.label ?? value}
              error={errors.gotchaday?.message}
              rightIcon={<ChevronDown size={24} strokeWidth={2} />}
              onPress={openGotchadaySheet}
            />
          )}
        />

        <BreedBottomSheet
          ref={primaryBreedSheetRef}
          selectedValue={primaryBreed}
          onSelect={handleSetPrimaryBreed}
          onDone={closePrimaryBreedSheet}
        />

        <BreedBottomSheet
          ref={secondaryBreedSheetRef}
          selectedValue={secondaryBreed}
          onSelect={handleSetSecondaryBreed}
          onDone={closeSecondaryBreedSheet}
        />

        <DayBottomSheet
          ref={birthdaySheetRef}
          title="Birthday"
          selectedValue={birthday}
          onSelect={handleSetBirthDay}
          onDone={closeBirthdaySheet}
        />
        <DayBottomSheet
          ref={gotchadaySheetRef}
          title="Gotcha Day"
          selectedValue={gotchaday}
          onSelect={handleSelectGotchaday}
          onDone={closeGotchadaySheet}
        />

        <View className="h-14" />
      </View>
    </OnboardingScreen>
  );
}
