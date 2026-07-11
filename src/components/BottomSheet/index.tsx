import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef, ReactNode, useMemo } from "react";
import { View } from "react-native";
import { useCSSVariable } from "uniwind";

export type AppBottomSheetProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  snapPoints?: string[];
};

export const AppBottomSheet = forwardRef<BottomSheetModal, AppBottomSheetProps>(
  function AppBottomSheet(
    { title, children, className, snapPoints = ["50%"], contentClassName },
    ref,
  ) {
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);
    const backgroundColor = useCSSVariable("--color-white") as string;

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={memoizedSnapPoints}
        enablePanDownToClose
        enableDynamicSizing={false}
        backgroundStyle={{
          backgroundColor,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <View style={{ flex: 1 }} className={cn(className)}>
          {title ? (
            <Text
              variant="body24Semibold"
              className="font-serif text-[32px] leading-9.5 text-text-heading"
            >
              {title}
            </Text>
          ) : null}
          <View
            className={cn("flex-1", title ? "mt-4.5" : "", contentClassName)}
          >
            {children}
          </View>
        </View>
      </BottomSheetModal>
    );
  },
);
AppBottomSheet.displayName = "AppBottomSheet";
