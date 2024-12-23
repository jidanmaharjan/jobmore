import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import CustomButton from "../../components/CustomButton";

import { images } from "../../constants";
import CustomFormField from "../../components/CustomFormField";
import { useState } from "react";
import { router } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="items-center justify-center w-full px-6 min-h-[85vh]">
          <Image source={images.logo} className="w-[115px] h-[35px]" style={{ width: 115, height: 35 }} />
          <Text className="text-white font-psemibold text-2xl mt-10">
            Sign In to your account
          </Text>
          <CustomFormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleTextchange={(e) => setForm((prev) => ({ ...prev, email: e }))}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <CustomFormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleTextchange={(e) =>
              setForm((prev) => ({ ...prev, password: e }))
            }
            otherStyles="mt-7"
            keyboardType="password"
          />
          <CustomButton
            title="Sign In"
            handlePress={() => router.push("/home")}
            isLoading={false}
            containerStyles={"w-full mt-7"}
            textStyles={"text-white"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignIn;
