import { Pressable, View } from "react-native";
import React, { memo, useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "@/components/TextInput";
import { t } from "@lingui/core/macro";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import Icon from "@/assets/svg/Icon";
import { TriangleAlert } from "lucide-react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLingui } from "@lingui/react";
import { getLoginErrorMessage, useLogin } from "../hooks/useLogin";
import { defaultSignInValues, SignInFormValues, signInSchema } from "../types";
import CheckBox from "@/components/CheckBox";
import { router } from "expo-router";
import { AUTH_ROUTES } from "@/constants/routes";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import { withUniwind } from "uniwind";

const ErrorIcon = withUniwind(TriangleAlert);

type props = {
  onNextForm: () => void;
  onInputFocus?: (text: string) => void;
  onInputBlur?: () => void;
  onInputChange?: (text: string) => void;
};

const SignInFormComponent = ({
  onNextForm,
  onInputFocus,
  onInputBlur,
  onInputChange,
}: props) => {
  const { _ } = useLingui();
  const schema = useMemo(() => signInSchema(_), [_]);
  const [isCheckBoxSelected, setIsCheckBoxSelected] = useState(true);
  const { mutateAsync: googleLogin, isPending: googleLoginLoading } =
    useGoogleLogin();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultSignInValues,
  });
  const { mutateAsync: login, isPending } = useLogin();

  const onSignIn = useCallback(
    async (data: SignInFormValues) => {
      try {
        await login(data);
        router.navigate({
          pathname: AUTH_ROUTES.CHECK_YOUR_EMAIL,
          params: { email: data.email },
        });
      } catch (error) {
        setError("email", {
          message: getLoginErrorMessage(error),
        });
      }
    },
    [login, setError],
  );

  const handleSignInWithGoogle = useCallback(async () => {
    await googleLogin();
  }, [googleLogin]);

  const handleCheckBox = useCallback(() => {
    setIsCheckBoxSelected((prev) => !prev);
  }, []);

  const handleEmailFocus = useCallback(
    (value: string) => () => {
      onInputFocus?.(value);
    },
    [onInputFocus],
  );

  const handleEmailBlur = useCallback(
    (onBlur: () => void) => () => {
      onBlur();
      onInputBlur?.();
    },
    [onInputBlur],
  );

  const handleEmailChange = useCallback(
    (onChange: (text: string) => void) => (text: string) => {
      onChange(text);
      onInputChange?.(text);
    },
    [onInputChange],
  );

  return (
    <View>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            type="email"
            onChangeText={handleEmailChange(onChange)}
            onFocus={handleEmailFocus(value)}
            onBlur={handleEmailBlur(onBlur)}
            label={t`Email`}
            placeholder={t`Enter your email`}
            error={errors.email?.message}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            iconError={<ErrorIcon colorClassName="accent-error" size={16} />}
          />
        )}
      />

      <Button
        title={t`Sign in`}
        className="mt-5 w-full rounded-[12px]"
        isLoading={isPending}
        disabled={!isCheckBoxSelected}
        onPress={handleSubmit(onSignIn)}
      />
      <View className="mt-5 h-4.5 w-full items-center justify-center">
        <View className="h-0.25 w-full bg-placeholder" />
        <View className="absolute bg-background px-5">
          <Text variant="body14Regular">{t`Or`}</Text>
        </View>
      </View>
      <Button
        className="mt-5 w-full rounded-xl border border-placeholder"
        onPress={handleSignInWithGoogle}
        color="background"
        isShadow={false}
        disabled={!isCheckBoxSelected}
        isLoading={googleLoginLoading}
      >
        <View className="flex-row gap-2">
          <Icon name="google" size={20} />
          <Text variant="body14Regular">{t`Continue with Google`}</Text>
        </View>
      </Button>
      <View className="flex-row items-start gap-3 pt-5">
        <CheckBox isSelected={isCheckBoxSelected} onPress={handleCheckBox} />
        <Text variant="body12Regular" className="min-w-0 flex-1 shrink">
          {t`I confirm I am 13 years of age or older (16+ if located in the EU or UK).`}
        </Text>
      </View>
      <Pressable onPress={onNextForm} className="items-center pt-16">
        <Text>
          <Text variant="body12Regular">{t`Don't have an account?`}</Text>
          <Text variant="body12Regular" className="text-yellow">
            {t` Sign up`}
          </Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default memo(SignInFormComponent);
