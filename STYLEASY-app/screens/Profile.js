import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { View, Image, TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("Loading..."); // Set initial value to indicate loading
  

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
        } else {
          console.log("User document not found.");
        }
        setUsername(userData.username); // Set the username outside the if block
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

  const logoSize = Math.min(windowWidth * 0.3, windowHeight * 0.3);
  const buttonWidth = windowWidth * 0.8;
  const buttonTextSize = windowWidth * 0.04;

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/newly.png")}
          style={[styles.profileImage, { width: logoSize, height: logoSize }]}
        />
        <Text style={styles.name}> Username: {username}</Text>
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
    backgroundColor: "#e6e6fa", // Light mode background
    fontFamily: "Helvetica", // Sans-serif font
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    borderRadius: 50,
  },
  name: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000", // Light mode text color
  },
  button: {
    marginBottom: 10,
    paddingVertical: 15,
    backgroundColor: "#7b68ee", // Purple button color
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
    color: "#ffffff", // White button text color
    fontWeight: "bold",
    fontFamily: "Helvetica", // Sans-serif font
  },
  logoutButton: {
    backgroundColor: "#7b68ee", // Purple button color
  },
  logoutButtonText: {
    color: "#ffffff", // White button text color
  },
});

export default Profile;
