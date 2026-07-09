import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { t } from "@lingui/core/macro";
import { register } from "../api/register.api";
import { RegisterFormValues } from "../types";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterFormValues) => register(data),
    onSuccess: (data) => {
      console.log("Register success:", data);
      Alert.alert(t`Thành công`, t`Đăng ký tài khoản thành công!`);
    },
    onError: (error: any) => {
      console.error("Register error:", error);
      Alert.alert(
        t`Lỗi`,
        error.message || t`Đăng ký thất bại. Vui lòng thử lại.`,
      );
    },
  });
};
