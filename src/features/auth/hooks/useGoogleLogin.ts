import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { t } from "@lingui/core/macro";
import { loginWithGoogle } from "../api/google.api";

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: () => loginWithGoogle(),
    onError: (error: any) => {
      Alert.alert(
        t`Lỗi`,
        error.message || t`Đăng nhập bằng Google thất bại. Vui lòng thử lại.`,
      );
    },
  });
};
