import {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  LayoutChangeEvent,
  Modal,
  ModalProps,
  Pressable,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import NativeTooltip, { Placement } from "react-native-tooltip-2";

import { Text } from "@/components/Text";

export type TooltipPlacement = "auto" | "top" | "bottom";
export type TooltipArrowAlignment = "auto" | "left" | "center" | "right";

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Size = {
  width: number;
  height: number;
};

type TooltipRegistration = {
  rect: Rect | null;
  open: () => void;
  close: () => void;
  measure: () => void;
};

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  placement?: TooltipPlacement;
  arrowAlignment?: TooltipArrowAlignment;
  maxWidthRatio?: number;
  maxWidth?: number;
  minWidth?: number;
  screenInset?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  contentStyle?: StyleProp<ViewStyle>;
  isVisible?: boolean;
  defaultVisible?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  onVisibilityChange?: (visible: boolean) => void;
}

const DEFAULT_BACKGROUND_COLOR = "#72B7BA";
const DEFAULT_BORDER_COLOR = "#FFFFFF";
const DEFAULT_MAX_WIDTH_RATIO = 0.82;
const DEFAULT_MAX_WIDTH = 360;
const DEFAULT_SCREEN_INSET = 20;
const ARROW_WIDTH = 22;
const ARROW_HEIGHT = 20;
const ARROW_HALF_WIDTH = ARROW_WIDTH / 2;
const CHILD_SPACING = 4;
const ESTIMATED_CONTENT_HEIGHT = 96;

let nextTooltipId = 1;
let activeTooltipId: number | null = null;
let registryVersion = 0;
const tooltipRegistry = new Map<number, TooltipRegistration>();
const registryListeners = new Set<() => void>();

const emitRegistryChange = () => {
  registryVersion += 1;
  registryListeners.forEach((listener) => listener());
};

const subscribeToRegistry = (listener: () => void) => {
  registryListeners.add(listener);
  return () => registryListeners.delete(listener);
};

const getRegistrySnapshot = () => registryVersion;

const registerTooltip = (id: number, registration: TooltipRegistration) => {
  tooltipRegistry.set(id, registration);
  emitRegistryChange();

  return () => {
    tooltipRegistry.delete(id);
    if (activeTooltipId === id) activeTooltipId = null;
    emitRegistryChange();
  };
};

const updateTooltipRect = (id: number, rect: Rect) => {
  const registration = tooltipRegistry.get(id);
  if (!registration) return;

  registration.rect = rect;
  emitRegistryChange();
};

const openRegisteredTooltip = (id: number, updateTarget = true) => {
  if (activeTooltipId === id) return;

  tooltipRegistry.forEach((registration) => registration.measure());

  if (activeTooltipId !== null) {
    tooltipRegistry.get(activeTooltipId)?.close();
  }

  activeTooltipId = id;
  if (updateTarget) tooltipRegistry.get(id)?.open();
  emitRegistryChange();
};

const closeRegisteredTooltip = (id: number, updateTarget = true) => {
  if (activeTooltipId !== id) return;

  activeTooltipId = null;
  if (updateTarget) tooltipRegistry.get(id)?.close();
  emitRegistryChange();
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const styles = StyleSheet.create({
  contentWrapper: {
    overflow: "visible",
    padding: 0,
    backgroundColor: "transparent",
  },
  bubble: {
    position: "relative",
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  text: {
    color: "#FFFFFF",
    flexShrink: 1,
  },
  arrow: {
    position: "absolute",
    left: 0,
    width: 0,
    height: 0,
  },
  modalRoot: {
    flex: 1,
  },
  registeredTrigger: {
    position: "absolute",
    zIndex: 1000,
  },
});

const RegisteredTooltipTriggers = memo(() => {
  useSyncExternalStore(
    subscribeToRegistry,
    getRegistrySnapshot,
    getRegistrySnapshot,
  );

  return Array.from(tooltipRegistry.entries()).map(([id, registration]) => {
    if (id === activeTooltipId || !registration.rect) return null;

    const { x, y, width, height } = registration.rect;
    return (
      <Pressable
        key={id}
        accessible={false}
        onPress={() => openRegisteredTooltip(id)}
        style={[styles.registeredTrigger, { top: y, left: x, width, height }]}
      />
    );
  });
});

RegisteredTooltipTriggers.displayName = "RegisteredTooltipTriggers";

const SharedTooltipModal = ({ children, ...props }: ModalProps) => (
  <Modal {...props}>
    <View style={styles.modalRoot}>
      {children}
      <RegisteredTooltipTriggers />
    </View>
  </Modal>
);

SharedTooltipModal.displayName = "SharedTooltipModal";

const Tooltip = ({
  children,
  content,
  placement = "auto",
  arrowAlignment = "auto",
  maxWidthRatio = DEFAULT_MAX_WIDTH_RATIO,
  maxWidth = DEFAULT_MAX_WIDTH,
  minWidth,
  screenInset = DEFAULT_SCREEN_INSET,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  borderColor = DEFAULT_BORDER_COLOR,
  borderWidth = 2,
  borderRadius = 12,
  contentStyle,
  isVisible,
  defaultVisible = false,
  disabled = false,
  accessibilityLabel = "Show more information",
  onVisibilityChange,
}: TooltipProps) => {
  const [tooltipId] = useState(() => nextTooltipId++);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const anchorRef = useRef<View>(null);
  const [internalVisible, setInternalVisible] = useState(defaultVisible);
  const [anchorRect, setAnchorRect] = useState<Rect | null>(null);
  const [bubbleSize, setBubbleSize] = useState<Size>({ width: 0, height: 0 });

  const visible = isVisible ?? internalVisible;
  const widthRatio = clamp(maxWidthRatio, 0.5, 0.95);
  const responsiveMaxWidth = Math.min(screenWidth * widthRatio, maxWidth);

  const setVisible = useCallback(
    (nextVisible: boolean) => {
      if (isVisible === undefined) {
        setInternalVisible(nextVisible);
      }
      onVisibilityChange?.(nextVisible);
    },
    [isVisible, onVisibilityChange],
  );

  const setVisibleRef = useRef(setVisible);
  const measureAnchorRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    setVisibleRef.current = setVisible;
  }, [setVisible]);

  const measureAnchor = useCallback(
    (onMeasured?: () => void) => {
      const anchor = anchorRef.current;
      if (!anchor) {
        onMeasured?.();
        return;
      }

      anchor.measureInWindow((x, y, width, height) => {
        const rect = { x, y, width, height };
        setAnchorRect(rect);
        updateTooltipRect(tooltipId, rect);
        onMeasured?.();
      });
    },
    [tooltipId],
  );

  useEffect(() => {
    measureAnchorRef.current = measureAnchor;
  }, [measureAnchor]);

  useEffect(
    () =>
      registerTooltip(tooltipId, {
        rect: null,
        open: () => setVisibleRef.current(true),
        close: () => setVisibleRef.current(false),
        measure: () => measureAnchorRef.current(),
      }),
    [tooltipId],
  );

  useEffect(() => {
    if (visible) {
      openRegisteredTooltip(tooltipId, false);
    } else {
      closeRegisteredTooltip(tooltipId, false);
    }
  }, [tooltipId, visible]);

  const handlePress = useCallback(() => {
    if (disabled) return;

    if (visible) {
      closeRegisteredTooltip(tooltipId);
      return;
    }

    measureAnchor(() => openRegisteredTooltip(tooltipId));
  }, [disabled, measureAnchor, tooltipId, visible]);

  const resolvedPlacement = useMemo(() => {
    if (placement === "top") return Placement.TOP;
    if (placement === "bottom") return Placement.BOTTOM;
    if (!anchorRect) return Placement.TOP;

    const requiredHeight =
      (bubbleSize.height || ESTIMATED_CONTENT_HEIGHT) +
      ARROW_HEIGHT +
      CHILD_SPACING;
    const topSpace = anchorRect.y - screenInset;
    const bottomSpace =
      screenHeight - (anchorRect.y + anchorRect.height) - screenInset;

    if (topSpace >= requiredHeight) return Placement.TOP;
    if (bottomSpace >= requiredHeight) return Placement.BOTTOM;
    return topSpace >= bottomSpace ? Placement.TOP : Placement.BOTTOM;
  }, [anchorRect, bubbleSize.height, placement, screenHeight, screenInset]);

  const arrowX = useMemo(() => {
    const bubbleWidth = bubbleSize.width;
    if (!bubbleWidth) return 0;

    const minArrowX = ARROW_HALF_WIDTH + borderWidth;
    const maxArrowX = bubbleWidth - ARROW_HALF_WIDTH - borderWidth;

    if (arrowAlignment === "left") {
      return clamp(bubbleWidth * 0.25, minArrowX, maxArrowX);
    }
    if (arrowAlignment === "right") {
      return clamp(bubbleWidth * 0.75, minArrowX, maxArrowX);
    }
    if (arrowAlignment === "center" || !anchorRect) {
      return bubbleWidth / 2;
    }

    const availableWidth = screenWidth - screenInset * 2;
    const anchorCenter = anchorRect.x + anchorRect.width / 2;
    let adjustedAnchorCenter = anchorCenter;

    if (anchorCenter + ARROW_WIDTH > screenWidth - screenInset) {
      adjustedAnchorCenter =
        screenWidth - screenInset - Math.abs(ARROW_WIDTH - ARROW_HEIGHT) - 8;
    } else if (anchorCenter - ARROW_WIDTH < screenInset) {
      adjustedAnchorCenter =
        screenInset + Math.abs(ARROW_WIDTH - ARROW_HEIGHT) + 8;
    }

    let bubbleOriginX =
      bubbleWidth >= availableWidth
        ? screenInset
        : Math.max(screenInset, anchorCenter - bubbleWidth / 2);

    if (bubbleOriginX + bubbleWidth > availableWidth) {
      bubbleOriginX = screenWidth - screenInset - bubbleWidth;
    }

    return clamp(adjustedAnchorCenter - bubbleOriginX, minArrowX, maxArrowX);
  }, [
    anchorRect,
    arrowAlignment,
    borderWidth,
    bubbleSize.width,
    screenInset,
    screenWidth,
  ]);

  const handleBubbleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setBubbleSize((current) =>
      current.width === width && current.height === height
        ? current
        : { width, height },
    );
  }, []);

  const isAboveAnchor = resolvedPlacement === Placement.TOP;
  const outerArrowStyle: ViewStyle = isAboveAnchor
    ? {
        bottom: -(ARROW_HEIGHT + borderWidth),
        marginLeft: -ARROW_HALF_WIDTH,
        borderLeftWidth: ARROW_HALF_WIDTH,
        borderRightWidth: ARROW_HALF_WIDTH,
        borderTopWidth: ARROW_HEIGHT,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: borderColor,
      }
    : {
        top: -(ARROW_HEIGHT + borderWidth),
        marginLeft: -ARROW_HALF_WIDTH,
        borderLeftWidth: ARROW_HALF_WIDTH,
        borderRightWidth: ARROW_HALF_WIDTH,
        borderBottomWidth: ARROW_HEIGHT,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: borderColor,
      };
  const innerArrowStyle: ViewStyle = isAboveAnchor
    ? {
        bottom: -(ARROW_HEIGHT - borderWidth),
        marginLeft: -(ARROW_HALF_WIDTH - borderWidth - 1),
        borderLeftWidth: ARROW_HALF_WIDTH - borderWidth - 1,
        borderRightWidth: ARROW_HALF_WIDTH - borderWidth - 1,
        borderTopWidth: ARROW_HEIGHT - borderWidth,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: backgroundColor,
      }
    : {
        top: -(ARROW_HEIGHT - borderWidth),
        marginLeft: -(ARROW_HALF_WIDTH - borderWidth - 1),
        borderLeftWidth: ARROW_HALF_WIDTH - borderWidth - 1,
        borderRightWidth: ARROW_HALF_WIDTH - borderWidth - 1,
        borderBottomWidth: ARROW_HEIGHT - borderWidth,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: backgroundColor,
      };

  const tooltipContent = (
    <View
      onLayout={handleBubbleLayout}
      style={[
        styles.bubble,
        {
          maxWidth: responsiveMaxWidth,
          minWidth,
          backgroundColor,
          borderColor,
          borderWidth,
          borderRadius,
        },
        contentStyle,
      ]}
    >
      {typeof content === "string" ? (
        <Text variant="caption14Regular" style={styles.text}>
          {content}
        </Text>
      ) : (
        content
      )}
      <View
        pointerEvents="none"
        style={[styles.arrow, { left: arrowX }, outerArrowStyle]}
      />
      <View
        pointerEvents="none"
        style={[styles.arrow, { left: arrowX }, innerArrowStyle]}
      />
    </View>
  );

  return (
    <NativeTooltip
      isVisible={visible}
      onClose={() => closeRegisteredTooltip(tooltipId)}
      placement={resolvedPlacement}
      modalComponent={SharedTooltipModal}
      backgroundColor="transparent"
      disableShadow
      showChildInTooltip={false}
      closeOnBackgroundInteraction
      closeOnContentInteraction
      arrowSize={{ width: ARROW_WIDTH, height: ARROW_HEIGHT }}
      childContentSpacing={CHILD_SPACING}
      displayInsets={{
        top: screenInset,
        right: screenInset,
        bottom: screenInset,
        left: screenInset,
      }}
      contentStyle={styles.contentWrapper}
      content={tooltipContent}
    >
      <View
        ref={anchorRef}
        collapsable={false}
        onLayout={() => measureAnchor()}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          disabled={disabled}
          onPress={handlePress}
        >
          {children}
        </Pressable>
      </View>
    </NativeTooltip>
  );
};

export default memo(Tooltip);
