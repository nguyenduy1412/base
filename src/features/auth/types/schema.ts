import { t } from "@lingui/core/macro";
import { z } from "zod";

export const defaultSignInValues = {
  email: "",
};

export const defaultSignUpValues = {
  email: "",
  name: "",
};

export const signInSchema = () =>
  z.object({
    email: z.email(t`Please enter a valid email address.`),
  });

export const signUpSchema = () =>
  z.object({
    email: z.email(t`Please enter a valid email address.`),
    name: z.string().min(1, t`Please enter your name.`),
  });

export type SignInFormValues = z.infer<ReturnType<typeof signInSchema>>;
export type SignUpFormValues = z.infer<ReturnType<typeof signUpSchema>>;
