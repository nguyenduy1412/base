import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { t } from "@lingui/core/macro";
import { login } from "../api/login.api";
import { LoginFormValues } from "../types";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginFormValues) => login(data),
    onSuccess: (data) => {
      console.log("Login success:", data);
      Alert.alert(t`Thành công`, t`Đăng nhập thành công!`);
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      Alert.alert(
        t`Lỗi`,
        error.message || t`Đăng nhập thất bại. Vui lòng thử lại.`,
      );
    },
  });
};
