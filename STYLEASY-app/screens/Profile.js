import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Dimensions } from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const navigation = useNavigation();

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("Loading...");
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      const userId = user.uid;
      const userDocRef = doc(database, "users", userId);

      try {
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setPassword(userData.password);
          setEmail(userData.email);
          setUsername(userData.username);
          setName(userData.name);
          setProfilePicture(userData.profilePicture);
        } else {
          console.log("User document not found.");
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    navigation.navigate("UpdateProfile", {
      onProfileUpdate: (updatedName, updatedUsername) => {
        setName(updatedName);
        setUsername(updatedUsername);
        console.log('Profile updated:', updatedName, updatedUsername);
      },
    });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => console.log("Logout successful"))
      .catch((error) => console.log("Error logging out:", error));
  };

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  const handleAccessSavedItems = () => {
    navigation.navigate("Collection");
  };

  const handleSelectProfilePicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  };

  const logoSize = Math.min(windowWidth * 0.3, windowHeight * 0.3);
  const buttonWidth = windowWidth * 0.8;
  const buttonTextSize = windowWidth * 0.04;

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleSelectProfilePicture}>
          <View style={[styles.profileImage, { width: logoSize, height: logoSize }]}>
            {profilePicture ? (
              <Image source={{ uri: profilePicture }} style={[styles.profileImage, { width: logoSize, height: logoSize }]} />
            ) : (
              <>
                <Image source={require("../assets/profilepic.png")} style={[styles.profileImage, { width: logoSize, height: logoSize }]} />
                <View style={styles.cameraIconContainer}>
                  <FontAwesome name="camera" size={20} color="#ffffff" />
                </View>
              </>
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>Username: {username}</Text>
      </View>
      <TouchableOpacity onPress={handleUpdateProfile} style={[styles.button, { width: buttonWidth }]}>
        <Text style={[styles.buttonText, { fontSize: buttonTextSize }]}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSettings} style={[styles.button, { width: buttonWidth }]}>
        <Text style={[styles.buttonText, { fontSize: buttonTextSize }]}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.logoutButton, { width: buttonWidth }]}>
        <Text style={[styles.buttonText, styles.logoutButtonText, { fontSize: buttonTextSize }]}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAccessSavedItems} style={[styles.button, { width: buttonWidth }]}>
        <Text style={[styles.buttonText, { fontSize: buttonTextSize }]}>Access Saved Items</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100,
    backgroundColor: "#e6e6fa",
    fontFamily: "Helvetica",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    borderRadius: 50,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    padding: 5,
  },
  name: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
  },
  button: {
    marginBottom: 10,
    paddingVertical: 15,
    backgroundColor: "#7b68ee",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontFamily: "Helvetica",
  },
  logoutButton: {
    backgroundColor: "#7b68ee",
  },
  logoutButtonText: {
    color: "#ffffff",
  },
});

export default Profile;



