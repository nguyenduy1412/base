import type { I18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { z } from "zod";

// IdentityStep

export const identitySchema = (translate: I18n["_"]) =>
  z.object({
    avatarUri: z.string().optional(),
    dogName: z
      .string()
      .min(2, translate(msg`Dog name must be at least 2 characters.`)),
    username: z
      .string()
      .min(3, translate(msg`Username must be at least 3 characters.`))
      .regex(
        /^[a-zA-Z0-9_]+$/,
        translate(msg`Use letters, numbers, or underscores.`),
      ),
    primaryBreed: z.string().min(1, translate(msg`Primary breed is required.`)),
    secondaryBreed: z.string().optional(),
    birthday: z.string(),
    gotchaday: z.string(),
  });

export type identityFormValues = z.infer<ReturnType<typeof identitySchema>>;

export const identityDefaultValues: identityFormValues = {
  avatarUri: undefined,
  dogName: "",
  username: "",
  primaryBreed: "",
  secondaryBreed: "",
  birthday: "",
  gotchaday: "",
};

// TellUsAboutStep

export const tellUsAboutSchema = (translate: I18n["_"]) =>
  z.object({
    age: z.string().min(1, translate(msg`Age is required.`)),
    size: z.string().min(1, translate(msg`Size is required.`)),
    foodType: z.string().min(1, translate(msg`Food type is required.`)),
    vibe: z.string().min(1, translate(msg`Vibe is required.`)),
    home: z.string().min(1, translate(msg`Home is required.`)),
  });

export type tellUsAboutFormValues = z.infer<
  ReturnType<typeof tellUsAboutSchema>
>;

export const tellUsAboutDefaultValues: tellUsAboutFormValues = {
  age: "",
  size: "",
  foodType: "",
  vibe: "",
  home: "",
};

// HealthAndHabitsStep

export const HEALTH_CONDITIONS = [
  "None",
  "Allergies",
  "Joint",
  "Anxiety",
  "Dental",
  "Digestive",
  "Heart",
  "Other",
] as const;

export const healthAndHabitsSchema = (translate: I18n["_"]) =>
  z.object({
    healthConditions: z
      .array(z.enum(HEALTH_CONDITIONS))
      .min(1, translate(msg`Please select at least one health condition.`)),
    groomingFrequency: z
      .string()
      .min(1, translate(msg`Grooming frequency is required.`)),
    trainingLevel: z
      .string()
      .min(1, translate(msg`Training level is required.`)),
    treats: z.string().min(1, translate(msg`Treats are required.`)),
    insurance: z.string().min(1, translate(msg`Insurance is required.`)),
    whereYourShop: z
      .string()
      .min(1, translate(msg`Where you shop is required.`)),
    monthlySpendOnDog: z
      .string()
      .min(1, translate(msg`Monthly spend on dog is required.`)),
  });

export type healthAndHabitsFormValues = z.infer<
  ReturnType<typeof healthAndHabitsSchema>
>;

export const healthAndHabitsDefaultValues: healthAndHabitsFormValues = {
  healthConditions: [],
  groomingFrequency: "",
  trainingLevel: "",
  treats: "",
  insurance: "",
  whereYourShop: "",
  monthlySpendOnDog: "",
};

// OneThingAboutYou

export const oneThingAboutYouSchema = (translate: I18n["_"]) =>
  z.object({
    firstName: z
      .string()
      .trim()
      .min(1, translate(msg`First name is required.`))
      .max(50, translate(msg`First name must not exceed 50 characters.`)),
    lastName: z
      .string()
      .trim()
      .min(1, translate(msg`Last name is required.`))
      .max(50, translate(msg`Last name must not exceed 50 characters.`)),
    yourAgeRange: z
      .string()
      .min(1, translate(msg`Please select your age range.`)),
    howDidYouHearAboutDogspotting: z
      .string()
      .min(1, translate(msg`Please select how you heard about Dogspotting.`)),
    countryCallingCode: z
      .string()
      .min(1, translate(msg`Country calling code is required.`)),
    phoneNumber: z
      .string()
      .trim()
      .min(1, translate(msg`Phone number is required.`))
      .regex(/^\d{7,15}$/, translate(msg`Please enter a valid phone number.`)),
  });

export type oneThingAboutYouFormValues = z.infer<
  ReturnType<typeof oneThingAboutYouSchema>
>;

export const oneThingAboutYouDefaultValues: oneThingAboutYouFormValues = {
  firstName: "",
  lastName: "",
  yourAgeRange: "",
  howDidYouHearAboutDogspotting: "",
  countryCallingCode: "+1",
  phoneNumber: "",
};
