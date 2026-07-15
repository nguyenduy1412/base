import {
  healthAndHabitsDefaultValues,
  healthAndHabitsFormValues,
  identityDefaultValues,
  identityFormValues,
  oneThingAboutYouDefaultValues,
  oneThingAboutYouFormValues,
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

  healthAndHabits: healthAndHabitsFormValues;
  setHealthAndHabits: (value: healthAndHabitsFormValues) => void;
  resetHealthAndHabits: () => void;
  // oneThingAboutYou
  oneThingAboutYou: oneThingAboutYouFormValues;
  setOneThingAboutYou: (value: oneThingAboutYouFormValues) => void;
  resetOneThingAboutYou: () => void;
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  identity: identityDefaultValues,
  tellUsAbout: tellUsAboutDefaultValues,
  healthAndHabits: healthAndHabitsDefaultValues,
  oneThingAboutYou: oneThingAboutYouDefaultValues,

  setIdentity: (identity: identityFormValues) => {
    set({ identity });
  },
  setTellUsAbout: (tellUsAbout: tellUsAboutFormValues) => {
    set({ tellUsAbout });
  },
  setHealthAndHabits: (healthAndHabits: healthAndHabitsFormValues) => {
    set({ healthAndHabits });
  },
  setOneThingAboutYou: (oneThingAboutYou: oneThingAboutYouFormValues) => {
    set({ oneThingAboutYou });
  },

  resetIdentity: () => {
    set({ identity: identityDefaultValues });
  },
  resetTellUsAbout: () => {
    set({ tellUsAbout: tellUsAboutDefaultValues });
  },
  resetHealthAndHabits: () => {
    set({ healthAndHabits: healthAndHabitsDefaultValues });
  },
  resetOneThingAboutYou: () => {
    set({ oneThingAboutYou: oneThingAboutYouDefaultValues });
  },
}));
