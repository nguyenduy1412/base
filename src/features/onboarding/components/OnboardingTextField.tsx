import { ReactNode, memo } from "react";

import { TextInput, type TextInputProps } from "@/components/TextInput";
import { cn } from "@/utils/cn";

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
  className,
  inputContainerClassName,
  labelClassName,
  errorClassName,
  ...props
}: OnboardingTextFieldProps) => {
  return (
    <TextInput
      {...props}
      label={label}
      required={required}
      labelVariant="caption14Regular"
      labelClassName={cn("text-label", labelClassName)}
      containerClassName="w-full"
      className={cn(
        "h-full flex-1 py-0 text-[15px]  text-text-heading",
        className,
      )}
      inputStyle={{ height: 48 }}
      placeholderTextColorClassName="accent-placeholder"
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      error={error}
      errorClassName={cn("mt-1 text-error", errorClassName)}
      innerShadow={false}
      inputContainerClassName={cn(
        "h-12 rounded-xl border-input-border",
        inputContainerClassName,
      )}
    />
  );
};

export default memo(OnboardingTextField);
