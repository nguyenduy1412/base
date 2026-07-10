import { ROUTE_GROUPS } from "@/constants/routes";
import { auth$ } from "@/store/auth";
import { useSelector } from "@legendapp/state/react";
import { Redirect } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";

const TabsLayout = () => {
  const user = useSelector(auth$.user);

  if (!user) {
    return <Redirect href={ROUTE_GROUPS.AUTH} />;
  }

  return (
    <NativeTabs
      tintColor="#4a7c59"
      iconColor={{ default: "#6b8572", selected: "#4a7c59" }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "house", selected: "house.fill" }}
          md={{ default: "home", selected: "home" }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="chat">
        <NativeTabs.Trigger.Label>Chat</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "message", selected: "message.fill" }}
          md={{ default: "chat", selected: "chat" }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="map">
        <NativeTabs.Trigger.Label>Map</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "map", selected: "map.fill" }}
          md={{ default: "map", selected: "map" }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="setting">
        <NativeTabs.Trigger.Label>Setting</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "gearshape", selected: "gearshape.fill" }}
          md={{ default: "settings", selected: "settings" }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default TabsLayout;
