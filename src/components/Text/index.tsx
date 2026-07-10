import { cn } from "@/utils/cn";
import React from "react";
import { Text as RNText } from "react-native";
import { type TextProps } from "./types";

const TEXT_SIZE_CLASSES = {
  10: "text-[10px]",
  11: "text-[11px]",
  12: "text-[12px]",
  13: "text-[13px]",
  14: "text-[14px]",
  15: "text-[15px]",
  16: "text-[16px]",
  17: "text-[17px]",
  18: "text-[18px]",
  19: "text-[19px]",
  20: "text-[20px]",
  21: "text-[21px]",
  22: "text-[22px]",
  23: "text-[23px]",
  24: "text-[24px]",
  32: "text-[32px]",
} as const;

type TextSize = keyof typeof TEXT_SIZE_CLASSES;

const createRegularTypography = (size: TextSize) =>
  `${TEXT_SIZE_CLASSES[size]} font-sans`;

const createMediumTypography = (size: TextSize) =>
  `${TEXT_SIZE_CLASSES[size]} font-sans-medium`;

const createSemiboldTypography = (size: TextSize) =>
  `${TEXT_SIZE_CLASSES[size]} font-sans-semibold`;

const createBoldTypography = (size: TextSize) =>
  `${TEXT_SIZE_CLASSES[size]} font-sans-bold`;

const createExtraBoldTypography = (size: TextSize) =>
  `${TEXT_SIZE_CLASSES[size]} font-sans-extrabold`;

export const TEXT_VARIANTS = {
  body10Regular: createRegularTypography(10),
  body10Medium: createMediumTypography(10),
  body10Semibold: createSemiboldTypography(10),
  body10Bold: createBoldTypography(10),
  body10ExtraBold: createExtraBoldTypography(10),

  body11Regular: createRegularTypography(11),
  body11Medium: createMediumTypography(11),
  body11Semibold: createSemiboldTypography(11),
  body11Bold: createBoldTypography(11),
  body11ExtraBold: createExtraBoldTypography(11),

  body12Regular: createRegularTypography(12),
  body12Medium: createMediumTypography(12),
  body12Semibold: createSemiboldTypography(12),
  body12Bold: createBoldTypography(12),
  body12ExtraBold: createExtraBoldTypography(12),

  body13Regular: createRegularTypography(13),
  body13Medium: createMediumTypography(13),
  body13Semibold: createSemiboldTypography(13),
  body13Bold: createBoldTypography(13),
  body13ExtraBold: createExtraBoldTypography(13),

  body14Regular: createRegularTypography(14),
  body14Medium: createMediumTypography(14),
  body14Semibold: createSemiboldTypography(14),
  body14Bold: createBoldTypography(14),
  body14ExtraBold: createExtraBoldTypography(14),

  body15Regular: createRegularTypography(15),
  body15Medium: createMediumTypography(15),
  body15Semibold: createSemiboldTypography(15),
  body15Bold: createBoldTypography(15),
  body15ExtraBold: createExtraBoldTypography(15),

  body16Regular: createRegularTypography(16),
  body16Medium: createMediumTypography(16),
  body16Semibold: createSemiboldTypography(16),
  body16Bold: createBoldTypography(16),
  body16ExtraBold: createExtraBoldTypography(16),

  body17Regular: createRegularTypography(17),
  body17Medium: createMediumTypography(17),
  body17Semibold: createSemiboldTypography(17),
  body17Bold: createBoldTypography(17),
  body17ExtraBold: createExtraBoldTypography(17),

  body18Regular: createRegularTypography(18),
  body18Medium: createMediumTypography(18),
  body18Semibold: createSemiboldTypography(18),
  body18Bold: createBoldTypography(18),
  body18ExtraBold: createExtraBoldTypography(18),

  body19Regular: createRegularTypography(19),
  body19Medium: createMediumTypography(19),
  body19Semibold: createSemiboldTypography(19),
  body19Bold: createBoldTypography(19),
  body19ExtraBold: createExtraBoldTypography(19),

  body20Regular: createRegularTypography(20),
  body20Medium: createMediumTypography(20),
  body20Semibold: createSemiboldTypography(20),
  body20Bold: createBoldTypography(20),
  body20ExtraBold: createExtraBoldTypography(20),

  body21Regular: createRegularTypography(21),
  body21Medium: createMediumTypography(21),
  body21Semibold: createSemiboldTypography(21),
  body21Bold: createBoldTypography(21),
  body21ExtraBold: createExtraBoldTypography(21),

  body22Regular: createRegularTypography(22),
  body22Medium: createMediumTypography(22),
  body22Semibold: createSemiboldTypography(22),
  body22Bold: createBoldTypography(22),
  body22ExtraBold: createExtraBoldTypography(22),

  body23Regular: createRegularTypography(23),
  body23Medium: createMediumTypography(23),
  body23Semibold: createSemiboldTypography(23),
  body23Bold: createBoldTypography(23),
  body23ExtraBold: createExtraBoldTypography(23),

  body24Regular: createRegularTypography(24),
  body24Medium: createMediumTypography(24),
  body24Semibold: createSemiboldTypography(24),
  body24Bold: createBoldTypography(24),
  body24ExtraBold: createExtraBoldTypography(24),

  body32Regular: createRegularTypography(32),
  body32Medium: createMediumTypography(32),
  body32Semibold: createSemiboldTypography(32),
  body32Bold: createBoldTypography(32),
  body32ExtraBold: createExtraBoldTypography(32),
} as const;

export const Text = React.forwardRef<RNText, TextProps>(
  ({ className, variant = "body14Regular", style, ...props }, ref) => {
    const variantClass = TEXT_VARIANTS[variant] || TEXT_VARIANTS.body14Regular;

    return (
      <RNText
        ref={ref}
        className={cn("text-text", variantClass, className)}
        style={style}
        {...props}
      />
    );
  },
);

Text.displayName = "Text";

export default Text;
export * from "./types";
