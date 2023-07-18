import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        showSaveConfirmation(uri);
      } catch (error) {
        console.log('Error taking picture:', error);
      }
    }
  };

  const showSaveConfirmation = (photoUri) => {
    Alert.alert(
      'Save to Collection',
      'Which collection do you want to save this photo to?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Tops',
          onPress: () => saveToCollection('tops', photoUri),
        },
        {
          text: 'Bottoms',
          onPress: () => saveToCollection('bottoms', photoUri),
        },
        {
          text: 'Shoes',
          onPress: () => saveToCollection('shoes', photoUri),
        },
      ]
    );
  };

  const saveToCollection = async (collectionName, photoUri) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const collectionRef = collection(database, 'users', currentUser.uid, collectionName);
      try {
        await addDoc(collectionRef, { url: photoUri });
        console.log('Photo saved to', collectionName, 'collection');
        navigateToCollection(collectionName);
      } catch (error) {
        console.log('Error saving photo to', collectionName, 'collection:', error);
      }
    }
  };

  const navigateToCollection = (collectionName) => {
    navigation.navigate('Collection', { collection: collectionName });
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef} />
      <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: '#fff',
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
});

export default CameraScreen;
