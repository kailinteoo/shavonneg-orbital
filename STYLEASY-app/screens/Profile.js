import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      const userId = user.uid;
      const userDocRef = doc(db, "users", userId);

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

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/newly.png")}
          style={styles.profileImage}
        />
        <Text style={styles.name}> Username: {auth.currentUser.displayName}</Text>
      </View>
      <TouchableOpacity onPress={handleUpdateProfile} style={styles.button}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSettings} style={styles.button}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.logoutButton]}>
        <Text style={[styles.buttonText, styles.logoutButtonText]}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAccessSavedItems} style={styles.button}>
        <Text style={styles.buttonText}>Access Saved Items</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
    backgroundColor: "#e6e6fa", // Light mode background
    fontFamily: "Helvetica", // Sans-serif font
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    marginTop: 1,
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000", // Light mode text color
  },
  username: {
    marginTop: 5,
    color: "#000000", // Light mode text color
  },
  button: {
    width: 250,
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
    fontSize: 16,
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
