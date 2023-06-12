import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { doc, getDoc, setDoc, collection, updateDoc } from "firebase/firestore";

const ProfilePage = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Add this line

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      const userId = user.uid;
      const userDocRef = doc(database, "users", userId);

      try {
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setPhone(userData.phone);
          setEmail(userData.email);
          setUsername(user.displayName);
          setName(userData.name); // Set the name from the user document
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
    // Update user profile in Firebase
    navigation.navigate("UpdateProfile");
    const user = auth.currentUser;
    const userId = user.uid;
    const userDocRef = doc(database, "users", userId);
  
    try {
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        await updateDoc(userDocRef, {
          name,
          phone,
          email,
        });
  
        // Update the user display name
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
  
        console.log("Profile updated successfully!");
  
        // Update the state variables in the Profile page
        setName(name);
        setPhone(phone);
        setEmail(email);
  
        // Navigate back to the Profile page
        navigation.goBack();
      } else {
        console.log("User document not found.");
      }
    } catch (error) {
      console.log("Error updating profile:", error);
    }
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
        <Text style={styles.name}> {name}</Text>
        <Text style={styles.username}>Username: {auth.currentUser.displayName}</Text>
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
    marginTop: 10,
    fontSize: 20,
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

export default ProfilePage;
