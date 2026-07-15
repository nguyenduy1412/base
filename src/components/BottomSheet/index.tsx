import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  forwardRef,
  ReactNode,
  useMemo,
  useRef,
  useImperativeHandle,
} from "react";
import { View } from "react-native";
import { useCSSVariable } from "uniwind";

export type AppBottomSheetProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  snapPoints?: string[];
  enableDynamicSizing?: boolean;
  onDismiss?: () => void;
  onPresent?: () => void;
};

export const AppBottomSheet = forwardRef<BottomSheetModal, AppBottomSheetProps>(
  function AppBottomSheet(
    {
      title,
      children,
      className,
      snapPoints = ["55%"],
      contentClassName,
      enableDynamicSizing = false,
      onDismiss,
      onPresent,
    },
    ref,
  ) {
    const innerRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      ...(innerRef.current as BottomSheetModal),
      present: (data?: any) => {
        onPresent?.();
        innerRef.current?.present(data);
      },
    }));

    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);
    const backgroundColor = useCSSVariable("--color-white") as string;

    const Wrapper = enableDynamicSizing ? BottomSheetView : View;

    return (
      <BottomSheetModal
        ref={innerRef}
        onDismiss={onDismiss}
        snapPoints={enableDynamicSizing ? undefined : memoizedSnapPoints}
        enablePanDownToClose
        enableDynamicSizing={enableDynamicSizing}
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
        <Wrapper
          style={enableDynamicSizing ? undefined : { flex: 1 }}
          className={cn(className)}
        >
          {title ? (
            <Text
              variant="subtitle24Semibold"
              className="font-serif text-[32px] leading-9.5 text-text-heading"
            >
              {title}
            </Text>
          ) : null}
          <View
            className={cn(
              enableDynamicSizing ? "" : "flex-1",
              title ? "mt-4.5" : "",
              contentClassName,
            )}
          >
            {children}
          </View>
        </Wrapper>
      </BottomSheetModal>
    );
  },
);
AppBottomSheet.displayName = "AppBottomSheet";
