import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { t } from "@lingui/core/macro";
import { login } from "../api/login.api";
import { SignInFormValues } from "../types";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: SignInFormValues) => login(data),
    onError: (error: any) => {
      console.error("Login error:", error);
      Alert.alert(
        t`Lỗi`,
        error.message || t`Đăng nhập thất bại. Vui lòng thử lại.`,
      );
    },
  });
};
