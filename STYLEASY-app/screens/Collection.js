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
  Alert,i
} from "react-native";
import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';


const Collection = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [images, setImages] = useState([]);
  
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
  
  // Get the device screen dimensions
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const buttonSize = width * 0.4; // Adjust the button size based on the screen width
  const textSize = width * 0.1; // Adjust the text size based on the screen width
  const marginTopPercentage = 0.08; // Adjust the desired percentage for the gap above the text
  const marginTop = height * marginTopPercentage; // Calculate the margin-top based on the screen height
  const textFontSize = windowWidth * 0.04;
  const textHeight = windowHeight * 0.2;
  
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
      setImages((prevImages) => [...prevImages, ...selectedImages]);
      handleSaveToCategory(result.selected);
    }
  };
  
  const handleSaveToCategory = (selectedImages) => {
    Alert.alert(
      'Save to Category',
      'Choose a category to save the photo',
      [
        { text: 'Current', onPress: () => saveToCategory('current', selectedImages) },
        { text: 'Newly', onPress: () => saveToCategory('newly', selectedImages) },
        { text: 'Daily', onPress: () => saveToCategory('daily', selectedImages) },
      ],
      { cancelable: true }
    );
  };
  
  const saveToCategory = async (category, selectedImages) => {
    console.log(`Saving ${selectedImages.length} images to ${category} category`);
  
    const storage = getStorage();
    const newlyFolderRef = ref(storage, 'newly'); // Reference to the "newly" folder in storage
  
    try {
      // Save each selected image to the "newly" folder
      for (const imageUri of selectedImages) {
        if (typeof imageUri !== 'string') {
          console.log('Invalid image URI:', imageUri);
          continue;
        }
  
        const imageFileName = imageUri.substring(imageUri.lastIndexOf('/') + 1); // Get the file name from the URI
        const imageRef = ref(newlyFolderRef, imageFileName);
  
        // Upload the image to the storage
        await uploadString(imageRef, imageUri, 'data_url');
        
        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(imageRef);
  
        // Log the download URL or perform any other operations with it
        console.log('Download URL:', downloadURL);
      }
  
      console.log(`Saved ${selectedImages.length} images to ${category} category`);
    } catch (error) {
      console.log('Error saving images:', error);
    }
  };  
  
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
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          </View>
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
    height: 80, // Adjust the height as needed
  },
  buttonText: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 15, // Adjust the font size as needed
  },
});

export default Collection;
