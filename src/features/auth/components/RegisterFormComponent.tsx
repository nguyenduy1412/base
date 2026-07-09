import { EMAIL_ICON, KEY_ICON, LOCK_ICON } from "@/assets/images";
import { Button } from "@/components/Button";
import ImageComponent from "@/components/Image/ImageComponent";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { memo, useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import { KeyboardController } from "react-native-keyboard-controller";
import { useRegister } from "../hooks/useRegister";
import { createRegisterSchema, type RegisterFormValues } from "../types";

type RegisterFormComponentProps = {
  onLoginPress: () => void;
};

const RegisterFormComponent = ({
  onLoginPress,
}: RegisterFormComponentProps) => {
  const { _ } = useLingui();
  const registerSchema = useMemo(() => createRegisterSchema(_), [_]);
  const { mutateAsync: register, isPending } = useRegister();

  const { control, handleSubmit } = useForm<RegisterFormValues>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = useCallback(
    async (values: RegisterFormValues) => {
      await register(values);
    },
    [register],
  );

  const handleRegisterPress = useCallback(() => {
    void KeyboardController.dismiss();
    void handleSubmit(handleRegister)();
  }, [handleRegister, handleSubmit]);

  const handleLoginPress = useCallback(() => {
    void KeyboardController.dismiss();
    onLoginPress();
  }, [onLoginPress]);

  return (
    <View className="justify-center items-center bg-background px-[40px] pb-6 gap-3">
      <Controller
        control={control}
        name="email"
        render={({ field: { onBlur, onChange, value }, fieldState }) => (
          <TextInput
            label={t`Email`}
            type="email"
            leftIcon={
              <ImageComponent source={EMAIL_ICON} className="w-6.5 h-6.5" />
            }
            placeholder={t`Nhập email`}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onBlur, onChange, value }, fieldState }) => (
          <TextInput
            label={t`Mật khẩu`}
            type="password"
            leftIcon={
              <ImageComponent source={KEY_ICON} className="w-6.5 h-6.5" />
            }
            placeholder={t`Nhập mật khẩu`}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onBlur, onChange, value }, fieldState }) => (
          <TextInput
            label={t`Nhập lại mật khẩu`}
            type="password"
            leftIcon={
              <ImageComponent source={LOCK_ICON} className="w-6.5 h-6.5" />
            }
            placeholder={t`Nhập lại mật khẩu`}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={fieldState.error?.message}
          />
        )}
      />
      <Button
        title={t`Đăng ký`}
        color="login-button"
        className="mt-3"
        isLoading={isPending}
        onPress={handleRegisterPress}
      />
      <Pressable
        className="justify-center items-center gap-2 mt-5"
        onPress={handleLoginPress}
      >
        <Text variant="body14Regular">
          {t`Bạn đã có tài khoản? Đăng nhập ngay.`}
        </Text>
      </Pressable>
    </View>
  );
};

export default memo(RegisterFormComponent);
