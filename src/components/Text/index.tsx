import { cn } from "@/utils/cn";
import React from "react";
import { Text as RNText } from "react-native";
import { type TextProps, type TextVariant } from "./types";

const TEXT_SIZE_CLASSES = {
  12: "text-[12px]",
  13: "text-[13px]",
  14: "text-[14px]",
  15: "text-[15px]",
  16: "text-[16px]",
  18: "text-[18px]",
  20: "text-[20px]",
  22: "text-[22px]",
  24: "text-[24px]",
  28: "text-[28px]",
  32: "text-[32px]",
  40: "text-[40px]",
  52: "text-[52px]",
} as const;

type TextSize = keyof typeof TEXT_SIZE_CLASSES;

const headingRegular = (size: TextSize) =>
  `${TEXT_SIZE_CLASSES[size]} font-cormorant leading-[1.2] tracking-[-1px]`;
const headingMedium = (size: TextSize) =>
  `${TEXT_SIZE_CLASSES[size]} font-cormorant-medium leading-[1.2] tracking-[-1px]`;
const headingSemibold = (size: TextSize) =>
  `${TEXT_SIZE_CLASSES[size]} font-cormorant-semibold leading-[1.2] tracking-[-1px]`;

const interRegular = (size: TextSize) =>
  `${TEXT_SIZE_CLASSES[size]} font-inter leading-[1.3]`;
const interMedium = (size: TextSize) =>
  `${TEXT_SIZE_CLASSES[size]} font-inter-medium leading-[1.3]`;
const interSemibold = (size: TextSize) =>
  `${TEXT_SIZE_CLASSES[size]} font-inter-semibold leading-[1.3]`;
const interBold = (size: TextSize) =>
  `${TEXT_SIZE_CLASSES[size]} font-inter-bold leading-[1.3]`;

export const TEXT_VARIANTS = {
  heading18Regular: headingRegular(18),
  heading18Medium: headingMedium(18),
  heading18Semibold: headingSemibold(18),
  heading20Regular: headingRegular(20),
  heading20Medium: headingMedium(20),
  heading20Semibold: headingSemibold(20),
  heading24Regular: headingRegular(24),
  heading24Medium: headingMedium(24),
  heading24Semibold: headingSemibold(24),
  heading28Regular: headingRegular(28),
  heading28Medium: headingMedium(28),
  heading28Semibold: headingSemibold(28),
  heading32Regular: headingRegular(32),
  heading32Medium: headingMedium(32),
  heading32Semibold: headingSemibold(32),
  heading40Regular: headingRegular(40),
  heading40Medium: headingMedium(40),
  heading40Semibold: headingSemibold(40),
  heading52Regular: headingRegular(52),
  heading52Medium: headingMedium(52),
  heading52Semibold: headingSemibold(52),

  subtitle20Regular: interRegular(20),
  subtitle20Medium: interMedium(20),
  subtitle20Semibold: interSemibold(20),
  subtitle20Bold: interBold(20),
  subtitle22Regular: interRegular(22),
  subtitle22Medium: interMedium(22),
  subtitle22Semibold: interSemibold(22),
  subtitle22Bold: interBold(22),
  subtitle24Regular: interRegular(24),
  subtitle24Medium: interMedium(24),
  subtitle24Semibold: interSemibold(24),
  subtitle24Bold: interBold(24),

  body16Regular: interRegular(16),
  body16Medium: interMedium(16),
  body16Semibold: interSemibold(16),
  body16Bold: interBold(16),
  body18Regular: interRegular(18),
  body18Medium: interMedium(18),
  body18Semibold: interSemibold(18),
  body18Bold: interBold(18),

  caption12Regular: interRegular(12),
  caption12Medium: interMedium(12),
  caption12Semibold: interSemibold(12),
  caption12Bold: interBold(12),
  caption13Regular: interRegular(13),
  caption13Medium: interMedium(13),
  caption13Semibold: interSemibold(13),
  caption13Bold: interBold(13),
  caption14Regular: interRegular(14),
  caption14Medium: interMedium(14),
  caption14Semibold: interSemibold(14),
  caption14Bold: interBold(14),
  caption15Regular: interRegular(15),
  caption15Medium: interMedium(15),
  caption15Semibold: interSemibold(15),
  caption15Bold: interBold(15),
} as const satisfies Record<TextVariant, string>;

export const Text = React.forwardRef<RNText, TextProps>(
  (
    { className, variant = "caption14Regular", color, style, ...props },
    ref,
  ) => {
    const variantClass =
      TEXT_VARIANTS[variant] || TEXT_VARIANTS.caption14Regular;

    return (
      <RNText
        ref={ref}
        className={cn("text-neutral-02", variantClass, className)}
        {...props}
      />
    );
  },
);

Text.displayName = "Text";

export * from "./types";
