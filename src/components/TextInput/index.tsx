import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
  type KeyboardTypeOptions,
} from "react-native";
import { useCSSVariable, withUniwind } from "uniwind";
import { type TextInputProps } from "./types";
const EyeIcon = withUniwind(Eye);
const EyeOffIcon = withUniwind(EyeOff);
const inputTypeConfig: Record<
  string,
  {
    keyboardType?: KeyboardTypeOptions;
    autoComplete?: any;
    textContentType?: any;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    autoCorrect?: boolean;
  }
> = {
  email: {
    keyboardType: "email-address",
    autoComplete: "email",
    textContentType: "emailAddress",
    autoCapitalize: "none",
    autoCorrect: false,
  },
  phone: {
    keyboardType: "phone-pad",
    autoComplete: "tel",
    textContentType: "telephoneNumber",
  },
  number: {
    keyboardType: "numeric",
  },
  url: {
    keyboardType: "url",
    textContentType: "URL",
  },
  search: {
    keyboardType: "web-search",
  },
  password: {
    autoComplete: "password",
    textContentType: "password",
  },
};

const renderIconWithColor = (icon: React.ReactNode, color: string) => {
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon as React.ReactElement<any>, {
      color: (icon.props as any).color ?? color,
    });
  }
  return icon;
};

export const TextInput = React.forwardRef<RNTextInput, TextInputProps>(
  function TextInput(
    {
      className,
      containerClassName,
      label,
      labelClassName,
      labelVariant = "caption14Medium",
      placeholder,
      placeholderTextColorClassName,
      inputContainerClassName,
      style,
      inputStyle,
      rightIcon,
      leftIcon,
      error,
      required,
      errorClassName,
      innerShadow = true,
      onFocus,
      onBlur,
      type = "text",
      secureTextEntry,
      keyboardType,
      autoComplete,
      textContentType,
      autoCapitalize,
      autoCorrect,
      iconError,
      ...props
    },
    ref,
  ) {
    const [isFocused, setIsFocused] = useState(false);
    const [isSecure, setIsSecure] = useState(type === "password");

    const toggleSecureEntry = useCallback(() => {
      setIsSecure((prev) => !prev);
    }, []);

    const handleFocus = useCallback(
      (e: any) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e: any) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    const iconColor = useCSSVariable("--color-icon") as string;

    const showPasswordToggle = type === "password";

    const rightIconToRender = showPasswordToggle ? (
      <TouchableOpacity
        onPress={toggleSecureEntry}
        activeOpacity={0.7}
        className="p-1"
      >
        {isSecure ? (
          <EyeOffIcon  colorClassName="accent-placeholder" size={20} />
        ) : (
          <EyeIcon  colorClassName="accent-placeholder" size={20} />
        )}
      </TouchableOpacity>
    ) : (
      rightIcon
    );

    const config = type ? inputTypeConfig[type] : undefined;
    const resolvedKeyboardType = keyboardType ?? config?.keyboardType;
    const resolvedAutoComplete = autoComplete ?? config?.autoComplete;
    const resolvedTextContentType = textContentType ?? config?.textContentType;
    const resolvedAutoCapitalize = autoCapitalize ?? config?.autoCapitalize;
    const resolvedAutoCorrect = autoCorrect ?? config?.autoCorrect;
    const resolvedSecureTextEntry =
      type === "password" ? isSecure : secureTextEntry;

    return (
      <View style={style} className={cn("w-full", containerClassName)}>
        {label && (
          <View className="flex-row gap-1">
            <Text
              variant={labelVariant}
              className={cn("mb-1.5 text-neutral-03", labelClassName)}
            >
              {label}
            </Text>
            {required ? (
              <Text variant="caption13Regular" className="text-error-02">
                *
              </Text>
            ) : null}
          </View>
        )}
        <View
          className={cn(
            "flex-row items-center border rounded-lg px-4 overflow-hidden relative bg-neutral-12",
            error
              ? "border-error-02"
              : isFocused
                ? "border-primary-06"
                : "border-neutral-10",
            inputContainerClassName,
          )}
        >
          {leftIcon && (
            <View className="mr-2 ">
              {renderIconWithColor(leftIcon, iconColor)}
            </View>
          )}
          <RNTextInput
            ref={ref}
            placeholder={placeholder}
            placeholderTextColorClassName={
              placeholderTextColorClassName ?? "accent-placeholder"
            }
            style={inputStyle}
            className={cn(
              "py-4 flex-1 outline-none text-[15px] font-inter text-neutral-02",
              className,
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            keyboardType={resolvedKeyboardType}
            autoComplete={resolvedAutoComplete}
            textContentType={resolvedTextContentType}
            autoCapitalize={resolvedAutoCapitalize}
            autoCorrect={resolvedAutoCorrect}
            secureTextEntry={resolvedSecureTextEntry}
            {...props}
          />
          {rightIconToRender && (
            <View className="ml-2">
              {showPasswordToggle
                ? rightIconToRender
                : renderIconWithColor(rightIconToRender, iconColor)}
            </View>
          )}
        </View>
        {error && (
          <View className="flex-row items-center gap-1 pt-2">
            {iconError}
            <Text
              variant="caption12Regular"
              className={cn("mt-1 text-error-02", errorClassName)}
            >
              {error}
            </Text>
          </View>
        )}
      </View>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
export * from "./types";
