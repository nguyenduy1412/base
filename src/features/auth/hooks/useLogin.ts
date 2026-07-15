import { useMutation } from "@tanstack/react-query";
import { t } from "@lingui/core/macro";
import { login } from "../api/login.api";
import { SignInFormValues } from "../types";

const USER_NOT_FOUND_PATTERNS = [
  "signups not allowed",
  "user not found",
  "unable to validate email",
];

export const getLoginErrorMessage = (error: unknown) => {
  const message = error instanceof Error ? error.message : "";
  const normalized = message.toLowerCase();

  if (USER_NOT_FOUND_PATTERNS.some((pattern) => normalized.includes(pattern))) {
    return t`This account does not exist. Please sign up first.`;
  }

  return message || t`Sign in failed. Please try again.`;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: SignInFormValues) => login(data),
  });
};
