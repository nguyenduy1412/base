import { TextInput, type TextInputProps } from "@/components/TextInput";
import { cn } from "@/utils/cn";
import { Search } from "lucide-react-native";
import { memo } from "react";

export interface OnboardingSearchFieldProps extends TextInputProps {
  label: string;
  required?: boolean;
  error?: string;
  pickerOnly?: boolean;
}

const OnboardingSearchField = ({
  label,
  required,
  error,
  className,
  inputContainerClassName,
  labelClassName,
  errorClassName,
  leftIcon,
  pickerOnly = false,
  ...props
}: OnboardingSearchFieldProps) => {
  return (
    <TextInput
      {...props}
      label={label}
      required={required}
      labelVariant="caption14Regular"
      labelClassName={cn("mb-2 text-label", labelClassName)}
      containerClassName="w-full"
      className={cn(
        "h-full flex-1 py-0 text-[15px]  text-text-heading",
        className,
      )}
      inputStyle={{ height: 48 }}
      placeholderTextColorClassName="accent-placeholder"
      leftIcon={leftIcon ?? <Search size={24} strokeWidth={2} />}
      error={error}
      errorClassName={cn("mt-1 text-error", errorClassName)}
      innerShadow={false}
      inputContainerClassName={cn(
        "h-12 rounded-xl border-input-border",
        inputContainerClassName,
      )}
      type="search"
    />
  );
};

export default memo(OnboardingSearchField);
