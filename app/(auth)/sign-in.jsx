import { Alert, Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";

import { Link, router } from "expo-router";
import { useState } from "react";
import CustomFormField from "../../components/CustomFormField";
import { images } from "../../constants";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [focused, setFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
      if(!form.email || !form.password) {
        Alert.alert("Error", "Please fill all fields")
      }
      setIsSubmitting(true)
      try {
        const result = await signIn(form.email, form.password)
        router.replace("/home")
      } catch (error) {
        Alert.alert("Error", error.message)
      } finally {
        setIsSubmitting(false)
      }
    }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className={`items-center justify-center w-full px-6 min-h-[85vh] transition-all duration-100 ${
            focused ? "-mt-40" : ""
          }`}
        >
          <Image
            source={images?.logo}
            className="w-[115px] h-[35px]"
            style={{ width: 115, height: 35 }}
            resizeMode="contain"
          />
          <Text className="text-white font-psemibold text-2xl mt-10">
            Sign In to your account
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
          <CustomButton
            title="Sign In"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles={"w-full mt-7"}
            textStyles={"text-white"}
          />
          <View className="flex flex-row justify-center items-center pt-5">
            <Text className="text-gray-100 text-center font-pregular text-sm">
              Don't have an account ?{" "}
            </Text>
            <Link
              href="/sign-up"
              className="text-secondary font-psemibold cursor-pointer"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignIn;
