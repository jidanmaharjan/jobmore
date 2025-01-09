import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import { signOut } from "../../lib/appwrite";
import { GridList, ProgressBar, Spacings } from "react-native-ui-lib";

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

const items = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Profile = () => {
  const { setIsLoggedIn, setUser, user } = useGlobalContext();
  const signOutHandler = () => {
    signOut();
    setIsLoggedIn(false);
    setUser(null);
    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="p-4 bg-primary h-full">
        <View className="justify-center items-center mt-4">
          <Image
            // source={require("../../assets/images/profile.png")}
            source={user?.avatar}
            style={{ width: 100, height: 100, borderRadius: 50 }}
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
        <GridList
          data={items}
          maxItemWidth={140}
          numColumns={1}
          itemSpacing={Spacings.s3}
          listPadding={Spacings.s5}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text className="text-lg font-psemibold text-white">
              {item.title}
            </Text>
          )}
        />
        <CustomButton
          title="Sign Out"
          handlePress={signOutHandler}
          containerStyles={"w-full mt-7"}
          textStyles={"text-white"}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // gradient orange to white top to bottom
    backgroundColor: "linear-gradient(to bottom, #FF8C00, #FFFFFF)",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  insightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  insight: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    gap: 5,
  },
});
