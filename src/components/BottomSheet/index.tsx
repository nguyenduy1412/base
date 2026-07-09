import { cn } from "@/utils/cn";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { forwardRef, ReactNode, useMemo } from "react";
import { Text, View } from "react-native";

export type AppBottomSheetProps = {
  title?: string;
  children: ReactNode;
  snapPoints?: string[];
  className?: string;
  contentClassName?: string;
};

export const AppBottomSheet = forwardRef<BottomSheetModal, AppBottomSheetProps>(
  function AppBottomSheet(
    { title, children, snapPoints = ["45%"], className, contentClassName },
    ref,
  ) {
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={memoizedSnapPoints}
        enablePanDownToClose
        handleComponent={null}
        backgroundStyle={{
          backgroundColor: "#FAF8F5",
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
        <BottomSheetView>
          <View className="mb-3.5 h-4.25 w-22 self-center rounded-full bg-[#D7DAD9]" />

          {title ? (
            <Text
              //   variant="body24Semibold"
              className="text-[32px] leading-9.5 text-[#313533]"
            >
              {title}
            </Text>
          ) : null}

          <View className={cn("mt-4.5", contentClassName)}>{children}</View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);
AppBottomSheet.displayName = "AppBottomSheet";
