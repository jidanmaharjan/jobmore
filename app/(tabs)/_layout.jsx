import { Tabs } from "expo-router";
import { View, Text } from "react-native";
const TabsLayout = () => {
  return (
    <>
      <Tabs >
        <Tabs.Screen name="home" />
        </Tabs>
    </>
  );
};
export default TabsLayout;
