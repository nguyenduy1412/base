import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Search } from "lucide-react-native";
import { useMemo, useRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { View } from "react-native";

import Avatar from "@/components/Avatar";
import Text from "@/components/Text";
import OnboardingScreen from "@/features/onboarding/components/OnboardingScreen";
import OnboardingSelectField from "@/features/onboarding/components/OnboardingSelectField";
import OnboardingTextField from "@/features/onboarding/components/OnboardingTextField";

import Icon from "@/assets/svg/Icon";
import { BREEDS } from "@/features/onboarding/constants/breeds";
import {
  birthdayOptions,
  ONBOARDING_TOTAL_STEPS,
} from "@/features/onboarding/constants/onboarding";
import {
  OnboardingFormValues,
  onboardingSchema,
} from "@/features/onboarding/schemas/onboarding";
import { useOnboardingStore } from "@/store/onboardingStore";
import BreedBottomSheet from "../BreedBottomSheet";
import OnboardingFooter from "../OnboardingFooter";
import DayBottomSheet from "../DayBottomSheet";
import { BIRTHDAYS } from "../../constants/birthdays";

interface IdentityStepProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function IdentityStep({
  onContinue,
  onBack,
}: IdentityStepProps) {
  const identity = useOnboardingStore((state) => state.identity);
  const setIdentity = useOnboardingStore((state) => state.setIdentity);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<OnboardingFormValues>({
    defaultValues: identity,
    mode: "onChange",
    resolver: zodResolver(onboardingSchema),
  });

  const primaryBreed = useWatch({ control, name: "primaryBreed" });
  const selectedPrimaryBreed = useMemo(() => {
    return BREEDS.find((option) => option.value === primaryBreed);
  }, [primaryBreed]);
  const primaryBreedSheetRef = useRef<BottomSheetModal>(null);
  const openPrimaryBreedSheet = () => primaryBreedSheetRef.current?.present();
  const closePrimaryBreedSheet = () => primaryBreedSheetRef.current?.dismiss();
  const handleSetPrimaryBreed = (value: string) => {
    setValue("primaryBreed", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const secondaryBreed = useWatch({ control, name: "secondaryBreed" });
  const secondaryBreedSheetRef = useRef<BottomSheetModal>(null);
  const selectedSecondaryBreed = useMemo(() => {
    return BREEDS.find((option) => option.value === secondaryBreed);
  }, [secondaryBreed]);
  const openSecondaryBreedSheet = () =>
    secondaryBreedSheetRef.current?.present();
  const closeSecondaryBreedSheet = () =>
    secondaryBreedSheetRef.current?.dismiss();
  const handleSetSecondaryBreed = (value: string) => {
    setValue("secondaryBreed", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const birthday = useWatch({ control, name: "birthday" });
  const selectedbirthday = useMemo(() => {
    return BIRTHDAYS.find((option) => option.value === birthday);
  }, [birthday]);
  const birthdaySheetRef = useRef<BottomSheetModal>(null);
  const openBirthdaySheet = () => {
    birthdaySheetRef.current?.present();
  };
  const closeBirthdaySheet = () => {
    birthdaySheetRef.current?.close();
  };
  const handleSetBirthDay = (value: string) => {
    setValue("birthday", value, {
      shouldValidate: true,
    });
  };

  const selectedBirthday = useMemo(() => {
    return birthdayOptions.find((option) => option.value === birthday);
  }, [birthday]);

  const onSubmit = (values: OnboardingFormValues) => {
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
          //   disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        />
      }
    >
      <View className="gap-5 flex-1">
        <View className="h-3" />

        <Text
          variant="body32Semibold"
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
              value={value}
              error={errors.gotchaday?.message}
              rightIcon={<ChevronDown size={24} strokeWidth={2} />}
              onPress={openPrimaryBreedSheet}
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
          selectedValue={selectedbirthday?.value}
          onSelect={handleSetBirthDay}
          onDone={closeBirthdaySheet}
        />

        <View className="h-14" />
      </View>
    </OnboardingScreen>
  );
}
