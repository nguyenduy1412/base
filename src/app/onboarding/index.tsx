import React, { useState } from "react";
import { useRouter } from "expo-router";
import IdentityStep from "@/features/onboarding/components/steps/IdentityStep";
import TellUsAboutStep from "@/features/onboarding/components/steps/TellUsAboutStep";

// import TellUsAboutStep from "@/features/onboarding/steps/TellUsAboutStep";

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

    default:
      return null;
  }
}
