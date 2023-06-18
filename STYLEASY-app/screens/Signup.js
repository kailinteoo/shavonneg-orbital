import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, Animated } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from '../config/firebase';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { database } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const animatedValue = new Animated.Value(0);

  // Register the listener for onAnimatedValueUpdate
  animatedValue.addListener((value) => {
    console.log('Animated value updated:', value);
  });

  // Dispatch the onAnimatedValueUpdate event
  animatedValue.setValue(1);

  const handleProfilePictureSelection = (imageData) => {
    // Process the image data, if necessary
    // Set the profile picture state variable

    // For example, you can convert the data to a Blob object
    const processedData = new Blob([imageData], { type: 'image/jpeg' });
    setProfilePicture(imageData);
  };

  const registerUser = async (username, profilePicture) => {
    try {
      // Upload profile picture to Firebase Storage and get the download URL
      const profilePictureRef = storage.ref().child(`profilePictures/${profilePicture.name}`);
      await profilePictureRef.put(profilePicture);
      const profilePictureUrl = await profilePictureRef.getDownloadURL();
  
      // Create user document in the "users" collection
      const userRef = collection(database, 'users');
      await addDoc(userRef, {
        username,
        profilePicture: profilePictureUrl,
        name, 
        password,
        email,
      });
  
      // User registration successful
      console.log('User registered successfully!');
    } catch (error) {
      // Handle any errors during registration
      console.error('Error registering user:', error);
    }
  };

  const handleSignUp = () => {
    if (email !== "" && username !== "" && password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
  
            updateProfile(user, {
              displayName: name,
            })
              .then(() => {
                const name = user.displayName;
                const userDocRef = doc(database, "users", user.uid);
                registerUser(username, profilePicture);
                console.log("Sign up success");
                navigation.navigate("Profile");
  
                setDoc(userDocRef, {
                  name: name,
                  username: username,
                  password: password,
                  email: email,
                })
                  .then(() => {
                    // Call registerUser function here
                    registerUser(username, profilePicture);
                    console.log("Sign up success");
                    navigation.navigate("Profile");
                  })
                  .catch((error) => {
                    console.log("Error creating user document:", error);
                    Alert.alert("Signup error", error.message);
                  });
              })
              .catch((error) => {
                console.log("Error updating profile:", error);
                Alert.alert("Signup error", error.message);
              });
          })
          .catch((error) => {
            console.log("Error during sign up:", error);
            Alert.alert("Signup error", error.message);
          });
      } else {
        Alert.alert("Password mismatch", "The passwords entered do not match.");
      }
    } else {
      Alert.alert("Incomplete form", "Please fill in all fields.");
    }
  };
  

  

  return (
    <View style={styles.container}>
      <View />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          autoCapitalize="none"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          autoCapitalize="words"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
          <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}> Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{color: '#f57c00', fontWeight: '600', fontSize: 14}}> Log in</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#7b68ee",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#e6e6fa",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#7b68ee',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});

export default Signup;