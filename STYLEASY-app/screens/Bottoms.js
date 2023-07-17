import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, Alert } from "react-native";
import { collection, addDoc, query, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import { auth, database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

const Bottoms = () => {
  const navigation = useNavigation();
  const [bottomsImages, setBottomsImages] = useState([]);
  const { width, height } = Dimensions.get("window");
  const textSize = Math.round(width / 20); // Adjust the division factor as needed

  useEffect(() => {
    const fetchBottomsImages = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userImagesCollectionRef = collection(database, "users", currentUser.uid, "bottoms");
          const userImagesSnapshot = await getDocs(userImagesCollectionRef);
          const bottomsImagesData = [];
          userImagesSnapshot.forEach((doc) => {
            bottomsImagesData.push({ id: doc.id, url: doc.data().url });
          });
          setBottomsImages(bottomsImagesData);
        }
      } catch (error) {
        console.log("Error fetching Bottoms images:", error);
      }
    };

    fetchBottomsImages();
  }, []);

  const handleGoBack = () => {
    navigation.navigate("Collection");
  };

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the camera roll is required!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const selectedImage = result.assets[0];
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        const userImagesCollectionRef = collection(database, "users", currentUser.uid, "bottoms");
        const imageRef = await addDoc(userImagesCollectionRef, { url: selectedImage.uri });
        setBottomsImages(prevImages => [...prevImages, { id: imageRef.id, url: selectedImage.uri }]);
      }
    }
  };
  
  const handleRemoveImage = async (imageId) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userImageDocRef = doc(database, "users", currentUser.uid, "bottoms", imageId);
        await deleteDoc(userImageDocRef);
        setBottomsImages(prevImages => prevImages.filter(image => image.id !== imageId));
      }
    } catch (error) {
      console.log("Error removing image:", error);
    }
  };

  // Calculate the image size and gap between images based on the screen size
  const imageSize = (width - 40) / 3; // Display three images per row
  const gapSize = 10;
  const firstRowGap = 100;

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { fontSize: textSize }]}>BOTTOMS COLLECTION</Text>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {bottomsImages.length > 0 ? (
          <FlatList
            data={bottomsImages}
            keyExtractor={(item) => item.id}
            numColumns={3}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.imageWrapper,
                  {
                    width: imageSize,
                    height: imageSize,
                    marginTop: index < 3 ? firstRowGap : gapSize,
                    marginLeft: index % 3 !== 0 ? gapSize : 0,
                  },
                ]}
                onPress={() => handleRemoveImage(item.id)}
              >
                <Image
                  source={{ uri: item.url }}
                  style={styles.image}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => Alert.alert(
                    "Remove Image",
                    "Are you sure you want to remove this image?",
                    [
                      { text: "Cancel", style: "cancel" },
                      { text: "Remove", style: "destructive", onPress: () => handleRemoveImage(item.id) },
                    ]
                  )}
                >
                  <Feather name="trash-2" size={18} color="white" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.noImagesContainer}>
            <Text style={styles.noImagesText}>No Bottoms images available.</Text>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.uploadButton} onPress={handleSelectImage}>
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  headerText: {
    fontWeight: "bold",
    marginTop: 70,
    marginBottom: -50,
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 70,
    left: 10,
    padding: 10,
  },
  uploadButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: "#7b68ee",
    borderRadius: 10,
  },
  uploadButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    padding: 5,
  },
  noImagesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noImagesText: {
    fontSize: 18,
  },
});

export default Bottoms;
