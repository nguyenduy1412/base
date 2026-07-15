import { useMutation } from "@tanstack/react-query";
import { register } from "../api/register.api";
import { SignUpFormValues } from "../types";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: SignUpFormValues) => register(data),
  });
};
