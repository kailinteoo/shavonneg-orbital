import { Camera } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(uri);
      showSaveConfirmation();
    }
  };

  const showSaveConfirmation = () => {
    Alert.alert(
      'Save to Collection',
      'Do you want to save this photo to your collection?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: resetPhoto,
        },
        {
          text: 'Save',
          onPress: saveToCollection,
        },
      ]
    );
  };

  const resetPhoto = () => {
    setCapturedPhoto(null);
  };

  const saveToCollection = () => {
    navigation.navigate('Collection', { capturedPhoto });
    resetPhoto();
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
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
            <Ionicons name="camera-reverse-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        {!capturedPhoto && (
          <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
        )}
      </Camera>
      {capturedPhoto && (
        <View style={styles.previewContainer}>
          <TouchableOpacity style={styles.previewImageWrapper} onPress={resetPhoto}>
            <Ionicons name="close-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={showSaveConfirmation}>
            <Ionicons name="save-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  flipButton: {
    marginRight: 16,
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    marginBottom: 32,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    bottom: 0,
  },
  previewContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewImageWrapper: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  saveButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
