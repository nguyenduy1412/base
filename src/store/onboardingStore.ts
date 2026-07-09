import {
  onboardingDefaultValues,
  OnboardingFormValues,
} from "@/features/onboarding/schemas/onboarding";
import { create } from "zustand";
type OnboardingStore = {
  identity: OnboardingFormValues;
  setIdentity: (identity: OnboardingFormValues) => void;
  resetIdentity: () => void;
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  identity: onboardingDefaultValues,

  setIdentity: (identity: OnboardingFormValues) => {
    set({ identity });
  },

  resetIdentity: () => {
    set({ identity: onboardingDefaultValues });
  },
}));
