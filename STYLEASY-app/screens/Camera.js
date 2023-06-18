import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { useState, useEffect, useRef } from 'react';
import { Button, View, Image, StyleSheet, ToastAndroid } from 'react-native';

const CameraScreen = ({ navigation }) => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  useEffect(() => {
    askPermissions();
  }, []);

  const askPermissions = async () => {
    const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
    const { status: mediaLibraryStatus } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    setCameraPermission(cameraStatus === 'granted');
    setMediaLibraryPermission(mediaLibraryStatus === 'granted');
  };

  const handleTakePhoto = async () => {
    if (cameraPermission && mediaLibraryPermission) {
      const { status } = await Camera.requestCameraPermissionsAsync();

      if (status === 'granted') {
        const photo = await takePhoto();

        if (photo) {
          setCapturedPhoto(photo);
        }
      } else {
        console.log('Camera permission not granted');
      }
    } else {
      console.log('Permissions not granted');
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      return { uri };
    }
  };

  const saveToAppGallery = async () => {
    const albumName = 'My App Gallery'; // Name of your custom gallery

    try {
      const album = await MediaLibrary.getAlbumAsync(albumName);

      if (album) {
        await MediaLibrary.createAssetAsync(capturedPhoto.uri, album, false);
        showToast('Saved to Collection');
      } else {
        const asset = await MediaLibrary.createAssetAsync(capturedPhoto.uri);
        await MediaLibrary.createAlbumAsync(albumName, asset, false);
        showToast('Saved to Collection');
      }
    } catch (error) {
      console.log('Error saving photo to app gallery:', error);
    }
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const cameraRef = useRef(null);

  return (
    <>
      <Camera style={{ flex: 1 }} ref={cameraRef}>
        {/* Camera view */}
      </Camera>
      {capturedPhoto && (
        <View style={styles.overlayContainer}>
          <Image style={styles.overlayImage} source={{ uri: capturedPhoto.uri }} />
          <View style={styles.buttonContainer}>
            <Button title="Save to Collection" onPress={saveToAppGallery} />
          </View>
        </View>
      )}
      {!capturedPhoto && <Button title="Take Photo" onPress={handleTakePhoto} />}
    </>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayImage: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
});

export default CameraScreen;
