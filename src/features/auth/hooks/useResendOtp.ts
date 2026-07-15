import { useMutation } from "@tanstack/react-query";
import { register } from "../api/register.api";
import { SignUpFormValues } from "../types";

export const useResendOtp = () => {
  return useMutation({
    mutationFn: (data: SignUpFormValues) => register(data),
  });
};
