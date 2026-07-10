import { ReactNode, memo } from "react";

import { TextInput, type TextInputProps } from "@/components/TextInput";

export interface OnboardingTextFieldProps extends TextInputProps {
  label: string;
  required?: boolean;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const OnboardingTextField = ({
  label,
  required,
  error,
  leftIcon,
  rightIcon,
  ...props
}: OnboardingTextFieldProps) => {
  return (
    <TextInput
      label={label}
      required={required}
      labelVariant="body14Regular"
      labelClassName="mb-2 text-[#49504D]"
      containerClassName="w-full"
      className="h-full flex-1 py-0 text-[15px] leading-5.5 text-[#313533]"
      inputStyle={{ height: 48 }}
      placeholderTextColorClassName="accent-[#AFB6B3]"
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      error={error}
      errorClassName="mt-1 text-[#DC2626]"
      innerShadow={false}
      {...props}
    />
  );
};

export default memo(OnboardingTextField);
