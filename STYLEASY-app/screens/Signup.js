import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../config/firebase';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (email !== "" && username !== "" && name !== "" && password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, name, {
              displayName: username,
            })
              .then(() => {
                // Create user document with name
                const userDocRef = doc(database, "users", user.uid);
                setDoc(userDocRef, {
                  name: name,
                })
                  .then(() => {
                    console.log("Sign up success");
                    navigation.navigate("Profile");
                  })
                  .catch((error) => {
                    console.log("Error creating user document:", error);
                  });
              })
              .catch((error) => {
                console.log("Error updating profile:", error);
              });
          })
          .catch((err) => Alert.alert("Signup error", err.message));
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
