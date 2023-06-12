import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { auth, database } from '../config/firebase';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function UpdateProfile({ navigation }) {
  const { colors } = useTheme();
  const [Username, setUsername] = useState('');
  const [Name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdateProfile = () => {
    const user = auth.currentUser;
    const userId = user.uid;
    const userRef = database.ref('users/' + userId);

    userRef.update({
      Usernameame,
      Name,
      password,
      email,
    })
      .then(() => {
        console.log('Profile updated successfully!');
        navigation.goBack();
      })
      .catch(error => {
        console.log('Error updating profile:', error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Home</Text>
      </TouchableOpacity>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={Username}
            onChangeText={setUsername}
            placeholder="Enter your new Username"
            placeholderTextColor={colors.placeholder}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={Name}
            onChangeText={setName}
            placeholder="Enter your new name"
            placeholderTextColor={colors.placeholder}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your new password"
            placeholderTextColor={colors.placeholder}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
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
