import HealthAndHabitsStep from "@/features/onboarding/components/steps/HealthAndHabitsStep";
import IdentityStep from "@/features/onboarding/components/steps/IdentityStep";
import OneThingAboutYouStep from "@/features/onboarding/components/steps/OneThingAboutYouStep";
import TellUsAboutStep from "@/features/onboarding/components/steps/TellUsAboutStep";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function OnboardingFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/");
      }
    }
  };

  switch (currentStep) {
    case 1:
      return <IdentityStep onContinue={goToNextStep} onBack={goBack} />;

    case 2:
      return <TellUsAboutStep onContinue={goToNextStep} onBack={goBack} />;
    case 3:
      return <HealthAndHabitsStep onContinue={goToNextStep} onBack={goBack} />;
    case 4:
      return <OneThingAboutYouStep onContinue={goToNextStep} onBack={goBack} />;
    default:
      return null;
  }
}
