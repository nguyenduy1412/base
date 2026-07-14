import { Pressable, View } from "react-native";
import React, { memo, useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "@/components/TextInput";
import { t } from "@lingui/core/macro";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import Icon from "@/assets/svg/Icon";
import { TriangleAlert } from "lucide-react-native";
import { defaultSignUpValues, SignUpFormValues, signUpSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLingui } from "@lingui/react";
import { useRegister } from "../hooks/useRegister";
import TermsOfServiceModal from "./TermsOfServiceModal";
import { router } from "expo-router";
import { AUTH_ROUTES } from "@/constants/routes";
import CheckBox from "@/components/CheckBox";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import { withUniwind } from "uniwind";

const ErrorIcon = withUniwind(TriangleAlert);

type props = {
  onNextForm: () => void;
  onInputFocus?: (text: string) => void;
  onInputBlur?: () => void;
  onInputChange?: (text: string) => void;
};

const SignUpFormComponent = ({
  onNextForm,
  onInputFocus,
  onInputBlur,
  onInputChange,
}: props) => {
  const { _ } = useLingui();
  const schema = useMemo(() => signUpSchema(_), [_]);
  const [isCheckBoxSelected, setIsCheckBoxSelected] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultSignUpValues,
  });
  const { mutateAsync: register, isPending } = useRegister();
  const { mutateAsync: googleLogin, isPending: googleLoginLoading } =
    useGoogleLogin();
  const [isTermsOfServiceModalVisible, setIsTermsOfServiceModalVisible] =
    useState(false);

  const onSignUp = useCallback(
    async (data: SignUpFormValues) => {
      await register(data);
      router.navigate({
        pathname: AUTH_ROUTES.VERIFY_EMAIL,
        params: { email: data.email, name: data.name },
      });
    },
    [register],
  );

  const handleSignUpWithGoogle = useCallback(async () => {
    await googleLogin();
  }, [googleLogin]);

  const handleCheckBox = useCallback(() => {
    setIsCheckBoxSelected((prev) => !prev);
  }, []);

  const handleShowTermsOfServiceModal = useCallback(() => {
    setIsTermsOfServiceModalVisible(true);
  }, []);

  const handleHideTermsOfServiceModal = useCallback(() => {
    setIsTermsOfServiceModalVisible(false);
  }, []);

  const handleInputFocus = useCallback(
    (value: string) => () => {
      onInputFocus?.(value);
    },
    [onInputFocus],
  );

  const handleInputBlur = useCallback(
    (onBlur: () => void) => () => {
      onBlur();
      onInputBlur?.();
    },
    [onInputBlur],
  );

  const handleInputChange = useCallback(
    (onChange: (text: string) => void) => (text: string) => {
      onChange(text);
      onInputChange?.(text);
    },
    [onInputChange],
  );

  return (
    <View>
      <View className="gap-4">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={handleInputChange(onChange)}
              onFocus={handleInputFocus(value)}
              onBlur={handleInputBlur(onBlur)}
              label={t`Name`}
              placeholder={t`Enter your name`}
              error={errors.name?.message}
              iconError={<ErrorIcon colorClassName="accent-error" size={16} />}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              type="email"
              onChangeText={handleInputChange(onChange)}
              onFocus={handleInputFocus(value)}
              onBlur={handleInputBlur(onBlur)}
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
      </View>
      <View className="flex-row items-start gap-3 pt-5">
        <CheckBox isSelected={isCheckBoxSelected} onPress={handleCheckBox} />
        <Text
          onPress={handleShowTermsOfServiceModal}
          className="min-w-0 flex-1 shrink"
        >
          <Text variant="body12Regular">{t`I am at least 13 years old and agree to the`}</Text>
          <Text
            variant="body12Regular"
            className="text-yellow"
          >{t` Termsof Service`}</Text>
          <Text variant="body12Regular">{t` and`}</Text>
          <Text
            variant="body12Semibold"
            className="text-yellow"
          >{t` Privacy Policy`}</Text>
        </Text>
      </View>
      <Button
        title={t`Continue`}
        className="mt-5 h-12 w-full rounded-[12px]"
        isLoading={isPending}
        disabled={!isCheckBoxSelected}
        onPress={handleSubmit(onSignUp)}
      />
      <View className="mt-5 h-4.5 w-full items-center justify-center">
        <View className="h-0.25 w-full bg-placeholder" />
        <View className="absolute bg-background px-5">
          <Text variant="body14Regular">{t`Or sign in with`}</Text>
        </View>
      </View>
      <Button
        className="mt-5 h-12 w-full rounded-[12px] border border-placeholder"
        onPress={handleSignUpWithGoogle}
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

      <Pressable onPress={onNextForm} className="items-center pt-16">
        <Text>
          <Text variant="body12Regular">{t`Already have an account?`}</Text>
          <Text variant="body12Semibold" className="text-yellow">
            {t` Sign in`}
          </Text>
        </Text>
      </Pressable>
      <TermsOfServiceModal
        isVisible={isTermsOfServiceModalVisible}
        onClose={handleHideTermsOfServiceModal}
      />
    </View>
  );
};

export default memo(SignUpFormComponent);
