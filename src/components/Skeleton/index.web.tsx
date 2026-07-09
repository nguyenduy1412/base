import { cn } from "@/utils/cn";
import { View, type ViewProps } from "react-native";

export type SkeletonProps = ViewProps;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <View
      className={cn(
        "shimmer-skeleton relative overflow-hidden rounded-xl bg-slate-900/5 dark:bg-white/5 border border-sky-900/5",
        className,
      )}
      {...props}
    />
  );
}
