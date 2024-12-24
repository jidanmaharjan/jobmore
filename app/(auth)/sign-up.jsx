import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";

import { Link, router } from "expo-router";
import { useState } from "react";
import CustomFormField from "../../components/CustomFormField";
import { images } from "../../constants";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [focused, setFocused] = useState(false);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className={`items-center justify-center w-full px-6 min-h-[85vh] transition-all duration-100 ${
            focused ? "-mt-60" : ""
          }`}
        >
          <Image
            source={images?.logo}
            className="w-[115px] h-[35px]"
            style={{ width: 115, height: 35 }}
            resizeMode="contain"
          />
          <Text className="text-white font-psemibold text-2xl mt-10">
            Sign Up for your account
          </Text>
          <CustomFormField
            title="Email"
            value={form?.email}
            placeholder="Enter your email"
            handleTextchange={(e) => setForm((prev) => ({ ...prev, email: e }))}
            otherStyles="mt-7"
            keyboardType="email-address"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <CustomFormField
            secure
            title="Password"
            value={form?.password}
            placeholder="Enter your password"
            handleTextchange={(e) =>
              setForm((prev) => ({ ...prev, password: e }))
            }
            otherStyles="mt-7"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <CustomFormField
            secure
            title="Confirm Password"
            value={form?.confirmPassword}
            placeholder="Confirm your password"
            handleTextchange={(e) =>
              setForm((prev) => ({ ...prev, confirmPassword: e }))
            }
            otherStyles="mt-7"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <CustomButton
            title="Sign Up"
            handlePress={() => router.push("/home")}
            isLoading={false}
            containerStyles={"w-full mt-7"}
            textStyles={"text-white"}
          />
          <View className="flex flex-row justify-center items-center pt-5">
            <Text className="text-gray-100 text-center font-pregular text-sm">
              Already have an account ?{" "}
            </Text>
            <Link
              href="/sign-in"
              className="text-secondary font-psemibold cursor-pointer"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignUp;
