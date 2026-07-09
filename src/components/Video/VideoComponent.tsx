import { useIsFocused, useFocusEffect } from "expo-router";
import type { VideoPlayer, VideoSource, VideoViewProps } from "expo-video";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { memo, useCallback } from "react";
import {
  Platform,
  StyleSheet,
  type StyleProp,
  useWindowDimensions,
  type ViewStyle,
  View,
  AppState,
  type AppStateStatus,
} from "react-native";

if (
  Platform.OS === "web" &&
  typeof window !== "undefined" &&
  "HTMLVideoElement" in window
) {
  const proto = (window as any).HTMLVideoElement.prototype;
  const originalPlay = proto.play;
  if (originalPlay) {
    proto.play = function play(this: any, ...args: any[]) {
      const result = originalPlay.apply(this, args);
      if (result && typeof result.catch === "function") {
        return result.catch((error: any) => {
          if (error && error.name === "AbortError") {
            return;
          }
          return Promise.reject(error);
        });
      }
      return result;
    };
  }
}

export type VideoComponentProps = Omit<VideoViewProps, "player" | "style"> & {
  source?: VideoSource;
  uri?: string;
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  heightRatio?: number;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  volume?: number;
  borderRadius?: number;
  backgroundColor?: string;
  unmountOnBlur?: boolean;
};

const VideoComponent = ({
  unmountOnBlur = true,
  ...props
}: VideoComponentProps) => {
  const isFocused = useIsFocused();

  if (unmountOnBlur && !isFocused) {
    return null;
  }

  return <FocusedVideoComponent {...props} />;
};

const FocusedVideoComponent = ({
  source,
  uri,
  style,
  width,
  height,
  heightRatio = 0.75,
  autoPlay = true,
  loop = true,
  muted = true,
  volume,
  borderRadius = 0,
  backgroundColor = "transparent",
  nativeControls = false,
  contentFit = "cover",
  surfaceType = Platform.OS === "android" ? "surfaceView" : "textureView",
  allowsVideoFrameAnalysis = false,
  ...videoViewProps
}: VideoComponentProps) => {
  const { width: windowWidth } = useWindowDimensions();
  const videoSource = source ?? uri ?? "";
  const videoWidth = width ?? windowWidth;
  const videoHeight = height ?? videoWidth * heightRatio;
  const videoVolume = muted ? 0 : (volume ?? 1);

  const setupPlayer = useCallback(
    (player: VideoPlayer) => {
      player.loop = loop;
      player.muted = muted;
      player.volume = videoVolume;
    },
    [loop, muted, videoVolume],
  );

  const player = useVideoPlayer(videoSource, setupPlayer);

  const playVideo = useCallback(() => {
    try {
      const result = player.play() as any;
      if (result && typeof result.catch === "function") {
        result.catch((error: any) => {
          if (
            error &&
            error.name !== "AbortError" &&
            !error.message?.includes("NotFoundException")
          ) {
            console.warn("Video playback failed:", error);
          }
        });
      }
    } catch (error: any) {
      if (
        error &&
        error.name !== "AbortError" &&
        !error.message?.includes("NotFoundException")
      ) {
        console.warn("Video playback error:", error);
      }
    }
  }, [player]);

  const pauseVideo = useCallback(() => {
    try {
      player.pause();
    } catch {
    }
  }, [player]);

  useFocusEffect(
    useCallback(() => {
      if (autoPlay) {
        playVideo();
      } else {
        pauseVideo();
      }

      const handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (nextAppState === "active") {
          if (autoPlay) {
            playVideo();
          }
        } else if (
          nextAppState === "background" ||
          nextAppState === "inactive"
        ) {
          pauseVideo();
        }
      };

      const subscription = AppState.addEventListener(
        "change",
        handleAppStateChange,
      );

      let focusListener: (() => void) | undefined;
      if (Platform.OS === "web" && typeof window !== "undefined") {
        focusListener = () => {
          if (autoPlay) {
            playVideo();
          }
        };
        window.addEventListener("focus", focusListener);
      }

      return () => {
        pauseVideo();
        subscription.remove();
        if (focusListener) {
          window.removeEventListener("focus", focusListener);
        }
      };
    }, [autoPlay, playVideo, pauseVideo]),
  );

  return (
    <View
      className="overflow-hidden"
      style={[
        {
          width: videoWidth,
          height: videoHeight,
          borderRadius: borderRadius,
          backgroundColor: backgroundColor,
        },
        style,
      ]}
    >
      <VideoView
        {...videoViewProps}
        player={player}
        nativeControls={nativeControls}
        contentFit={contentFit}
        surfaceType={surfaceType}
        allowsVideoFrameAnalysis={allowsVideoFrameAnalysis}
        style={styles.video}
      />
    </View>
  );
};

export { VideoComponent };
export default memo(VideoComponent);

const styles = StyleSheet.create({
  video: {
    height: "100%",
    width: "100%",
  },
});
