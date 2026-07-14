import { Tabs } from "expo-router";
import CustomTabBar from "./CustomTabBar";

const CustomTab = () => {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="create" />
      <Tabs.Screen name="trophy" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default CustomTab;
