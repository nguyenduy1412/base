import { useMutation } from "@tanstack/react-query";
import { loginWithGoogle } from "../api/google.api";

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: () => loginWithGoogle(),
  });
};
