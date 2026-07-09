import { memoPropsEqual } from "@/utils/props-equal";
import LottieViewNative, {
  type LottieViewProps as NativeLottieViewProps,
} from "lottie-react-native";
import { forwardRef, memo, useImperativeHandle, useRef } from "react";
import { withUniwind } from "uniwind";
import type { LottieViewHandle } from "./types";

const UniwindLottie = withUniwind(LottieViewNative);

export interface LottieViewProps extends NativeLottieViewProps {
  className?: string;
  showLastFrame?: boolean;
}

const LottieView = memo(
  forwardRef<LottieViewHandle, LottieViewProps>(function LottieView(
    {
      loop = false,
      autoPlay = false,
      showLastFrame = false,
      progress,
      ...props
    },
    ref,
  ) {
    const lottieRef = useRef<LottieViewNative>(null);

    useImperativeHandle(ref, () => ({
      play: () => lottieRef.current?.play(),
      reset: () => lottieRef.current?.reset(),
      pause: () => lottieRef.current?.pause(),
    }));

    const staticProgress =
      progress ?? (showLastFrame && !autoPlay ? 1 : undefined);

    return (
      <UniwindLottie
        ref={lottieRef}
        loop={loop}
        autoPlay={autoPlay}
        progress={staticProgress}
        {...props}
      />
    );
  }),
  memoPropsEqual(["source"]),
);

LottieView.displayName = "LottieView";

export type { LottieViewHandle } from "./types";
export default LottieView;
