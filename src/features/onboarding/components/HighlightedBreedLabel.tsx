import { memo, useMemo } from "react";

import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import { getHighlightSegments } from "../utils/fuzzySearch";

export interface HighlightedBreedLabelProps {
  label: string;
  matchedIndices?: number[];
  className?: string;
  matchedClassName?: string;
}

const HighlightedBreedLabel = ({
  label,
  matchedIndices = [],
  className,
  matchedClassName,
}: HighlightedBreedLabelProps) => {
  const segments = useMemo(() => {
    return getHighlightSegments(label, matchedIndices);
  }, [label, matchedIndices]);

  return (
    <Text variant="body16Regular" className={cn("text-label", className)}>
      {segments.map((segment, index) => (
        <Text
          key={`${segment.char}-${index}`}
          variant={segment.isMatched ? "body16Semibold" : "body16Regular"}
          className={cn(
            segment.isMatched ? "text-primary" : "text-label",
            segment.isMatched && matchedClassName,
          )}
        >
          {segment.char}
        </Text>
      ))}
    </Text>
  );
};

export default memo(HighlightedBreedLabel);
