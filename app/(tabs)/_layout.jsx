import { Tabs } from "expo-router";
import { View, Text } from "react-native";
const TabsLayout = () => {
  return (
    <>
      <Tabs >
        <Tabs.Screen name="home" options={{headerShown: false}} />
        </Tabs>
    </>
  );
};
export default TabsLayout;
