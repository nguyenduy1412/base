import type { I18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { z } from "zod";

export const defaultSignInValues = {
  email: "",
};

export const defaultSignUpValues = {
  email: "",
  name: "",
};
export const signInSchema = (translate: I18n["_"]) =>
  z.object({
    email: z.email(translate(msg`Please enter a valid email address.`)),
  });

export const signUpSchema = (translate: I18n["_"]) =>
  z.object({
    email: z.email(translate(msg`Please enter a valid email address.`)),
    name: z.string().min(1, translate(msg`Please enter your name.`)),
  });

export type SignInFormValues = z.infer<ReturnType<typeof signInSchema>>;
export type SignUpFormValues = z.infer<
  ReturnType<typeof signUpSchema>
>;

