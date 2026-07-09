import { EMAIL_ICON, FACEBOOK, GOOGLE, KEY_ICON } from "@/assets/images";
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
import { useLogin } from "../hooks/useLogin";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import { createLoginSchema, LoginFormValues } from "../types";

type LoginFormComponentProps = {
  onRegisterPress: () => void;
};

const LoginFormComponent = ({ onRegisterPress }: LoginFormComponentProps) => {
  const { _ } = useLingui();
  const loginSchema = useMemo(() => createLoginSchema(_), [_]);
  const { mutateAsync: login, isPending } = useLogin();
  const { mutateAsync: loginGoogle, isPending: isGooglePending } =
    useGoogleLogin();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onsubmit = useCallback(
    async (values: LoginFormValues) => {
      KeyboardController.dismiss();
      await login(values);
    },
    [login],
  );

  const handleGoogleLogin = useCallback(async () => {
    KeyboardController.dismiss();
    await loginGoogle();
  }, [loginGoogle]);

  const handleRegisterPress = useCallback(() => {
    KeyboardController.dismiss();
    onRegisterPress();
  }, [onRegisterPress]);

  const handleForgotPasswordPress = useCallback(() => {
    KeyboardController.dismiss();
    // router.replace(TAB_ROUTES.HOME);
  }, []);

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
              <ImageComponent
                source={EMAIL_ICON}
                contentFit="contain"
                className="w-7.5 h-7.5"
              />
            }
            placeholder={t`Vui lòng nhập email của bạn`}
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
              <ImageComponent
                source={KEY_ICON}
                contentFit="contain"
                className="w-7.5 h-7.5"
              />
            }
            placeholder={t`Vui lòng nhập mật khẩu của bạn`}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Button
        title={t`Đăng nhập`}
        color="login-button"
        className="mt-3"
        isLoading={isPending}
        onPress={handleSubmit(onsubmit)}
      />
      <View className="justify-center items-center gap-2 mt-3">
        <Pressable onPress={handleForgotPasswordPress}>
          <Text variant="body14Regular">{t`Quên mật khẩu?`}</Text>
        </Pressable>
        <Pressable onPress={handleRegisterPress}>
          <Text variant="body14Regular">
            {t`Bạn chưa có tài khoản? Đăng ký ngay.`}
          </Text>
        </Pressable>

        <View className="flex-row items-center w-full mt-2">
          <View className="bg-divider flex-1 h-0.25" />
          <View className="px-2.5 shrink-0">
            <Text variant="body14Regular" numberOfLines={1}>
              {t`Hoặc đăng nhập bằng`}
            </Text>
          </View>
          <View className="bg-divider flex-1 h-0.25" />
        </View>
      </View>
      <View className="flex-row gap-5 mt-3 w-full">
        <Button
          className="flex-1 py-2"
          color="white"
          disabled={isPending || isGooglePending}
          isLoading={isGooglePending}
          onPress={handleGoogleLogin}
        >
          <ImageComponent source={GOOGLE} className="w-7.5 h-7.5" />
        </Button>
        <Button
          className="flex-1 py-2"
          color="blue"
          disabled={isPending || isGooglePending}
        >
          <ImageComponent source={FACEBOOK} className="w-7.5 h-7.5" />
        </Button>
      </View>
    </View>
  );
};

export default memo(LoginFormComponent);
