import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Button,
  Platform,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseConfig } from '../config/firebase';

const Collection = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [uploadedImageURLs, setUploadedImageURLs] = useState([]);

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: width * 0.03, // Adjust the margin based on the screen width
          }}
          onPress={onSignOut}
        >
          <AntDesign name="logout" size={24} color={colors.black} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, width]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access the camera roll is required!');
        }
      }
    })();
  }, []);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const selectedImages = result.selected.map((asset) => asset.uri);
      setUploadedImageURLs([]); // Reset uploaded image URLs
      setSelectedCollection(null); // Reset selected collection
      handleSaveToCategory(result.selected);
    }
  };

  const handleSaveToCategory = (selectedImages) => {
    Alert.alert(
      'Save to Category',
      'Choose a category to save the photo',
      [
        { text: 'Current', onPress: () => saveToCategory('Current', selectedImages) },
        { text: 'Newly', onPress: () => saveToCategory('Newly', selectedImages) },
        { text: 'Daily', onPress: () => saveToCategory('Daily', selectedImages) },
      ],
      { cancelable: true }
    );
  };

  const saveToCategory = async (category, selectedImages) => {
    setSelectedCollection(category); // Set the selected collection

    console.log(`Saving ${selectedImages.length} images to ${category} category`);

    const storage = getStorage();
    const categoryFolderRef = ref(storage, category); // Reference to the selected category folder in storage

    try {
      // Save each selected image to the selected category folder and Firestore
      for (const imageUri of selectedImages) {
        if (typeof imageUri !== 'string') {
          console.log('Invalid image URI:', imageUri);
          continue;
        }

        const imageFileName = imageUri.substring(imageUri.lastIndexOf('/') + 1); // Get the file name from the URI
        const imageRef = ref(categoryFolderRef, imageFileName);

        // Upload the image to the storage
        const uploadTask = uploadBytes(imageRef, imageUri);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(uploadTask.ref);

        // Save the photo URL to Firestore
        await savePhotoToFirestore(downloadURL);

        // Update the uploaded image URLs state
        setUploadedImageURLs((prevURLs) => [...prevURLs, downloadURL]);

        console.log('Download URL:', downloadURL);
      }

      console.log(`Saved ${selectedImages.length} images to ${category} category`);
    } catch (error) {
      console.log('Error saving images:', error);
    }
  };

  const savePhotoToFirestore = async (photoUrl) => {
    try {
      const db = getFirestore();
      const photosCollectionRef = collection(db, 'Wardrobe');
      await addDoc(photosCollectionRef, { url: photoUrl });
      console.log('Photo saved to Firestore');
    } catch (error) {
      console.log('Error saving photo to Firestore:', error);
    }
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const buttonSize = width * 0.4;
  const textSize = width * 0.1;
  const marginTopPercentage = 0.08;
  const marginTop = height * marginTopPercentage;
  const textFontSize = windowWidth * 0.04;
  const textHeight = windowHeight * 0.2;

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop }}>
          <Text style={[styles.collectionText, { fontSize: textSize }]}>
            COLLECTION
          </Text>
        </View>

        <View style={styles.gap} />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.CurrentFav, { width: buttonSize, height: buttonSize }]} onPress={() => navigation.navigate("Current")}>
            <ImageBackground source={require('../assets/current.png')} style={styles.buttonImage}></ImageBackground>
            <Text style={[styles.buttonText, { fontSize: textFontSize, marginTop: textHeight }]}>CURRENT FAV</Text>
          </TouchableOpacity>

          <View style={styles.buttonGap} />

          <TouchableOpacity style={[styles.NewlySaved, { width: buttonSize, height: buttonSize }]} onPress={() => navigation.navigate("Newly")}>
            <ImageBackground source={require('../assets/newly.png')} style={styles.buttonImage}></ImageBackground>
            <Text style={[styles.buttonText, { fontSize: textFontSize, marginTop: textHeight }]}>NEWLY SAVED</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.Daily, { width: width * 0.82, height: buttonSize }]} onPress={() => navigation.navigate("Daily")}>
          <ImageBackground source={require('../assets/daily.png')} style={styles.buttonImage}></ImageBackground>
          <Text style={[styles.buttonText, { fontSize: textFontSize, marginTop: textHeight }]}>DAILY OUTFIT</Text>
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Pick images from camera roll" onPress={pickImages} />
          {selectedCollection && (
            <Text style={styles.selectedCollectionText}>Selected Collection: {selectedCollection}</Text>
          )}
          {uploadedImageURLs.length > 0 && (
            <View style={styles.uploadedImagesContainer}>
              <Text style={styles.uploadedImagesTitle}>Uploaded Images:</Text>
              {uploadedImageURLs.map((imageUrl, index) => (
                <Image key={index} source={{ uri: imageUrl }} style={styles.uploadedImage} />
              ))}
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    padding: 20,
  },
  collectionText: {
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 0,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  NewlySaved: {
    marginRight: 10,
  },
  CurrentFav: {},
  Daily: {},
  buttonImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
  buttonGap: {
    width: 10,
  },
  gap: {
    height: 80,
  },
  buttonText: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
  selectedCollectionText: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  uploadedImagesContainer: {
    marginTop: 20,
  },
  uploadedImagesTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  uploadedImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default Collection;
