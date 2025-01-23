import { Tabs } from "expo-router";
import {
  CirclePlus,
  CircleUserRound,
  FolderClock,
  House,
  ListOrdered,
} from "lucide-react-native";
import { Text, View } from "react-native";

const TabIcon = ({ icon, color, name, focused, primary = false }) => {
  return (
    <View className="items-center justify-center gap-2 mt-6">
      <View
        style={{
          color: color,
          borderRadius: primary && "50%",
          padding: primary && ".5rem",
          backgroundColor: primary && "#161622",
        }}
      >
        {icon}
      </View>
      <Text
        className={`text-xs ${
          focused ? "font-psemibold " : "font-pregular"
        } text-xs w-16 text-center`}
        style={{ color: color, wordBreak: "normal" }}
      >
        {name}
      </Text>
    </View>
  );
};
const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 86,
            paddingTop: 8,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: "home",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={<House color={color} />}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="leaderboard"
          options={{
            headerShown: false,
            title: "leaderboard",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={<ListOrdered color={color} />}
                color={color}
                name="Board"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="new"
          options={{
            headerShown: false,
            title: "new",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={<CirclePlus color={color} size={32} />}
                color={color}
                name=""
                focused={focused}
                primary
              />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            headerShown: false,
            title: "history",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={<FolderClock color={color} />}
                color={color}
                name="History"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={<CircleUserRound color={color} />}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};
export default TabsLayout;
