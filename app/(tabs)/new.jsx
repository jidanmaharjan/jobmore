import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import { Circle, Images, Scan, SwitchCamera } from "lucide-react-native";

const NewTrack = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [calories, setCalories] = useState(null);
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState("back");

  useEffect(() => {
    // Request camera permission
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(true);
    })();
  }, []);

  const processImage = async (imageUri) => {
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
        saveToAppwrite(data.calories, imageUri);
      } else {
        Alert.alert("Error", "Could not fetch calorie data");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      Alert.alert("Error", "There was an issue with processing the image.");
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
          <View className="items-center justify-center absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
            <Scan className="w-80 h-80" />
          </View>
          <View className="flex justify-between items-center flex-row w-full p-8">
            <TouchableOpacity
              className="bg-black/40 rounded-full p-2 text-white/90"
              style={styles.button}
              // onPress={toggleCameraFacing}
            >
              <Images className="w-8 h-8" />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-100 rounded-full p-1"
              style={styles.button}
              onPress={capturePhoto}
            >
              <Circle className="w-16 h-16" />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-black/40 rounded-full p-2 text-white/90"
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <SwitchCamera className="w-8 h-8" />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={styles.photoContainer}>
          <Image source={{ uri: photo }} style={styles.imagePreview} />
          <Text>Calories: {calories ? calories : "Fetching calories..."}</Text>
          <Button title="Capture Again" onPress={() => setPhoto(null)} />
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
