import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { t } from "@lingui/core/macro";
import { register } from "../api/register.api";
import { SignUpFormValues } from "../types";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: SignUpFormValues) => register(data),
    onError: (error: any) => {
      console.error("Register error:", error);
      Alert.alert(
        t`Lỗi`,
        error.message || t`Đăng ký thất bại. Vui lòng thử lại.`,
      );
    },
  });
};
