import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function UpdateProfile({ navigation }) {
  const { colors } = useTheme();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDocRef = doc(database, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUsername(userData.Username);
          setName(userData.Name);
          setPassword(userData.password);
          setEmail(userData.email);
        } else {
          console.log('User document not found.');
        }
      } catch (error) {
        console.log('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      // Verify email before updating profile
      const user = auth.currentUser;
      const credential = auth.EmailAuthProvider.credential(user.email, email);
      await user.reauthenticateWithCredential(credential);
  
      const userDocRef = doc(database, 'users', userId);
      await updateDoc(userDocRef, {
        Username: username,
        Name: name,
        password: password,
        email: email,
      });
  
      console.log('Profile updated successfully!');
      navigation.navigate('Profile'); // Navigate back to the Profile page
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Change Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your new Username"
            placeholderTextColor={colors.placeholder}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Change Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your new name"
            placeholderTextColor={colors.placeholder}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Change Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your new password"
            placeholderTextColor={colors.placeholder}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm by Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={colors.placeholder}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: windowWidth * 0.04,
  },
  backButton: {
    marginTop: windowHeight * 0.02,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#9370db',
    fontSize: windowWidth * 0.04,
  },
  form: {
    marginTop: windowHeight * 0.04,
  },
  inputContainer: {
    marginBottom: windowHeight * 0.02,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#e6e6fa',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#9370db',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
