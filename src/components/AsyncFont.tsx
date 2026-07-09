import React from "react";

import * as Font from "expo-font";

function wrapPromise<T>(promise: Promise<T>) {
  let status: "pending" | "success" | "error" = "pending";
  let result: T | unknown;
  const suspender = promise.then(
    (r: T) => {
      status = "success";
      result = r;
    },
    (e: unknown) => {
      status = "error";
      result = e;
    },
  );
  return {
    read(): T {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result as T;
      }
      throw new Error("Unexpected state");
    },
  };
}

const fontMap = new Map();

const safeLoadAsync = async (
  fontFamily: string,
  src: Font.FontSource,
): Promise<void> => {
  try {
    await Font.loadAsync({ [fontFamily]: src });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : JSON.stringify(error);

    const isAlreadyRegistered =
      typeof message === "string" &&
      message.includes("CTFontManagerError") &&
      message.includes("code: 104");

    if (isAlreadyRegistered) {
      return;
    }

    throw error;
  }
};

const getSuspendingFont = (fontFamily: string, src: Font.FontSource) => {
  const id = JSON.stringify(fontFamily + "|" + JSON.stringify(src));
  if (!fontMap.has(id)) {
    const loader = wrapPromise(safeLoadAsync(fontFamily, src));
    fontMap.set(id, loader);
    return loader.read();
  }

  return fontMap.get(id).read();
};

const getLoadedFont = React.cache(getSuspendingFont);

type FontProps = {
  src: number | string;
  fontFamily: string;
  display?: Font.FontDisplay;
};

function SuspendingFont({ src, fontFamily }: FontProps) {
  getLoadedFont(fontFamily, src);
  return null;
}

function CSSFont({ src, fontFamily, display }: FontProps) {
  // @ts-expect-error This font depends on CSS for the state updating.
  Font.useFonts({
    [fontFamily]:
      typeof src === "string"
        ? { uri: src, fontDisplay: display }
        : { default: src, fontDisplay: display },
  });

  return null;
}

export const AsyncFont =
  process.env.EXPO_OS === "web" ? CSSFont : SuspendingFont;
