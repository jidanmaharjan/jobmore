import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import CustomButton from "../../components/CustomButton";

import { Link, Redirect, router } from "expo-router";
import { useState } from "react";
import CustomFormField from "../../components/CustomFormField";
import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { loading, isLoggedIn } = useGlobalContext();

  if (!loading && isLoggedIn) return <Redirect href="/home" />;
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focused, setFocused] = useState(false);

  const submit = async () => {
    if (
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.username
    ) {
      Alert.alert("Error", "Please fill all fields");
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
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
            title="Username"
            value={form?.username}
            placeholder="Enter your username"
            handleTextchange={(e) =>
              setForm((prev) => ({ ...prev, username: e }))
            }
            otherStyles="mt-7"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
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
            handlePress={submit}
            isLoading={isSubmitting}
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
