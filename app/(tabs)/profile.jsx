import {
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

const Insight = (props) => {
  return (
    <View style={styles.insight}>
      <Text style={styles.title}>{props.title}</Text>
      <Text>
        {props.amount} / {props.total}
      </Text>
    </View>
  );
};

const profile = () => {
  const { setIsLoggedIn, setUser } = useGlobalContext();
  const signOutHandler = () => {
    signOut();
    setIsLoggedIn(false);
    setUser(null);
    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="p-4 bg-primary h-full">
        <View className="justify-center items-center">
          <Text className="text-blue-400 capitalize" style={styles.heading}>
            profile
          </Text>
          <Image
            source={require("../../assets/images/profile.png")}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text>Jidan</Text>
          <View style={styles.insightContainer}>
            <Insight title="Carbs" amount="100" total="200g" />
            <Insight title="Protein" amount="202" total="143" />
            <Insight title="Fat" amount="169" total="359g" />
          </View>
        </View>
      </ScrollView>
      <View className="p-4">
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

export default profile;

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
