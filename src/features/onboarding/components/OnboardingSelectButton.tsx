import { Button } from "@/components/Button";
import { cn } from "@/utils/cn";
import { memo } from "react";
import { HEALTH_CONDITIONS } from "../schemas/onboarding";

type HealthCondition = (typeof HEALTH_CONDITIONS)[number];

export interface OnboardingSelectButtonProps {
  item: HealthCondition;
  label?: string;
  isSelected?: boolean;
  toggleCondition: (condition: HealthCondition) => void;
  className?: string;
  selectedClassName?: string;
  unselectedClassName?: string;
  textClassName?: string;
  selectedTextClassName?: string;
  unselectedTextClassName?: string;
}

const OnboardingSelectButton = ({
  item,
  label,
  isSelected = false,
  toggleCondition,
  className,
  selectedClassName,
  unselectedClassName,
  textClassName,
  selectedTextClassName,
  unselectedTextClassName,
}: OnboardingSelectButtonProps) => {
  const handleToggleCondition = () => {
    toggleCondition(item);
  };

  return (
    <Button
      title={label ?? item}
      color={isSelected ? "primary" : "white"}
      variant={isSelected ? "body16Bold" : "body16Regular"}
      textClassName={cn(
        isSelected ? "text-white" : "text-placeholder",
        isSelected ? selectedTextClassName : unselectedTextClassName,
        textClassName,
      )}
      className={cn(
        "h-12 rounded-xl border px-5 py-0",
        isSelected ? "border-primary" : "border-input-border",
        isSelected ? selectedClassName : unselectedClassName,
        className,
      )}
      isShadow={false}
      onPress={handleToggleCondition}
    />
  );
};

export default memo(OnboardingSelectButton);
