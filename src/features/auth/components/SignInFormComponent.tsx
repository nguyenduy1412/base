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
import { useLogin } from "../hooks/useLogin";
import { defaultSignInValues, SignInFormValues, signInSchema } from "../types";
import CheckBox from "@/components/CheckBox";

type props = {
  onNextForm: () => void;
}
const SignInFormComponent = ({ onNextForm }: props) => {
  const { _ } = useLingui();
  const schema = useMemo(() => signInSchema(_), [_]);
  const [isCheckBoxSelected, setIsCheckBoxSelected] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultSignInValues,
  });
  const { mutateAsync: login, isPending } = useLogin();

  const onSignIn = useCallback(async (data: SignInFormValues) => {
    console.log(data);
  }, []);

  const handleCheckBox = useCallback(() => {
    setIsCheckBoxSelected((prev) => !prev);
  }, []);

  return (
    <View>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            label={t`Email`}
            placeholder={t`Enter your email`}
            error={errors.email?.message}
            iconError={<TriangleAlert color="red" size={16} />}
          />
        )}
      />

      <Button
        title={t`Sign in`}
        className="rounded-[12px] mt-5 h-12"
        isLoading={isPending}
        onPress={handleSubmit(onSignIn)}
      />
      <View className="h-4.5 w-full items-center mt-5 justify-center">
        <View className="bg-placeholder h-0.25 w-full" />
        <View className="absolute px-5 bg-background">
          <Text variant="body14Regular">{t`Or`}</Text>
        </View>
      </View>
      <Button
        className="rounded-[12px] mt-5 h-12 border border-placeholder"
        onPress={() => {}}
        color="background"
        isShadow={false}
      >
        <View className="gap-2 flex-row">
          <Icon name="google" size={20} />
          <Text variant="body14Regular">{t`Continue with Google`}</Text>
        </View>
      </Button>
      <View className="pt-5 flex-row items-center gap-3">
        <CheckBox isSelected={isCheckBoxSelected} onPress={handleCheckBox} className="w-10 h-10"  />
        <Text variant="body12Regular">
          {t`I confirm I am 13 years of age or older (16+ if located in the EU or UK).`}
        </Text>
      </View>
      <Pressable onPress={onNextForm} className="pt-16 items-center">
        <Text>
          <Text variant="body12Regular">{t`Don't have an account?`}</Text>
          <Text variant="body12Regular" className="text-yellow-300">
            {t` Sign up`}
          </Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default memo(SignInFormComponent);
