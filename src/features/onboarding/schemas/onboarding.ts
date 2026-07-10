import { z } from "zod";

export const onboardingSchema = z.object({
  dogName: z.string().min(2, "Dog name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .regex(/^[a-zA-Z0-9_]+$/, "Use letters, numbers, or underscores."),
  primaryBreed: z.string().min(1, "Primary breed is required"),
  secondaryBreed: z.string().optional(),
  birthday: z.string().min(1, "Birthday is required"),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;

export const onboardingDefaultValues: OnboardingFormValues = {
  dogName: "",
  username: "",
  primaryBreed: "",
  secondaryBreed: "",
  birthday: "",
};
