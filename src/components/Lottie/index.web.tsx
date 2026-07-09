import { memoPropsEqual } from "@/utils/props-equal";
import { Data, DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { LottieViewProps as NativeLottieViewProps } from "lottie-react-native";
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import type { LottieViewHandle } from "./types";

export interface LottieViewProps extends Omit<NativeLottieViewProps, "style"> {
  className?: string;
  showLastFrame?: boolean;
}

const seekToLastFrame = (dotLottie: DotLottie | null) => {
  if (!dotLottie || dotLottie.totalFrames <= 0) {
    return;
  }

  dotLottie.setFrame(dotLottie.totalFrames - 1);
  dotLottie.pause();
};

const LottieView = memo(
  forwardRef<LottieViewHandle, LottieViewProps>(function LottieView(
    {
      source,
      autoPlay = false,
      loop = false,
      showLastFrame = false,
      className,
      speed = 1,
      ...restProps
    },
    ref,
  ) {
    const dotLottieRef = useRef<DotLottie | null>(null);

    useImperativeHandle(ref, () => ({
      play: () => dotLottieRef.current?.play(),
      reset: () => {
        const dotLottie = dotLottieRef.current;
        if (!dotLottie) {
          return;
        }

        dotLottie.setFrame(0);
        dotLottie.pause();
      },
      pause: () => dotLottieRef.current?.pause(),
    }));

    useEffect(() => {
      if (!showLastFrame || autoPlay) {
        return;
      }

      const dotLottie = dotLottieRef.current;
      if (!dotLottie) {
        return;
      }

      const handleLoad = () => seekToLastFrame(dotLottie);

      dotLottie.addEventListener("load", handleLoad);
      handleLoad();

      return () => {
        dotLottie.removeEventListener("load", handleLoad);
      };
    }, [autoPlay, showLastFrame, source]);

    return (
      <DotLottieReact
        data={source as Data}
        autoplay={autoPlay}
        loop={loop}
        speed={speed}
        className={className}
        dotLottieRefCallback={(instance) => {
          dotLottieRef.current = instance;

          if (showLastFrame && !autoPlay) {
            seekToLastFrame(instance);
          }
        }}
        {...restProps}
      />
    );
  }),
  memoPropsEqual(["source"]),
);

LottieView.displayName = "LottieView";

export type { LottieViewHandle } from "./types";
export default LottieView;
