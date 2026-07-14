import { z } from "zod";

export const identitySchema = z.object({
  avatarUri: z.string().optional(),
  dogName: z.string().min(2, "Dog name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .regex(/^[a-zA-Z0-9_]+$/, "Use letters, numbers, or underscores."),
  primaryBreed: z.string().min(1, "Primary breed is required"),
  secondaryBreed: z.string().optional(),
  birthday: z.string(),
  gotchaday: z.string(),
  // gotchaday: z.string().min(1, "Gotcha Day is required"),
});

export type identityFormValues = z.infer<typeof identitySchema>;

export const identityDefaultValues: identityFormValues = {
  avatarUri: undefined,
  dogName: "",
  username: "",
  primaryBreed: "",
  secondaryBreed: "",
  birthday: "",
  gotchaday: "",
};

export const tellUsAboutSchema = z.object({
  age: z.string().min(1, "Age is required"),
  size: z.string().min(1, "Size is required"),
  foodType: z.string().min(1, "Foodtype is required"),
  vibe: z.string().min(1, "Vibe is required"),
  home: z.string().min(1, "Home is required"),
});

export type tellUsAboutFormValues = z.infer<typeof tellUsAboutSchema>;

export const tellUsAboutDefaultValues: tellUsAboutFormValues = {
  age: "",
  size: "",
  foodType: "",
  vibe: "",
  home: "",
};
