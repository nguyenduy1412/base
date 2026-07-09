import TextInput, { TextInputProps } from "@/components/TextInput";
import { memo } from "react";

export interface OnboardingSearchFieldProps extends TextInputProps {
  label: string;
  required?: boolean;
  error?: string;
}

const OnboardingSearchField = ({
  label,
  required,
  error,
  ...props
}: OnboardingSearchFieldProps) => {
  return (
    <TextInput
      label={required ? `${label} *` : label}
      labelVariant="body14Regular"
      labelClassName="mb-2 text-[#49504D]"
      containerClassName="w-full"
      className="h-full flex-1 py-0 text-[15px] leading-5.5 text-[#313533]"
      inputStyle={{ height: 48 }}
      placeholderTextColorClassName="accent-[#AFB6B3]"
      error={error}
      errorClassName="mt-1 text-[#DC2626]"
      innerShadow={false}
      type="search"
      {...props}
    />
  );
};

export default memo(OnboardingSearchField);
