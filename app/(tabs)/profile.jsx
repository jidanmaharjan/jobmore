import { router } from "expo-router";
import { Bell, LayoutGrid, LogOut } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ProgressBar, Spacings, Switch } from "react-native-ui-lib";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import { signOut } from "../../lib/appwrite";

const Insight = (props) => {
  const progress = (props.amount / parseInt(props.total)) * 100;

  return (
    <View className="bg-black-100 border-2 border-black-200 text-gray-100 p-4 rounded-md gap-2">
      <Text className="font-psemibold text-gray-100">{props.title}</Text>
      <Text className="font-psemibold text-white ">
        {props.amount} / {props.total}
      </Text>
      <ProgressBar
        progress={progress > 100 ? 100 : progress}
        height={10}
        progressColor={progress > 100 ? "#ef4444" : "#FF9C01"}
      />
    </View>
  );
};

const Profile = () => {
  const { setIsLoggedIn, setUser, user } = useGlobalContext();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const signOutHandler = () => {
    signOut();
    setIsLoggedIn(false);
    setUser(null);
    router.replace("/sign-in");
  };
  const items = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Push Notifications",
      icon: <Bell style={{ color: "#fff" }} />,
      rightSection: (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          onColor={"#FF9C01"}
        />
      ),
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "App Icon",
      icon: <LayoutGrid style={{ color: "#fff" }} />,
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Logout",
      icon: <LogOut style={{ color: "#f87171" }} />,
      danger: true,
      action: signOutHandler,
    },
  ];
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="p-4 bg-primary h-full">
        <View className="justify-center items-center mt-4">
          <Image
            // source={require("../../assets/images/profile.png")}
            source={user?.avatar}
            style={{ width: 100, height: 100, borderRadius: 50 }}
            alt="Profile Picture"
          />
          <Text className="text-white space-y-4 text-lg font-psemibold mt-4">
            {user?.username}
          </Text>
          <Text className="text-gray-100 space-y-4 text-sm mb-8">
            {user?.email}
          </Text>
          <CustomButton
            title="Edit Profile"
            handlePress={() => router.push("/edit-profile")}
            containerStyles={"px-8 !bg-primary border border-white"}
            textStyles={"text-white"}
          />
          <View className="mt-8 flex-row items-center gap-4">
            <Insight title="Carbs" amount="100" total="200g" />
            <Insight title="Protein" amount="202" total="143g" />
            <Insight title="Fat" amount="169" total="359g" />
          </View>
        </View>
      </ScrollView>
      <View className="p-4 text-white">
        <FlatList
          className="w-full border-2 rounded-md border-black-200"
          data={items}
          maxItemWidth={140}
          numColumns={1}
          itemSpacing={Spacings.s3}
          listPadding={Spacings.s5}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={item?.action}
              className="flex flex-row justify-between p-4"
            >
              <View
                style={{ color: item?.danger ? "#f87171" : "#fff" }}
                className={`flex flex-row items-center gap-4 text-white`}
              >
                {item.icon}
                <Text
                  style={{ color: item?.danger ? "#f87171" : "#fff" }}
                  className={`text-lg font-psemibold text-white `}
                >
                  {item.title}
                </Text>
              </View>
              {item?.rightSection}
            </TouchableOpacity>
          )}
        />
        {/* <CustomButton
          title="Sign Out"
          handlePress={signOutHandler}
          containerStyles={"w-full mt-7"}
          textStyles={"text-white"}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

