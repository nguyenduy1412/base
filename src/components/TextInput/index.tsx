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
import { type TextInputProps } from "./types";
import { useCSSVariable } from "uniwind";

const inputTypeConfig: Record<
  string,
  {
    keyboardType?: KeyboardTypeOptions;
    autoComplete?: any;
    textContentType?: any;
  }
> = {
  email: {
    keyboardType: "email-address",
    autoComplete: "email",
    textContentType: "emailAddress",
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
      labelVariant = "body14Medium",
      placeholder,
      placeholderTextColorClassName,
      style,
      inputStyle,
      rightIcon,
      leftIcon,
      error,
      errorClassName,
      innerShadow = true,
      onFocus,
      onBlur,
      type = "text",
      secureTextEntry,
      keyboardType,
      autoComplete,
      textContentType,
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

    const placeholderColor =
      (useCSSVariable("--color-placeholder") as string) ?? "#A9826A";
    const iconColor = (useCSSVariable("--color-icon") as string) ?? "#7D4E3A";

    const showPasswordToggle = type === "password";

    const rightIconToRender = showPasswordToggle ? (
      <TouchableOpacity
        onPress={toggleSecureEntry}
        activeOpacity={0.7}
        className="p-1"
      >
        {isSecure ? (
          <EyeOff color={placeholderColor} size={20} />
        ) : (
          <Eye color={placeholderColor} size={20} />
        )}
      </TouchableOpacity>
    ) : (
      rightIcon
    );

    const config = type ? inputTypeConfig[type] : undefined;
    const resolvedKeyboardType = keyboardType ?? config?.keyboardType;
    const resolvedAutoComplete = autoComplete ?? config?.autoComplete;
    const resolvedTextContentType = textContentType ?? config?.textContentType;
    const resolvedSecureTextEntry =
      type === "password" ? isSecure : secureTextEntry;

    return (
      <View style={style} className={cn("w-full", containerClassName)}>
        {label && (
          <Text
            variant={labelVariant}
            className={cn("mb-1.5 text-text-secondary", labelClassName)}
          >
            {label}
          </Text>
        )}
        <View
          className={cn(
            "flex-row items-center border rounded-lg px-4 overflow-hidden relative bg-input-background",
            error
              ? "border-primary"
              : isFocused
                ? "border-input-focused-border"
                : "border-input-border",
          )}
        >
          {innerShadow && (
            <>
              <View
                pointerEvents="none"
                className="absolute top-0 left-0 right-0 h-1 bg-linear-to-b from-text-field-inner-shadow to-text-field-inner-shadow-transparent pointer-events-none"
              />
              <View
                pointerEvents="none"
                className="absolute top-0 bottom-0 left-0 w-[5px] bg-linear-to-r from-text-field-inner-shadow-soft to-text-field-inner-shadow-transparent pointer-events-none"
              />
              <View
                pointerEvents="none"
                className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-b from-text-field-inner-highlight-transparent to-text-field-inner-highlight pointer-events-none"
              />
              <View
                pointerEvents="none"
                className="absolute top-0 bottom-0 right-0 w-1 bg-linear-to-r from-text-field-inner-highlight-transparent to-text-field-inner-highlight-soft pointer-events-none"
              />
            </>
          )}
          {leftIcon && (
            <View className="mr-2">
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
              "py-4 flex-1 outline-none text-text-primary",
              className,
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            keyboardType={resolvedKeyboardType}
            autoComplete={resolvedAutoComplete}
            textContentType={resolvedTextContentType}
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
          <Text
            variant="body10Regular"
            className={cn("mt-1 text-primary", errorClassName)}
          >
            {error}
          </Text>
        )}
      </View>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
export * from "./types";
