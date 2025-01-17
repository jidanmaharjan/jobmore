import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import {
  Circle,
  Images,
  RotateCw,
  Save,
  Scan,
  SwitchCamera,
} from "lucide-react-native";
import CustomButton from "../../components/CustomButton";

const NewTrack = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [calories, setCalories] = useState(null);
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState("back");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Request camera permission
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(true);
    })();
  }, []);

  const processImage = async (imageUri) => {
    setLoading(true);
    try {
      // Send the image to your AI service (AI endpoint here)
      const response = await fetch("https://your-ai-service-endpoint", {
        method: "POST",
        body: JSON.stringify({ imageUri }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data && data.calories) {
        setCalories(data.calories);
        // saveToAppwrite(data.calories, imageUri);
      } else {
        Alert.alert("Error", "Could not fetch calorie data");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      Alert.alert("Error", "There was an issue with processing the image.");
    } finally {
      setLoading(false);
    }
  };

  const capturePhoto = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData.uri);
      processImage(photoData.uri);
    }
  };

  const toggleCameraFacing = () => {
    if (facing === "back") {
      setFacing("front");
    } else {
      setFacing("back");
    }
  };

  const saveToAppwrite = async (calories, imageUri) => {
    try {
      const document = await database.createDocument("your-collection-id", {
        calorieData: calories,
        imageUri: imageUri,
      });
      Alert.alert("Success", "Data saved to Appwrite");
    } catch (error) {
      console.error("Error saving data to Appwrite:", error);
      Alert.alert("Error", "There was an issue saving the data.");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!photo ? (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View className="text-gray-100 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
            <Scan
              style={{
                color: "rgba(255,255,255,0.5)",
                width: "8rem",
                height: "8rem",
              }}
              size={360}
            />
          </View>
          <View className="flex justify-between items-center flex-row w-full p-8">
            <TouchableOpacity
              className="bg-black/40 rounded-full p-2 text-white/90"
              style={styles.button}
              // onPress={toggleCameraFacing}
            >
              <Images style={{ color: "white" }} size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-100 rounded-full p-1"
              style={styles.button}
              onPress={capturePhoto}
            >
              <Circle style={{ color: "rgba(0,0,0,0.6)" }} size={64} />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-black/40 rounded-full p-2 text-white/90"
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <SwitchCamera style={{ color: "white" }} size={24} />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View className="items-center justify-center w-full px-4 gap-8">
          <Image className="aspect-[9/16] w-60" source={{ uri: photo }} />
          {loading ? (
            <ActivityIndicator size={"large"} color={"orange"} />
          ) : (
            <Text>Calories: </Text>
          )}
          <View className="w-full justify-center items-center flex flex-row gap-4">
            <CustomButton
              title={
                <>
                  <Save /> Save
                </>
              }
              handlePress={() => router.push("/sign-in")}
              isLoading={false}
              containerStyles={"flex-grow"}
              textStyles={"text-white flex items-center"}
            />
            <CustomButton
              title={<RotateCw />}
              handlePress={() => setPhoto(null)}
              isLoading={false}
              containerStyles={
                "bg-transparent border border-secondary aspect-square h-[52px]"
              }
              textStyles={"text-secondary"}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default NewTrack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  photoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
