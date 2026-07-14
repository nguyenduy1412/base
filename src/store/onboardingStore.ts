import {
  identityDefaultValues,
  identityFormValues,
  tellUsAboutDefaultValues,
  tellUsAboutFormValues,
} from "@/features/onboarding/schemas/onboarding";
import { create } from "zustand";
type OnboardingStore = {
  identity: identityFormValues;
  setIdentity: (identity: identityFormValues) => void;
  resetIdentity: () => void;

  tellUsAbout: tellUsAboutFormValues;
  setTellUsAbout: (value: tellUsAboutFormValues) => void;
  resetTellUsAbout: () => void;
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  identity: identityDefaultValues,
  tellUsAbout: tellUsAboutDefaultValues,

  setIdentity: (identity: identityFormValues) => {
    set({ identity });
  },
  setTellUsAbout: (tellUsAbout: tellUsAboutFormValues) => {
    set({ tellUsAbout });
  },

  resetIdentity: () => {
    set({ identity: identityDefaultValues });
  },
  resetTellUsAbout: () => {
    set({ tellUsAbout: tellUsAboutDefaultValues });
  },
}));
