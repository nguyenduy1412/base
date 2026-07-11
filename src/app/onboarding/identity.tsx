import { AppBottomSheet } from "@/components/BottomSheet";
import BreedBottomSheetContent from "@/features/onboarding/components/BreedBottomSheetContent";
import OnboardingFooter from "@/features/onboarding/components/OnboardingFooter";
import OnboardingScreen from "@/features/onboarding/components/OnboardingScreen";
import OnboardingSearchField from "@/features/onboarding/components/OnboardingSearchField";
import OnboardingSelectField from "@/features/onboarding/components/OnboardingSelectField";
import OnboardingTextField from "@/features/onboarding/components/OnboardingTextField";
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
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Search } from "lucide-react-native";
import { useMemo, useRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { View } from "react-native";

export default function OnboardingIdentityScreen() {
  // const router = useRouter();
  const identity = useOnboardingStore((state) => state.identity);
  const setIdentity = useOnboardingStore((state) => state.setIdentity);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<OnboardingFormValues>({
    defaultValues: identity,
    mode: "onChange",
    resolver: zodResolver(onboardingSchema),
  });

  const primaryBreed = useWatch({ control, name: "primaryBreed" });
  const birthday = useWatch({ control, name: "birthday" });

  const selectedBreed = useMemo(() => {
    return BREEDS.find((option) => option.value === primaryBreed);
  }, [primaryBreed]);

  console.log();

  const selectedBirthday = useMemo(() => {
    return birthdayOptions.find((option) => option.value === birthday);
  }, [birthday]);

  const primaryBreedSheetRef = useRef<BottomSheetModal>(null);

  const openPrimaryBreedSheet = () => {
    primaryBreedSheetRef.current?.present();
  };

  const closePrimaryBreedSheet = () => {
    primaryBreedSheetRef.current?.dismiss();
  };

  const onSubmit = (values: OnboardingFormValues) => {
    setIdentity(values);
    // router.push("/onboarding/profile");
  };

  const handleSetPrimaryBreed = (value: string) => {
    setValue("primaryBreed", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <OnboardingScreen
      currentStep={3}
      totalSteps={ONBOARDING_TOTAL_STEPS}
      title="Your Dog: Identity"
      canGoBack={true}
      footer={
        <OnboardingFooter disabled={false} onPress={handleSubmit(onSubmit)} />
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
            <OnboardingSelectField
              label="Primary breed"
              required
              placeholder="Search breed..."
              value={selectedBreed?.label ?? value}
              error={errors.primaryBreed?.message}
              onPress={openPrimaryBreedSheet}
              leftIcon={<Search className="text-icon" strokeWidth={2} />}
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
              value={value}
              onPress={openPrimaryBreedSheet}
              error={errors.secondaryBreed?.message}
              leftIcon={<Search className="text-icon" strokeWidth={2} />}
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
              onPress={openPrimaryBreedSheet}
            />
          )}
        />

        <AppBottomSheet ref={primaryBreedSheetRef}>
          <BreedBottomSheetContent
            selectedValue={primaryBreed}
            onSelect={handleSetPrimaryBreed}
            onDone={closePrimaryBreedSheet}
          />
        </AppBottomSheet>
      </View>
    </OnboardingScreen>
  );
}
