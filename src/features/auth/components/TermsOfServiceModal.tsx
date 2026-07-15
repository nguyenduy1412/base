import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { t } from "@lingui/core/macro";
import { memo } from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";

const TERMS_CONTENT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

type TermsOfServiceModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

const TermsOfServiceModal = ({
  isVisible,
  onClose,
}: TermsOfServiceModalProps) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center px-5">
        <Pressable
          accessibilityRole="button"
          className="absolute inset-0 bg-black/60"
          onPress={onClose}
        />

        <View className="rounded-[24px] pb-10 bg-background shadow-md overflow-hidden max-h-[80%]">
          <View className="px-6 pt-15 pb-6">
            <Text variant="heading24Semibold" >{t`Terms of Service`}</Text>
            <Text variant="caption12Regular" className="text-neutral-04 mt-1">
              {t`Last Updated: 08/07/2026`}
            </Text>
          </View>

          <View className="relative max-h-[75%] overflow-hidden">
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerClassName="px-6 pb-10"
            >
              <Text
                variant="caption15Regular"
                className="text-neutral-02 leading-[22px]"
              >
                {TERMS_CONTENT}
              </Text>
            </ScrollView>

            <View
              pointerEvents="none"
              className="absolute bottom-0 left-0 right-0 h-20 bg-linear-180 from-background/0 to-background"
            />
          </View>

          <View className="flex-row justify-end items-center gap-5 px-6">
            <Button
              title={t`Decline`}
              color="background"
              isShadow={false}
              variant="caption14Semibold"
              className="rounded-[12px] w-[45%]"
              onPress={onClose}
              textClassName="text-primary"
            />

            <Button
              title={t`Accept`}
              color="primary"
              variant="caption14Semibold"
              className="rounded-[12px] w-[45%]"
              onPress={onClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(TermsOfServiceModal);
