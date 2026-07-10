import { SelectBottomSheet } from "@/components/BottomSheet/SelectBottomSheet";
import OnboardingFooter from "@/features/onboarding/components/OnboardingFooter";
import OnboardingScreen from "@/features/onboarding/components/OnboardingScreen";
import OnboardingSearchField from "@/features/onboarding/components/OnboardingSearchField";
import OnboardingSelectField from "@/features/onboarding/components/OnboardingSelectField";
import OnboardingTextField from "@/features/onboarding/components/OnboardingTextField";
import {
  birthdayOptions,
  breedOptions,
  ONBOARDING_TOTAL_STEPS,
} from "@/features/onboarding/constants/onboarding";
import {
  OnboardingFormValues,
  onboardingSchema,
} from "@/features/onboarding/schemas/onboarding";
import { useOnboardingStore } from "@/store/onboardingStore";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Search } from "lucide-react-native";
import { useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

export default function OnboardingIdentityScreen() {
  // const router = useRouter();
  const breedSheetRef = useRef<BottomSheetModal>(null);
  const birthdaySheetRef = useRef<BottomSheetModal>(null);
  const identity = useOnboardingStore((state) => state.identity);
  const setIdentity = useOnboardingStore((state) => state.setIdentity);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    watch,
  } = useForm<OnboardingFormValues>({
    defaultValues: identity,
    mode: "onChange",
    resolver: zodResolver(onboardingSchema),
  });

  const primaryBreed = watch("primaryBreed");
  const birthday = watch("birthday");

  const selectedBreed = useMemo(() => {
    return breedOptions.find((option) => option.value === primaryBreed);
  }, [primaryBreed]);

  const selectedBirthday = useMemo(() => {
    return birthdayOptions.find((option) => option.value === birthday);
  }, [birthday]);

  const onSubmit = (values: OnboardingFormValues) => {
    setIdentity(values);
    // router.push("/onboarding/profile");
  };

  return (
    <OnboardingScreen
      currentStep={3}
      totalSteps={ONBOARDING_TOTAL_STEPS}
      title="Your Dog: Identity"
      canGoBack={true}
      footer={
        <OnboardingFooter disabled={true} onPress={handleSubmit(onSubmit)} />
      }
    >
      <View className="gap-5 flex-1 ">
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
            <OnboardingSearchField
              label="Primary breed"
              required
              placeholder="Search breed..."
              value={selectedBreed?.label ?? value}
              error={errors.primaryBreed?.message}
              onFocus={() => breedSheetRef.current?.present()}
              leftIcon={<Search />}
            />
          )}
        />

        <Controller
          control={control}
          name="secondaryBreed"
          render={({ field: { onBlur, onChange, value } }) => (
            <OnboardingSearchField
              label="Secondary breed"
              placeholder="Search breed..."
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.secondaryBreed?.message}
              leftIcon={<Search />}
            />
          )}
        />

        <Controller
          control={control}
          name="birthday"
          render={() => (
            <OnboardingSelectField
              label="Birthday"
              required
              placeholder="Select birthday"
              value={selectedBirthday?.label}
              error={errors.birthday?.message}
              rightIcon={<CalendarDays size={24} strokeWidth={2} />}
              onPress={() => birthdaySheetRef.current?.present()}
            />
          )}
        />

        <SelectBottomSheet
          ref={breedSheetRef}
          title="Primary breed"
          options={breedOptions}
          selectedValue={primaryBreed}
          onSelect={(option) => {
            setValue("primaryBreed", option.value, {
              shouldValidate: true,
              shouldDirty: true,
            });
            breedSheetRef.current?.dismiss();
          }}
        />

        <SelectBottomSheet
          ref={birthdaySheetRef}
          title="Birthday"
          options={birthdayOptions}
          selectedValue={birthday}
          onSelect={(option) => {
            setValue("birthday", option.value, {
              shouldValidate: true,
              shouldDirty: true,
            });
            birthdaySheetRef.current?.dismiss();
          }}
        />
      </View>
    </OnboardingScreen>
  );
}
