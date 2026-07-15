import {
  CREATE_TAB,
  HOME_TAB,
  PROFILE_TAB,
  SEARCH_TAB,
  TROPHY_TAB,
} from "@/assets/images";
import { NativeTabs } from "expo-router/build/native-tabs";
import { TAB_ACTIVE_COLOR, TAB_INACTIVE_COLOR } from "./constants/colors";

const iconColor = { default: TAB_INACTIVE_COLOR, selected: TAB_ACTIVE_COLOR };

const NativeTab = () => {
  return (
    <NativeTabs tintColor={TAB_ACTIVE_COLOR} iconColor={iconColor}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon src={HOME_TAB} renderingMode="template" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon src={SEARCH_TAB} renderingMode="template" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="create">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon src={CREATE_TAB} renderingMode="original" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="trophy">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon src={TROPHY_TAB} renderingMode="template" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon src={PROFILE_TAB} renderingMode="template" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default NativeTab;
